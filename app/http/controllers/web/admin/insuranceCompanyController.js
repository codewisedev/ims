const controller = require('app/http/controllers/controller');
const fs = require('fs');

class insuranceCompanyController extends controller {
	async index(req, res, next) {
		try {
			let page = req.query.page || 1;
			let companies = await this.model.InsuranceCompany.paginate(
				{},
				{ page, sort: { createdAt: -1 }, limit: 10 },
			);
			const title = 'لیست شرکت های بیمه';
			res.render('admin/insurance/company', { title, companies });
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const title = 'شرکت بیمه جدید';
			res.render('admin/insurance/company/create', { title });
		} catch (error) {
			next(error);
		}
	}

	async store(req, res, next) {
		try {
			let status = await this.validationData(req);
			if (!status) {
				if (req.file) fs.unlinkSync(req.file.path);
				return this.back(req, res);
			}
			let { title, site, email, phone } = req.body;
			let newCompany = new this.model.InsuranceCompany({
				title,
				site,
				email,
				phone: phone[0].number != '' ? phone : undefined,
				logo: this.imageResize(req.file, [480, 720], true),
			});
			await newCompany.save();
			return res.redirect('/admin/insurance/company');
		} catch (error) {
			next(error);
		}
	}

	async edit(req, res, next) {
		try {
			const title = 'پنل مدیریت';
			let company = await this.model.InsuranceCompany.findById(req.params.id);
			if (!company) this.error('چنین مطلبی وجود ندارد', 404);
			return res.render('admin/insurance/company/edit', { title, company });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			let status = await this.validationData(req);
			if (!status) {
				if (req.file) fs.unlinkSync(req.file.path);
				return this.back(req, res);
			}

			let objForUpdate = {};

			//*Todo: Check Image is not empty
			if (req.file) {
				objForUpdate.logo = this.imageResize(req.file, [480, 720], true);
			}

			delete req.body.image;

			await this.model.InsuranceCompany.findByIdAndUpdate(req.params.id, {
				$set: { ...req.body, ...objForUpdate },
			});

			return res.redirect('/admin/insurance/company');
		} catch (error) {
			next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			let company = await this.model.InsuranceCompany.findById(req.params.id);

			if (!company) return res.json('چنین مطلبی یافت نشد');

			//*Todo: Delete Portfolio
			company.remove();

			this.toast(req, {
				text: 'آیتم انتخابی حذف شد',
			});

			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}

	async conditionTrue(req, res, next) {
		try {
			await this.model.InsuranceCompany.findByIdAndUpdate(req.params.id, {
				$set: { condition: true },
			});
			this.toast(req, {
				text: 'آیتم انتخابی فعال شد',
				iconClass: 'toast-success',
			});
			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}

	async conditionFalse(req, res, next) {
		try {
			await this.model.InsuranceCompany.findByIdAndUpdate(req.params.id, {
				$set: { condition: false },
			});
			this.toast(req, {
				text: 'آیتم انتخابی غیرفعال شد',
				iconClass: 'toast-error',
			});
			return this.back(req, res);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new insuranceCompanyController();
