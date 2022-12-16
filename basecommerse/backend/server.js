import express from "express";
import data from "./data.js";

const app = express();

app.get('/api/books', (req,res) => {
    res.send(data.books)
});

app.get('/api/books/codigoISBN/:codigoISBN', (req,res) => {
    const book = data.books.find((x) => x.codigoISBN === req.params.codigoISBN);
    if(book){
        res.send(book);
    } else {
        res.status(404).send({message: 'Book Not Found'});
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});