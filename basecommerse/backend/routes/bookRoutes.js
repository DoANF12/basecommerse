import express from 'express';
import Book from '../models/bookModel.js';

const bookRouter = express.Router();

bookRouter.get('/', async (req,res) => {
    const books = await Book.find();
    res.send(books);
});

bookRouter.get('/isbn13/:isbn13', async(req,res) => {
    const book = await Book.findOne({isbn13:req.params.isbn13});
    if(book){
        res.send(book);
    } else {
        res.status(404).send({message: 'Book Not Found'});
    }
});

bookRouter.get('/:id', async(req,res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        res.send(book);
    } else {
        res.status(404).send({message: 'Book Not Found'});
    }
});

export default bookRouter;

