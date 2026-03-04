const books = [
    {title: "book one", publishingYear: 2026},
    {title: "book two", publishingYear: 2025},
    {title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0","1"]}

];

exports.all = books;

exports.upsert = (book) => {

  if (book.authorIds && !Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }

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