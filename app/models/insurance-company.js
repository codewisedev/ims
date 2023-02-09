const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const insuranceCompanySchema = Schema(
	{
		condition: { type: Boolean, default: true },
		title: { type: String, required: true },
		logo: { type: Object, required: true },
		site: { type: String, required: false },
		email: { type: String, required: false },
		phone: { type: Array, required: false },
	},
	{ timestamps: { updatedAt: false } },
);

insuranceCompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('insuranceCompany', insuranceCompanySchema);
