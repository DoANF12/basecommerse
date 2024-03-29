import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js';
import seedRouter from './routes/seedRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const express = require('express');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed',seedRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


app.use((err,req,res,next) => {
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
