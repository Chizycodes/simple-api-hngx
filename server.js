const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/data', (req, res) => {
	// Get the query parameters
	const { slack_name, track } = req.query;

	// Get current day
	const current_day = new Date().toLocaleString('en-US', { weekday: 'long' });

	// Get the current UTC time
	const utc_time = new Date().toISOString();

	// Validate the current time to be within +/-2 hours
	const currentTime = new Date();
	const utcTime = new Date(utc_time);
	const timeDifferenceHours = (currentTime - utcTime) / (1000 * 60 * 60); // Convert to hours

	if (Math.abs(timeDifferenceHours) > 2) {
		console.log(currentTime);
		return res.status(500).json({ error: 'Time synchronization error' });
	}

	const data = {
		slack_name,
		current_day,
		utc_time,
		track,
		github_file_url: 'https://example.com/github-file',
		github_repo_url: 'https://github.com/Chizycodes/simple-api-hngx',
		status_code: 200,
	};

	// Return the data as JSON
	res.json(data);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
