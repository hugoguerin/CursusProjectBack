const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    type: { type: String, required: true },
    entity: { type: String, required: true }
});

const levelSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    pm: { type: Number, required: true },
    spells: [{ type: Number, required: true }],
    board: [[boardSchema]]  // Nested array of boardSchema
});

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;


