const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = Schema(
	{
		manager: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		adviser: [{ type: Schema.Types.ObjectId, ref: 'adviser', required: false }],
		condition: { type: Boolean, default: true },
		title: { type: String, required: true },
		slug: { type: String, required: true },
		logo: { type: Object, default: undefined, required: false },
		tell: { type: String, default: null, required: false },
		location: { type: Schema.Types.ObjectId, ref: 'location', required: true },
		insuranceCompany: {
			type: Schema.Types.ObjectId,
			ref: 'insuranceCompany',
			required: true,
		},
		agencyCode: { type: String, required: true },
		centralCode: { type: String, required: false },
		startDate: { type: String, required: true },
		//* Register Date Plus 1 week
		credit: { type: Date, default: Date.now() + 6.048e8 },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('agency', agencySchema);
