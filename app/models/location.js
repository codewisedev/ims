const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = Schema({
	state: { type: Schema.Types.ObjectId, ref: 'state', required: false },
	city: { type: Schema.Types.ObjectId, ref: 'city', required: false },
	address: { type: String, required: false },
});

module.exports = mongoose.model('location', locationSchema);
