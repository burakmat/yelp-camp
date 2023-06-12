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
		const price = Math.floor(Math.random() * 20) + 10
		await new Campground({
			location: `${cities[rand].city}, ${cities[rand].state}`,
			title: name,
			image: "https://source.unsplash.com/collection/483251",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur qui eligendi est maxime ut consequuntur, sunt a ex odio nisi quam quia doloremque accusamus asperiores! Repellendus tempora ab eligendi necessitatibus!",
			price: price
		}).save()
	}
}

seedDB()
.then(() => {
	mongoose.connection.close();
})