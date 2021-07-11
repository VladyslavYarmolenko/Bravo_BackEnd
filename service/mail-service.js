const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'chad.hamill@ethereal.email',
                pass: '3sNcVHvxSsJk4wtTRd'
            }
        })
    }

    async sendActivationMail(to, link) {
        const mailResponse = await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
        console.log('mailResponse', mailResponse)
    }
}

module.exports = new MailService();
