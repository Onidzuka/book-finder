import React from "react";
import PropTypes from 'prop-types';

const propTypes = {
    book: PropTypes.object.isRequired
};

const Book = (props) => (
    <div className="card text-center my-3">
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <img src={props.book.imageLinks.smallThumbnail} height="100"/>
                </div>
                <div className="col-8 text-left">
                    <h6 className="card-title">Author: <span className="font-weight-light">{props.book.authors}</span></h6>
                    <h6 className="card-title">Title: <span className="font-weight-light">{props.book.title}</span></h6>
                    <h6 className="card-title">Publisher: <span className="font-weight-light">{props.book.publisher}</span></h6>

                    <a href={props.book.infoLink} target="_blank">Read more</a>
                </div>
            </div>
        </div>
    </div>
);

Book.propTypes = propTypes;

export default Book;
