const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preFollowSchema = Schema(
	{
		customer: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
		//TODO: htfu --> how to follow up
		htfu: { type: String, required: true },
		date: { type: Date, required: true },
		nextDate: { type: Date, required: true },
		file: { type: String, required: false },
		desc: { type: String, required: false },
	},
	{ timestamps: { updatedAt: false } },
);

module.exports = mongoose.model('preFollow', preFollowSchema);
