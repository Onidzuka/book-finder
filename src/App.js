import React, {Component} from 'react';

import SearchInput from './SearchInput';
import BooksList from './BooksList';

import Client from './client/Client';
import {
    API_ENDPOINT,
    API_KEY
} from "./constants/Constants";

class App extends Component {
    state = {
        query: '',
        books: [],
        validationErrors: {}
    };

    handleQueryChange = (event) => {
        this.setState({query: event.target.value})
    };

    handleSearchBooks = () => {
        let validationErrors = this.validate();

        if (Object.keys((validationErrors)).length) {
            this.setState({validationErrors})
        } else {
            const booksEndpoint = API_ENDPOINT + this._constructQuery();

            Client.searchBooks(booksEndpoint, (response) => {
                if (response.items) {
                    let books = this._processResponse(response.items);

                    this.setState({books, validationErrors})
                } else {
                    this.setState({books: [], validationErrors})
                }
            })
        }
    };

    validate = () => {
        const errors = {};

        if (!this.state.query.length) {
            errors.query = 'Required';
        }

        return errors
    };

    _processResponse = (items) => {
        return items.map((item) => {
            let {id, volumeInfo} = item;

            let {
                authors = [],
                title = '',
                publisher = '',
                infoLink = '',
                imageLinks = {smallThumbnail: '/images/placeholder.png'}
            } = volumeInfo;

            return {id, authors, title, publisher, infoLink, imageLinks}
        });
    };

    _constructQuery() {
        return `?q=${this.state.query}&key=${API_KEY}`;
    }

    render() {
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SearchInput
                            query={this.state.query}
                            onQueryChange={this.handleQueryChange}
                            onSearch={this.handleSearchBooks}
                            validationErrors={this.state.validationErrors}
                        />
                        <BooksList
                            books={this.state.books}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
