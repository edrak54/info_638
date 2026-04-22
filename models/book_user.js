const db = require('../database');

exports.statuses = [
  "todo","reading","finished"
];

exports.add = async (book_user) => {
  return db.getPool()
    .query(`INSERT INTO books_users(book_id, user_id, read_status) VALUES($1, $2, $3) RETURNING *;`,
      [book_user.bookId, book_user.userId, book_user.status]);
}

exports.get = async (bookId, userId) => {
const { rows } = await db.getPool().query(`select * from books_users where book_id = $1 and user_id = $2;`,
    [bookId, userId])
  return db.camelize(rows)[0]
}

exports.AllForUser = async (user) => {
const { rows } = await db.getPool().query(
  `select books.title, books_users.read_status
    from books_users
    join books on books.id = books_users.book_id
    where user_id = $1;`,
    [user.id]);
  return db.camelize(rows);
}

exports.update = async (bookUser) => {
  await db.getPool().query("UPDATE books_users SET read_status = $1 where id = $2;",
      [bookUser.readStatus, bookUser.id]);
}

exports.upsert = (bookUser) => {
  if (bookUser.id) {
    return exports.update(bookUser);
  } else {
    return exports.add(bookUser);
  }
  // let idx = books_users.findIndex((bu) => {
  //   return bu.bookId == book_user.bookId &&
  //          bu.userEmail == book_user.userEmail;
  // });
  // if (idx == -1) {
  //   exports.add(book_user);
  // } else {
  //   exports.update(idx,book_user);
  // }
}
