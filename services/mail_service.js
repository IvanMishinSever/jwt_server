const nodemailer = require('nodemailer');
const config = require('config');

const host = config.get('smtp-host');
const port = config.get('smtp-port');
const user = config.get('smtp-user');
const pass= config.get('smtp-password');
const url= config.get('api-url');


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
                user: user,
                pass: pass
            }
        })
    }


    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: user,
            to,
            subject: `Активация аккаунта на ${url}`,
            text: '',
            html: `
            <div>
                <h1>Для активации аккаунта перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }

}
module.exports = new MailService();