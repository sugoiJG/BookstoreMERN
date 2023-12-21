require('dotenv').config();

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'


const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for CORS 
//OPTION 1: Allow All-origins with default of cors(*)
app.use(cors())

//OPTION 2: Allow custom origins
// app.use(
//     cors({
//         origins: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To My MERN Stack App");
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
