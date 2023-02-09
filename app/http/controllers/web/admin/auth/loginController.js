const controller = require('app/http/controllers/controller');
const passport = require('passport');

class loginController extends controller {
	showLoginForm(req, res, next) {
		try {
			const title = 'صفحه ورود';
			res.render('auth/admin/login', {
				recaptcha: this.recaptcha.render(),
				title,
			});
		} catch (error) {
			next(error);
		}
	}

	async loginProccess(req, res, next) {
		try {
			await this.recaptchaValidation(req, res);
			let result = await this.validationData(req);
			if (result) return this.login(req, res, next);
			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}

	login(req, res, next) {
		try {
			passport.authenticate('admin.login', async (err, user) => {
				if (!user) return res.redirect('/auth/admin');
				this.loginDevice(req, res, user);
				req.login(user, (err) => {
					if (err) throw err;
					if (req.body.remember) user.setRememberToken(res);
					return res.redirect('/admin');
				});
			})(req, res, next);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new loginController();
