const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

/**
 *  Router File Import
 */
const userRoutes = require("./routes/user");
const carRoutes = require("./routes/car");

/**
 * MAIN APP CONFIG
 */

const app = express();
app.use(express.json());
app.use(cors());

/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use("/api/user", userRoutes);
app.use("/api/cars", carRoutes);

/**
 * MAIN BASE GET PATH
 */
app.get("/", (req, res) => {
  res.send("<h1>API running</h1>");
});

/**
 * NODEJS SERVER
 */
mongoose
  .connect(
    // `mongodb+srv://health-care:health-care@cluster0.exu8z.mongodb.net/?retryWrites=true&w=majority`,
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@hellocar.xrfladb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    // `mongodb://127.0.0.1:27017/engleTalk`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server is running at port:${port}`));
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Oops! Could not connect to mongoDB Cluster0", err);
  });
