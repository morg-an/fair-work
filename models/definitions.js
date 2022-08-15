const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defSchema = new Schema({
    term: { type: String, required: true },
    definition: { type: String }
})

const Definition = mongoose.model('Definition', defSchema);
module.exports = Definition;