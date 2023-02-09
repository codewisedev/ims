const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = Schema(
	{
		name: { type: String, required: true },
		mobile: { type: String, required: true, unique: true },
		gender: { type: String, enum: ['1', '2'], required: true },
		proposal: { type: String, required: true },
		birth: { type: Date, required: false },
		maritalStatus: { type: Boolean, required: false },
		child: { type: Number, required: false },
		idNumber: { type: String, required: false },
		job: { type: String, required: false },
		disease: { type: String, required: false },
		introductionMethod: { type: String, required: false },
		address: { type: String, required: false },
		desc: { type: String, required: false },
		history: { type: String, required: false },
		health: { type: String, required: false },
		intrest: { type: Array, required: false },
		level: { type: Number, default: 1 },
		sort: { type: Number, required: false },
		preFollow: [
			{ type: Schema.Types.ObjectId, ref: 'preFollow', required: false },
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('customer', customerSchema);
