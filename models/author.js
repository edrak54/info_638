const authors = [
    {firstName: "James", lastName: "S. A. Corey"},
    {firstName: "Craig", lastName: "Alanson"},
    {firstName: "Cixin", lastName: "Liu"},
    {firstName: "Shirley", lastName: "Jackson"}
];

exports.add = (author) => {
    authors.push(author);
};

exports.all = authors;