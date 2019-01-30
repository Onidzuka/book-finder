import React, {Component} from 'react';

import SearchInput from './SearchInput';
import BooksList from './BooksList';
import SystemError from './SystemError';
import Client from '../client/Client';

import * as constants from "../constants/Constants"

class App extends Component {
    state = {
        query: '',
        books: [],
        validationErrors: {},
        systemError: false
    };

    handleQueryChange = (event) => {
        this.setState({query: event.target.value})
    };

    handleSearchBooks = () => {
        let validationErrors = this._validate();

        if (Object.keys((this._validate())).length) {
            this.setState({validationErrors})
        } else {
            Client.searchBooks(this.state.query, this._loadBooks, this._systemError)
        }
    };

    _validate = () => {
        const errors = {};

        if (!this.state.query.length) {
            errors.query = 'Required';
        }

        return errors
    };

    _loadBooks = (response) => {
        let items = response.data.items;

        if (items) {
            this.setState({books: this._extractBooks(items), validationErrors: {}, systemError: false})
        } else {
            this.setState({books: [], validationErrors: {}})
        }
    };

    _systemError = () => {
        this.setState({systemError: true});
    };

    _extractBooks = (items) => {
        return items.map((item) => {
            let {id, volumeInfo} = item;

            let {
                authors = [],
                title = '',
                publisher = '',
                infoLink = '',
                imageLinks = {smallThumbnail: constants.IMAGE_PLACEHOLDER}
            } = volumeInfo;

            return {id, authors, title, publisher, infoLink, imageLinks}
        });
    };

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
                        <SystemError
                            systemError={this.state.systemError}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
