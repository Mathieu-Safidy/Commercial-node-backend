const router = require('express').Router();
const { sendMail , sendMailLocation} = require('../services/mailService');

class EmailController {
    static async sendEmail(req, res) {
        try {
            const { to, subject, html } = req.body;
            await sendMail(to, subject, html);
            res.status(200).json({ message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
        }
    }

    static async sendEmailLocation(req, res) {
        try {
            const { to, subject, data } = req.body;
            await sendMailLocation(to, subject, data);
            res.status(200).json({ message: 'Email de location envoyé avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de location' });
        }
    }
}

module.exports = EmailController;