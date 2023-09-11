const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/personModel');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.post('/api', async (req, res) => {
	try {
		const person = await Person.create(req.body);
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

app.get('/api', async (req, res) => {
	try {
		const person = await Person.find({});
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

app.get('/api/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const person = await Person.findById(id);
		res.status(200).json({ success: true, data: person });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

app.patch('/api/:id', async (req, res) => {
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
});

app.delete('/api/:id', async (req, res) => {
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
});

app.get('/stage1', (req, res) => {
	// Get the query parameters
	const { slack_name, track } = req.query;

	// Check if slack_name and track are provided
	if (!slack_name || !track) {
		return res.status(400).json({ error: 'slack_name and track are required' });
	}

	// Get current day
	const current_day = new Date().toLocaleString('en-US', { weekday: 'long' });

	// Get the current UTC time
	const utc_time = new Date().toISOString().slice(0, -5) + 'Z';
	// Validate the current time to be within +/-2 hours
	const currentTime = new Date();
	const utcTime = new Date(utc_time);
	const timeDifferenceHours = (currentTime - utcTime) / (1000 * 60 * 60); // Convert to hours

	if (Math.abs(timeDifferenceHours) > 2) {
		return res.status(500).json({ error: 'Time synchronization error' });
	}

	const data = {
		slack_name,
		current_day,
		utc_time,
		track,
		github_file_url: 'https://github.com/Chizycodes/simple-api-hngx/blob/main/server.js',
		github_repo_url: 'https://github.com/Chizycodes/simple-api-hngx',
		status_code: 200,
	};

	// Return the data as JSON
	res.json(data);
});

// connect to db
mongoose
	.connect('mongodb+srv://admin:Admin12345@cluster0.1ibyjby.mongodb.net/stage2?retryWrites=true&w=majority')
	.then(() => {
		console.log('connected to database');

		// Start the server
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
