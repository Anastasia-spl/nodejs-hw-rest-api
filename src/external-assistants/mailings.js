const nodemailer = require("nodemailer")

async function main({email, verifyToken}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'spl_mailings@mail.ru',
        pass: 'nodeMailer20'
    }
  })

  await transporter.sendMail({
    from: 'spl_mailings@mail.ru', 
    to: email,
    subject: 'Verify your email', 
    text: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
    http://localhost:3000/api/users/verify/${verifyToken}`, 
    html: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
      <a href="http://localhost:3000/api/users/verify/${verifyToken}">Verify email</a>`, 
  })
}

module.exports = {
  verificationMailing: main
}