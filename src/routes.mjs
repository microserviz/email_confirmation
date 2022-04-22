import Router from 'koa-router'
import * as uuid from 'uuid'
import { EmailConfirmation, sequelize } from './db.mjs'
import { sendMail } from './sendmail.mjs'

export const router = new Router()

import { emailSubject, getEmailBodyPlainText, getEmailBodyHTML } from './confirmationLetterr.mjs'


const sendConfirmationEmail = async (koaCtx, email, token) => {
  return sendMail(email, emailSubject,
    getEmailBodyPlainText(email, token),
    getEmailBodyHTML(email, token)
  ).then(info => {
    koaCtx.body = JSON.stringify({ result: "ok", email })
    console.log('sent ok', info)
  }).catch(err => {
    koaCtx.body = JSON.stringify({ result: "failure", email, error: 'not sent' })
    console.log('not sent', err)
  })
}


router.get('/api/emailConfirmation/register/:email', async (ctx, next) => {
    await sequelize.sync()
    const email = ctx.params.email
    const token = uuid.v4()
    await EmailConfirmation.create({
        email,
        confirmed: false,
        token,
    })
    await sendConfirmationEmail(ctx, email, token)
})

router.get('/api/emailConfirmation/pending', async (ctx, next) => {
    await sequelize.sync()
    const found = await EmailConfirmation.findAll({ where: { confirmed: false } })
    ctx.body = JSON.stringify(found.map(f => f.email))
})

router.get('/api/emailConfirmation/confirmed', async (ctx, next) => {
  await sequelize.sync()
  const found = await EmailConfirmation.findAll({ where: { confirmed: true } })
  ctx.body = JSON.stringify(found.map(f => f.email))
})

router.get('/api/emailConfirmation/isConfirmed/:email', async (ctx, next) => {
  await sequelize.sync()
  const email = ctx.params.email
  const found = await EmailConfirmation.findAll({ where: { email, confirmed: true } })
  ctx.body = JSON.stringify({ confirmed: !!found.length && found[0].confirmed, email })
})

router.get('/api/emailConfirmation/resend/:email', async (ctx, next) => {
  await sequelize.sync()
  const email = ctx.params.email
  const found = await EmailConfirmation.findAll({ where: { email, confirmed: false } })
  if (found.length) {
    const ra = found[0]
    const token = ra.token
    await sendConfirmationEmail(ctx, email, token)
  } else {
    ctx.body = JSON.stringify({ result: 'failure', error: 'not found', email })
  }
})

router.get('/api/emailConfirmation/confirm/:email/:token', async (ctx, next) => {
    await sequelize.sync()
    const email = ctx.params.email
    const token = ctx.params.token
    const found = await EmailConfirmation.findAll({ where: { email, token } })
    if (found.length) {
      const ra = found[0]
      if (ra.confirmed) {
        ctx.body = JSON.stringify({ result: 'ok', error: 'already confirmed', email })
      } else {
        await EmailConfirmation.update({ confirmed: true }, { where: { email, token } })
        ctx.body = JSON.stringify({ result: 'ok', error: 'confirmed', email })
      }
    } else {
      ctx.body = JSON.stringify({ result: 'failure', error: 'not found', email })
    }
})


export default router
