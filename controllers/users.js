const mongoose = require('mongoose');
const Person = require('../models/personModel');

// Create person
exports.createPerson = async (req, res) => {
	try {
		const person = await Person.create(req.body);
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all persons
exports.getPersons = async (req, res) => {
	try {
		const person = await Person.find({});
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get single person by ID or name
exports.getPerson = async (req, res) => {
	try {
		const { query } = req.params;

		// Check if the query is a valid ObjectId (ID-based query)
		if (mongoose.Types.ObjectId.isValid(query)) {
			const personById = await Person.findById(query);
			if (!personById) {
				return res.status(404).json({ success: false, message: `Person with ID ${query} not found` });
			}
			return res.status(200).json({ success: true, data: personById });
		} else {
			// If not a valid ObjectId, assume it's a name-based query
			const personByName = await Person.findOne({ name: query });
			if (!personByName) {
				return res.status(404).json({ success: false, message: `Person with name ${query} not found` });
			}
			return res.status(200).json({ success: true, data: personByName });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Update person by id
exports.updatePerson = async (req, res) => {
	try {
		const { query } = req.params;
		let person = await Person.findByIdAndUpdate(query, req.body);

		// cannot find person
		if (!person) {
			return res.status(404).json({ success: false, message: `Cannot find person with ID ${query}` });
		}

		person = await Person.findById(query);

		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Delete person by id
exports.deletePerson = async (req, res) => {
	try {
		const { query } = req.params;
		const person = await Person.findByIdAndDelete(id);

		// cannot find person
		if (!person) {
			return res.status(404).json({ success: false, message: `Cannot find person with ID ${query}` });
		}
		res.status(200).json({ success: true, message: 'Person deleted successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
