const Person = require('../models/personModel');

exports.createPerson = async (req, res) => {
	try {
		const person = await Person.create(req.body);
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.getPersons = async (req, res) => {
	try {
		const person = await Person.find({});
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.getPerson = async (req, res) => {
	try {
		const { id } = req.params;
		const person = await Person.findById(id);
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

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
