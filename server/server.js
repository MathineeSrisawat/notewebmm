require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/notes", noteRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 4000;
if ( process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}
