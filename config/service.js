module.exports = {
	recaptcha: {
		client_key: process.env.RECAPTCHA_CLIENT_KEY,
		secret_key: process.env.RECAPTCHA_SECRET_KEY,
		options: { hl: 'fa' },
	},
};
