import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
	res.send("test");
});

app.get("/", (req, res) => {
	const { url, json } = req.query;
	try {
		const dataJSON = JSON.parse(json);
		axios({
			method: "POST",
			url: url,
			data: new URLSearchParams(dataJSON),
		})
			.then((response) => {
				res.send(response.data);
			})
			.catch((error) => {
				res.send({ message: "An error happens!", error });
			});
	} catch (error) {
		res.send({ message: "Error at parse query param json" });
	}
});

app.listen(port, () => {
	console.log(`Listening in ${port}`);
});

export default app;
