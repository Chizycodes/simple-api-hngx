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
		const { id } = req.params;

		// Check if the id is a valid ObjectId (ID-based id)
		if (mongoose.Types.ObjectId.isValid(id)) {
			const personById = await Person.findById(id);
			if (!personById) {
				return res.status(404).json({ success: false, message: `Person with ID ${id} not found` });
			}
			return res.status(200).json({ success: true, data: personById });
		} else {
			// If not a valid ObjectId, assume it's a name-based id
			const personByName = await Person.findOne({ name: id });
			if (!personByName) {
				return res.status(404).json({ success: false, message: `Person with name ${id} not found` });
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
		const { id } = req.params;
		let person = await Person.findByIdAndUpdate(id, req.body);

		// cannot find person
		if (!person) {
			return res.status(404).json({ success: false, message: `Cannot find person with ID ${id}` });
		}

		person = await Person.findById(id);

		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Delete person by id
exports.deletePerson = async (req, res) => {
	try {
		const { id } = req.params;
		const person = await Person.findByIdAndDelete(id);

		// cannot find person
		if (!person) {
			return res.status(404).json({ success: false, message: `Cannot find person with ID ${id}` });
		}
		res.status(200).json({ success: true, message: 'Person deleted successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
