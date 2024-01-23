require('dotenv').config();
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Level = require ('./models/levelModel');
const Spell = require('./models/spellModel');


const app = express();
app.use(express.json());
app.use(cors());

mongoose
.connect("mongodb+srv://" + user + ":" + password + "@restapi.egpdw51.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Node API app is running on port 3000.");
    });
}).catch(error => {
    console.log(error);
})


//
// Routes
//

// GET ALL LEVELS
app.get('/levels', async(req,res) => {
    console.log("All levels");
    try {
        const levels = await Level.find({});
        res.status(200).json(levels)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// GET LEVEL BY ID
app.get('/levels/:id', async (req,res) => {
    console.log(`Level by ID : ${req.params.id}`);
    try {
        const { id } = req.params;
        const level = await Level.findOne({ id: id }).lean();
        const spells = await Spell.find({ id: { $in: level.spells } }).lean();
        level.spells = spells;
        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// POST A LEVEL
app.post('/levels', async(req,res) => {
    console.log("Post a level");
    try {
        const levels = await Level.create(req.body);
        res.status(200).json(levels)   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

// GET ALL SPELLS
app.get('/spells', async(req,res) => {
    console.log("All Spells");

    try {
        const spells = await Spell.find({});
        if (!spells || spells.length === 0) {
            return res.status(404).json({ error: 'No spells found' });
        }
        res.json(spells);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET SPELL BY ID
app.get('/spells/:id', async(req,res) => {
    console.log("Spell by ID");
    try {
        const {id} = req.params;
        const spell = await Spell.findOne({id : id});
        res.status(200).json(spell)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// POST A SPELL
app.post('/spells', async(req,res) => {
    try {
        const spells = await Spell.create(req.body);
        res.status(200).json(spells)   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

