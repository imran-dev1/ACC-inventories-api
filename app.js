const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.routes");

//middleware

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
   res.send("Server is running successfully");
});


app.use("/api/v1/product", productRoute);

module.exports = app;
