import React from "react";
import PropTypes from 'prop-types';

import Book from './Book';

const propTypes = {
    books: PropTypes.array.isRequired
};

const BooksList = (props) => (
    props.books.map((book) => (
        <Book
            key={book.id}
            book={book}
        />
    ))
);

BooksList.propTypes = propTypes;

export default BooksList;
