const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		agency: { type: Schema.Types.ObjectId, ref: 'agency', required: false },
		title: { type: String, required: true },
		text: { type: String, required: true },
		icon: { type: String, required: true },
		date: { type: Date, required: true },
		status: { type: Boolean, default: false },
	},
	{ timestamps: { updatedAt: false } },
);

module.exports = mongoose.model('alert', alertSchema);
