
//90PE5bfjEryoIUOX      mongodb pw

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./Routes/userRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);

mongoose.connect("mongodb+srv://admin:90PE5bfjEryoIUOX@cluster0.zvszq2r.mongodb.net/ytTutorial")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));