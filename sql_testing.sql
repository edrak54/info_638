DROP DATABASE if exists my_first_db;

CREATE DATABASE my_first_db;

\c my_first_db

CREATE TABLE authors (
    id serial primary key,
    first_name text,
    last_name text
);

CREATE TABLE books (
    id serial primary key, 
    title text, 
    publishing_year integer
);

CREATE TABLE genres (
    id serial primary key, 
    name text
);

insert into authors (first_name, last_name) values ('William', 'Shakespeare');
insert into authors (first_name, last_name) values ('Jane', 'Austen');
insert into authors (first_name, last_name) values ('Leo', 'Tolstoy');
insert into authors (first_name, last_name) values ('Virginia', 'Woolf');
insert into authors (first_name, last_name) values ('James', 'S. A. Corey');
insert into authors (first_name, last_name) values ('Robert', 'Caro');
insert into authors (first_name, last_name) values ('Shirley', 'Jackson');
insert into authors (first_name, last_name) values ('John', 'Milton');

insert into books (title, publishing_year) values ('The Power Broker', '1975');
insert into books (title, publishing_year) values ('Hangsaman', '1951');
insert into books (title, publishing_year) values ('Paradise Lost', '1667');

insert into genres (name) values ('Biography');
insert into genres (name) values ('Mystery');
insert into genres (name) values ('Classic');