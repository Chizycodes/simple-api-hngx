const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a name'],
		},
	},
	{
		timestamps: true,
	}
);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
