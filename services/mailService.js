const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
  debug: true,
  logger: true,
});

function loadTemplate(templateName, data) {
  const templatePath = path.join(
    __dirname,
    "templates",
    `${templateName}.hbs`
  );

  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);

  return template(data);
}

async function sendMailLocation(to, subject, data) {
    const dataSent = {
        subject,
        // prenom: data.prenom,
        nom: data.username,
        email: data.email,
        mot_de_passe: data.mot_de_passe,
        date: data.date,
        id: data.id,
        location: data.location,
        company: process.env.COMPANY_NAME || "MonEntreprise",
        annee: data.annee || new Date().getFullYear(),
        lien_desinscription: data.lien_desinscription || "#",
        lien_confidentialite: data.lien_confidentialite || "#"
    }
    const htmlContent = loadTemplate("validLocation", dataSent);
    console.log('host', process.env.MAIL_HOST);
    
    return transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        html: htmlContent
    });
}

async function sendMail(to, subject, html) {
    
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  });
}

module.exports = {sendMail, sendMailLocation};