const books = [
    {title: "book one", publishingYear: "2026"},
    {title: "book two", publishingYear: "2025"}
];

exports.add = (book) => {
    books.push(book);
};

exports.all = books;