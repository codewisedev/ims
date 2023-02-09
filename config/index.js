const alert = require('config/alert');
const cache = require('config/cache');
const cors = require('config/cors');
const database = require('config/database');
const layout = require('config/layout');
const service = require('config/service');
const session = require('config/session');

module.exports = {
	alert,
	cache,
	cors,
	database,
	layout,
	service,
	session,
	port: process.env.SERVER_PORT,
	cookie_secretkey: process.env.COOKIE_SECRET_KEY,
	debug: true,
	siteurl: process.env.WEBSITE_URL,
};
