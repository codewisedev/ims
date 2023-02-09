const controller = require('app/http/controllers/controller');

class indexController extends controller {
	async index(req, res) {
		const title = 'داشبورد';
		res.render('agent', { title });
	}
}

module.exports = new indexController();
