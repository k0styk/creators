const nodemailer = require('nodemailer');
const helper = require('./helper');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    const origin = process.env.ORIGIN || 'http://localhost:8000';

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: helper.getSubject(origin),
      text: '',
      html: helper.getHtml(link),
    });
  }
}

module.exports = new MailService();
