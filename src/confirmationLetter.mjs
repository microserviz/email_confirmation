export const emailSubject = 'Email Confirmation'

const confirmRelativeURL = process.env.LETTER_CONFIRM_RELATIVE_URL || '/auth/signup/confirm'

export const getEmailBodyPlainText = (email, token) => `* Email Confirmation *

Your confirmation token for ${email} is ${token}.
Please use this link: ${process.env.BASE_URL}${confirmRelativeURL}/${email}/${token}`

export const getEmailBodyHTML = (email, token) => `<h1>Email Confirmation</h1>
<p>Click to <a href="${process.env.BASE_URL}${confirmRelativeURL}/${email}/${token}">confirm</a> your email.</p>
<p>Or use this link manually: ${process.env.BASE_URL}${confirmRelativeURL}/${email}/${token}</p>
`
