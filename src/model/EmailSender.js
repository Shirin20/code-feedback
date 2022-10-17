/* eslint-disable jsdoc/require-jsdoc */
import nodemailer from 'nodemailer'

export class EmailSender {
  constructor (emailService, userEmail, passWord) {
    this.emailService = emailService
    this.userEmail = userEmail
    this.passWord = passWord
  }

  #loginToEmail () {
    const transporter = nodemailer.createTransport({
      service: this.emailService,
      auth: {
        user: this.userEmail,
        pass: this.passWord
      }
    })
    return transporter
  }

  #writeEmail (feedback, sendToEmailAddress) {
    const mailOptions = {
      from: this.userEmail,
      to: sendToEmailAddress,
      subject: 'Code feedback',
      text: feedback
    }
    return mailOptions
  }

  sendEmail () {
    const userEmail = this.#loginToEmail()

    const email = this.#writeEmail()

    userEmail.sendMail(email, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
