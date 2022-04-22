import nodemailer from 'nodemailer'

let transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  }
})

export const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) =>
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        reject(err)
      } else {
        resolve(info);
      }
    })
  )

}
