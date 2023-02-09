const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueString = require('unique-string');
const bcrypt = require('bcrypt');

const userSchema = Schema(
	{
		admin: { type: Boolean, default: false },
		operator: { type: Boolean, default: false },
		manager: { type: Boolean, default: false },
		adviser: { type: Boolean, default: false },
		agency: { type: Schema.Types.ObjectId, ref: 'agency', required: false },
		condition: { type: Boolean, default: true },
		name: { type: String, required: true },
		avatar: { type: String, default: null, required: false },
		mobile: { type: String, required: true, unique: true },
		email: { type: String, default: null, required: false },
		password: { type: String, required: true },
		rememberToken: { type: String, default: null },
		permissions: [
			{ type: Schema.Types.ObjectId, ref: 'permission', required: false },
		],
		firstDevice: { type: Schema.Types.ObjectId, ref: 'device' },
		currentIp: { type: String, default: null, required: false },
	},
	{ timestamps: true },
);

userSchema.methods.hashPassword = function (password) {
	let salt = bcrypt.genSaltSync(15);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasPermission = function (permission) {
	return this.permissions.indexOf(permission) > -1;
};

userSchema.methods.setRememberToken = function (res) {
	const token = uniqueString();
	res.cookie('remember_token', token, {
		maxAge: 1000 * 60 * 60 * 24 * 30,
		httpOnly: true,
		signed: true,
	});
	this.updateOne({ rememberToken: token }, (err) => {
		if (err) throw err;
	});
};

module.exports = mongoose.model('user', userSchema);
