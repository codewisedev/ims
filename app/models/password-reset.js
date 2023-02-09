const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordResetSchema = Schema(
	{
		email: { type: String, required: true },
		token: { type: String, required: true },
		use: { type: Boolean, default: false },
	},
	{ timestamps: { updatedAt: false } },
);

module.exports = mongoose.model('passwordReset', passwordResetSchema);
