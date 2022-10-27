const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_LOCAL).then(() => {
    console.log(`Database is connected successfully`.red.bold);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
 });