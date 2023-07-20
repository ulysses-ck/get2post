import express from "express";
import axios from "axios";

const app = express();

const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
	res.send("test");
});

app.get("/", (req, res) => {
	// parse query params into a JavaScript Object
	const json = JSON.parse(req.query.json);

	axios.post(req.query.url, json).then(
		(response) => {
			res.send(response.data);
		},
		(error) => {
			res.send(error);
		}
	);
});

app.listen(port, () => {
	console.log(`Listening in ${port}`);
});

export default app;
