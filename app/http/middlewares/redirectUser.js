const middleware = require('app/http/middlewares/middleware');

class redirectUser extends middleware {
	isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.admin || req.user.operator) return res.redirect('/admin');
			else if (req.user.manager || req.user.adviser)
				return res.redirect('/agent');
			else return res.redirect('/');
		}
		next();
	}

	notAdmin(req, res, next) {
		if ((req.isAuthenticated() && req.user.admin) || req.user.operator)
			return next();
		return res.redirect('/auth/admin');
	}

	notAgent(req, res, next) {
		if ((req.isAuthenticated() && req.user.manager) || req.user.adviser)
			return next();
		return res.redirect('/auth/agent');
	}
}

module.exports = new redirectUser();
