const books = [
    {title: "book one", publishingYear: "2026"},
    {title: "book two", publishingYear: "2025"}
];

exports.all = books;

exports.upsert = (book) => {
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}

exports.add = (book) => {
  books.push(book);
};
exports.update = (book) => {
  book.id = parseInt(book.id);
  books[book.id] = book;
}
exports.get = (idx) => {
  return books[idx];
}