const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Campground = require("./models/campground")


mongoose.connect("mongodb://localhost:27017/yelp-camp")
.then(() => {
	console.log("Mongo connection is open.")
})
.catch((err) => {
	console.log("Error occured while connecting mongo server.")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.listen(3000, () => {
	console.log("Listening on port 3000.")
})

app.get("/", (req, res) => {
	res.render("home")
})

app.get("/make", async (req, res) => {
	const camp = new Campground({
		title: "My Backyard",
		description: "cheap camping"
	})
	await camp.save()
	res.send(camp)
})
