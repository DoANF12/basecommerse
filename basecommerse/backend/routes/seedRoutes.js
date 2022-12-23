import express from 'express';
import Book from '../models/bookModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req,res) => {
    await Book.remove({});
    const createBooks = await Book.insertMany(data.books);
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createBooks, createUsers });
});

export default seedRouter;