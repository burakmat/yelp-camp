const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const Campground = require("./models/campground")
const methodOverride = require("method-override")


mongoose.connect("mongodb://localhost:27017/yelp-camp")
.then(() => {
	console.log("Mongo connection is open.")
})
.catch((err) => {
	console.log("Error occured while connecting mongo server.")
})

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(__dirname + '/public'));
app.listen(3000, () => {
	console.log("Listening on port 3000.")
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
	res.render("home")
})

app.get("/campgrounds", async (req, res) => {
	const cg = await Campground.find({});
	res.render("campgrounds/index", { campgrounds: cg })
})

app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new")
})

app.post("/campgrounds", async (req, res) => {
	const campground = new Campground(req.body.campground)
	await campground.save()
	res.redirect(`/campgrounds/${campground._id}`)
})

app.get("/campgrounds/:id", async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render("campgrounds/show", { campground })
})

app.get("/campgrounds/:id/edit", async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render("campgrounds/edit", { campground })
})

app.put("/campgrounds/:id", async (req, res) => {
	const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground })
	res.redirect(`/campgrounds/${campground._id}`)
})

app.delete("/campgrounds/:id", async (req, res) => {
	await Campground.findByIdAndDelete(req.params.id);
	res.redirect("/campgrounds")
})