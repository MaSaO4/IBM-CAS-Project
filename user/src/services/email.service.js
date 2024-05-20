import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { templates } from './EmailTemplates.js';

dotenv.config();

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

/**
 * Sends an email using nodemailer.
 * @param {Object} eTo - Email recipient information
 * @param {string} eSubject - Email subject
 * @param {string} templateName - Name of the email template
 * @param {Object} data - Data to be used in the email template
 * @returns {Promise<Object>} - Promise that resolves to the result of sending the email
 */
const sendEmail = (eTo, eSubject, templateName, data) => {
    console.log(templateName);
    const templateFunction = templates[templateName];
    if (!templateFunction) {
        throw new Error(`Template '${templateName}' not found.`);
    }
    console.log(data);
    const body = templateFunction(data);
    console.log(body);
    const mailOptions = {
        from: 'fiqbal997@gmail.com',
        to: eTo.email,
        subject: eSubject,
        html: body
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

export { sendEmail };