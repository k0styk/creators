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
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: helper.getSubject(process.env.API_URL),
            text: '',
            html: helper.getHtml(link),
        });
    }
}

module.exports = new MailService();
