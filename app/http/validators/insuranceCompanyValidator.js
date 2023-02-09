const validator = require('./validator');
const { check } = require('express-validator');
const path = require('path');

class insuranceCompanyValidator extends validator {
	handle() {
		return [
			check('title')
				.isLength({ min: 3 })
				.withMessage('عنوان نمیتواند کمتر از 3 کاراکتر باشد'),
			check('image').custom(async (value, { req }) => {
				if (req.query._method === 'PUT' && value === undefined) return;
				if (!value) throw new Error('وارد کردن تصویر الزامی است');
				let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
				if (!fileExt.includes(path.extname(req.file.originalname)))
					throw new Error('فایل وارد شده نا معتبر است');
			}),
			check('phone').custom(async (value) => {
				if (value != undefined) {
					value.map((phone) => {
						if (phone.number == '') return;
						else if (phone.type == '')
							throw new Error('وارد کردن نوع اطلاعات تماس الزامی است');
						else if (phone.description == '')
							throw new Error('وارد کردن نوع اطلاعات تماس الزامی است');
					});
				}
			}),
		];
	}
}

module.exports = new insuranceCompanyValidator();
