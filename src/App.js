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
        const booksEndpoint = API_ENDPOINT + `?q=${this.state.query}&key=${API_KEY}`;

        Client.get(booksEndpoint, (response) => {
            if (response.items) {
                this.setState({books: response.items})
            } else {
                this.setState({books: []})
            }
        })
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
