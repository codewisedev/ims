const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisorSchema = Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		agency: { type: Schema.Types.ObjectId, ref: 'agency', required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('advisor', advisorSchema);
