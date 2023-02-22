import express from "express";
import cors from "cors";
import morgan from "morgan";
import db_connect from "./src/database/db_connect.js";
import router from "./src/Routes/router.js";
const app = express();

// Port Declaration
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.get("/users", (req, res) => {
  res.send("Hello Form users");
});

//api routes
app.use("/hello-car/api/v1", router);

// root route get req---
app.get("/", (req, res) => {
  res.status.json("Hello Car Engine");
});

//  Server Start if there is only valid connecting-----

db_connect().then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connect to http://localhost:${port}`);
      });
    } catch (err) {
      console.log("Cannot connect database");
    }
  }).catch((error) => {
    console.log("Invalid Database Connection");
  });
