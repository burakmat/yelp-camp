const mongoose = require("mongoose")
const Campground = require("../models/campground")
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")

mongoose.connect("mongodb://localhost:27017/yelp-camp")
.then(() => {
	console.log("Mongo connection is open.")
})
.catch((err) => {
	console.log("Error occured while connecting mongo server.")
})


async function seedDB() {
	await Campground.deleteMany({})
	for (let i = 0; i < 50; ++i) {
		const rand = Math.floor(Math.random() * 1000)
		const name = `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`
		await new Campground({
			location: `${cities[rand].city}, ${cities[rand].state}`,
			title: name
		}).save()
	}
}

seedDB()
.then(() => {
	mongoose.connection.close();
})