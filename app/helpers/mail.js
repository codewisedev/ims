//TODO: SFTP Server for Nodemailer service

const nodemailer = require('nodemailer');

//* Config Nodemailer
let transporter = nodemailer.createTransport({
	host: '',
	port: 2525,
	secure: false,
	auth: {
		user: '',
		pass: '',
	},
});

module.exports = transporter;
