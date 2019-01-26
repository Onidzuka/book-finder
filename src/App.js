import React, {Component} from 'react';

import SearchInput from './SearchInput'
import BooksList from './BooksList'

import Client from './client/Client'
import {
    API_ENDPOINT,
    API_KEY
}  from "./constants/Constants";

import './App.css';

class App extends Component {
    state = {
        query: '',
        books: []
    };

    handleQueryChange = (event) => {
        this.setState({query: event.target.value})
    };

    handleSearchBooks = () => {
        const booksEndpoint = API_ENDPOINT + this._constructQuery();

        Client.get(booksEndpoint, (response) => {
            if (response.items) {
                let books = this._processResponse(response.items);

                this.setState({books})
            } else {
                this.setState({books: []})
            }
        })
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
