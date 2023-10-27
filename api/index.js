// node se backend server run karne se refresh karna hota h
// isiliye nodemon ka use karte h jisse live refresh ho jaata h changes karne par

// package json jo main folder mein h usme dev ko nodemon kiye and
// start ko node kiye kyuki start klerne ke liye node
// important h par refresh karne ke liye nodemon ka use kar sakte h

// Redux toolkit -> Redux toolkit is added in our application so that we can have
// access to same information in different
// places in our application

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { application } from "express";
dotenv.config();

// this is done to hide the user id and password in the environment
// variables file
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

// this is going to allow json as the input of the server
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

// create a api route
//req -> data we get from client
// side and res sent from server side

// app.get('/test',(req,res)=>{
//   res.send('Hello World');
// });
//localhost:3000/test mein check karenge to hello world aayega
// anything can be sent to the client

// api route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// err req res next
// middleware
app.use((err, req, res, next) => {
  //jo error code dega wo hoga agar kuch nhi to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    // after es6 if the varialbe and the key have the same name
    // we can remove one of them
    statusCode,
    message,
  });
});
