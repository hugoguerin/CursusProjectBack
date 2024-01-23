const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    range: { type: Number, required: true },
    power: { type: Number, required: false },
    aligned: { type: Boolean, required: true },
    entity: { type: String, required: true }
});

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;

