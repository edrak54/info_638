//framework inserts
const express = require('express');
const bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({
  helpers: {
    eq: (v1, v2) => v1 == v2,
    ne: (v1, v2) => v1 != v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    someId: (arr, id) => arr && arr.some(obj => obj.id == id),
    in: (arr, obj) => arr && arr.some(val => val == obj),
    dateStr: (v) => v && v.toLocaleDateString("en-US")
  }
});


const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter= require('./routes/genres');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

//application setup
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);

// custom 404 page
app.use((_req, res) => {
    res.status(404);
    res.send("<h1>404 - Not Found, No One Home</h1>");
})
// custom 500 page
app.use((err, _req, res, _next) => {
    console.error(err.message);
    res.status(500);
    res.send("<h1>500 - Server Error</h1>");
})
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`
));