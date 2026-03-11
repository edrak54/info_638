const books = [
    {title: "book one", publishingYear: 2026},
    {title: "The Power Broker", publishingYear: 1975, genreId: ["2"]},
    {title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0","1"]}

];

exports.get = (idx) => {
  return books[idx];
}

exports.add = (book) => {
  books.push(book);
}

exports.update = (book) => {
  books[book.id] = book;
}

exports.upsert = (book) => {
  if (book.authorIds && !Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.genreIds && !Array.isArray(book.genreIds)) {
    book.genreIds = [book.genreIds];
  }
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}

exports.all = books