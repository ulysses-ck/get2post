import express from "express";
import axios from "axios";
import FormData from "form-data";

const app = express();

const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
	res.send("test");
});

app.get("/", (req, res) => {
	const { url, json } = req.query;

	// parse query param json into an object
	try {
		const dataObj = JSON.parse(json);

		// create a new FormData object to simulate a frontend has a form
		const postFormData = new FormData();

		// iterates through the object's properties and assigns them to postFormData
		Object.keys(dataObj).forEach((key) => {
			postFormData.append(key, dataObj[key]);
		});

		axios({
			method: "post",
			url: url,
			data: postFormData,
		})
			.then((response) => {
				// send POST response
				const { data } = response;
				res.send(data);
			})
			.catch(function (error) {
				//handle error
				res.send({ message: "An error occurs", error });
			});
	} catch (error) {
		res.send({
			message: "An error occurs parsing json query param",
		});
	}
});

app.listen(port, () => {
	console.log(`Listening in ${port}`);
});

export default app;
