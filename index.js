const express = require("express");

// Importing routes.
const mainRoutes = require("./routes/mainRoutes");

const app = express();

// Setting up app.
// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting static folders.
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
// Showing favicon.
app.use("/favicon.ico", express.static(__dirname + "/favicon.ico"));
app.set("view engine", "ejs");

// Setting up routes.
app.use("/", mainRoutes);

// Starting the server.
const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log("The Server is Running!😁");
});
