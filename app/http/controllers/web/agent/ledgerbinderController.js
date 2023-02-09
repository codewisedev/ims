const controller = require('app/http/controllers/controller');

class ledgerbinderController extends controller {
	async index(req, res, next) {
		try {
			let customers = await this.model.Customer.find({}).sort({ sort: -1 });
			const title = 'داشبورد';
			res.render('agent/customer/ledgerbinder', { title, customers });
		} catch (error) {
			next(error);
		}
	}

	async preFollowStore(req, res, next) {
		try {
			console.log(req.body);
			let { htfu, date, nextDate, desc, customer } = req.body;

			let file = null;
			if (req.file) file = await this.getFileAddress(req.file);

			let id = customer.slice(3);

			let newPreFollow = new this.model.PreFollow({
				htfu,
				date,
				nextDate,
				desc,
				file,
				customer: id,
			});

			await newPreFollow.save();

			let user = await this.model.Customer.findById(id);

			this.reminder(
				req.user,
				req.user.agency,
				'پیگیری',
				`امروز زمان پیگیری مشتری ${user.name} می باشد`,
				config.alert.warning,
				nextDate,
			);

			this.toast(req, {
				text: 'پیش پیگیری جدید ثبت شد',
				iconClass: 'toast-success',
			});

			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ledgerbinderController();
