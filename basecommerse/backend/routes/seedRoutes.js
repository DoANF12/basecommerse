import express from 'express';
import Book from '../models/bookModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req,res) => {
    await Book.remove({});
    const createBooks = await Book.insertMany(data.books);
    res.send({ createBooks });
});

export default seedRouter;