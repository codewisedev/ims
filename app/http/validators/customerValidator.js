const validator = require('./validator');
const { check } = require('express-validator');

class customerValidator extends validator {
	handle() {
		return [
			check('name')
				.isLength({ min: 5 })
				.withMessage('فیلد نام و نام خانوادگی نمی تواند کمتر از 5 حرف باشد'),
			check('mobile').notEmpty().withMessage('شماره تماس نمی تواند خالی باشد'),
		];
	}
}

module.exports = new customerValidator();
