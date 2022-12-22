import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js';
import seedRouter from './routes/seedRoutes.js';
import bookRouter from './routes/bookRoutes.js';
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
app.use('/api/seed',seedRouter);
app.use('/api/books', bookRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
