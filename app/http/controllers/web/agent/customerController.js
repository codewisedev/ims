const controller = require('app/http/controllers/controller');

class customerController extends controller {
	async create(req, res, next) {
		try {
			const title = 'مشتری جدید';
			res.render('agent/customer/create', { title });
		} catch (error) {
			next(error);
		}
	}

	async store(req, res, next) {
		try {
			let status = await this.validationData(req);
			if (!status) return this.back(req, res);

			let customer = await this.model.Customer.findOne({
				mobile: req.body.mobile,
			});
			if (!customer) {
				let {
					name,
					mobile,
					gender,
					proposal,
					birth,
					maritalStatus,
					child,
					idNumber,
					job,
					disease,
					introductionMethod,
					address,
					desc,
					history,
					health,
					intrest,
				} = req.body;

				let newCustomer = new this.model.Customer({
					name,
					mobile,
					gender,
					proposal,
					birth,
					maritalStatus,
					child,
					idNumber,
					job,
					disease,
					introductionMethod,
					address,
					desc,
					history,
					health,
					intrest,
				});
				await newCustomer.save();

				this.toast(req, {
					text: 'مشتری جدید ثبت شد',
					iconClass: 'toast-success',
				});

				return res.redirect('/agent/customer/create');
			}

			req.flash('errors', 'مشتری با این شماره موبایل قبلا ثبت نام کرده است!');
			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new customerController();
