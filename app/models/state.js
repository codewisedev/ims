const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = Schema({
	title: { type: String, required: true },
	city: [{ type: Schema.Types.ObjectId, ref: 'city', required: false }],
});

module.exports = mongoose.model('state', stateSchema);
