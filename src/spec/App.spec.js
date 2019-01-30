import React from 'react'
import { shallow } from 'enzyme';

import App from '../App'
import Client from "../client/Client";
import * as constants from "../constants/Constants"

jest.mock('../client/Client');

describe('App', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    afterEach(() => {
        Client.searchBooks.mockClear();
    });

    it('inits state', () => {
        expect(wrapper.state()).toEqual({
            query: '',
            books: [],
            validationErrors: {}
        })
    });

    describe('when user searches for books', () => {
        let books;

        beforeEach(() => {
            books = [{
                id: '1',
                volumeInfo: {
                    authors: ['Charles Dickens'],
                    title: 'Lord of The Rings',
                    publisher: 'Wallflower Press',
                    infoLink: "test",
                    imageLinks: {smallThumbnail: "test"}
                }
            }, {
                id: '2',
                volumeInfo: {}
            }];

            wrapper.find('SearchInput').props().onQueryChange({target: {value: 'test'}});
            wrapper.find('SearchInput').props().onSearch();
        });

        it('sends get a request to external API', () => {
            let expectedUrl = constants.API_ENDPOINT + '?q=test&key=' + constants.API_KEY;
            let invocationArguments = Client.searchBooks.mock.calls[0];

            expect(invocationArguments[0]).toEqual(expectedUrl)
        });

        describe('when API returns data', () => {
            it('displays books', () => {
                let expected_result = [{
                    id: '1',
                    authors: ['Charles Dickens'],
                    title: 'Lord of The Rings',
                    publisher: 'Wallflower Press',
                    infoLink: "test",
                    imageLinks: {smallThumbnail: "test"}
                }, {
                    id: '2',
                    authors: [],
                    title: '',
                    publisher: '',
                    infoLink: "",
                    imageLinks: {smallThumbnail: "/images/placeholder.png"}
                }];

                let invocationArguments = Client.searchBooks.mock.calls[0];
                let callback = invocationArguments[1];

                callback({items: books});

                expect(wrapper.state().books).toEqual(expected_result)
            })
        });

        describe('when no results given from API', () => {
            it('sets resets books', () => {
                wrapper.setState({books});

                let invocationArguments = Client.searchBooks.mock.calls[0];
                let callback = invocationArguments[1];

                callback({});

                expect(wrapper.state().books).toEqual([])
            })
        });
    });

    describe('when empty input given', () => {
        beforeEach(() => {
            wrapper.find('SearchInput').props().onQueryChange({target: {value: ''}});
            wrapper.find('SearchInput').props().onSearch();
        });

        it('displays validation errors', () => {
            expect(wrapper.find('SearchInput').dive().find('.error').text()).toEqual('Required')
        });

        it('does not make API calls', () => {
            expect(Client.searchBooks.mock.calls.length).toEqual(0)
        })
    });

    describe('when input value is present', () => {
        let callback;

        beforeEach(() => {
            wrapper.setState({validationErrors: {query: 'test'}});

            wrapper.find('SearchInput').props().onQueryChange({target: {value: 'test'}});
            wrapper.find('SearchInput').props().onSearch();

            let invocationArguments = Client.searchBooks.mock.calls[0];
            callback = invocationArguments[1];
        });

        it('hides error messages', () => {
            callback({items: []});

            expect(wrapper.find('SearchInput').dive().find('.error').text()).toEqual('')
        });

        it('hides error messages', () => {
            callback({});

            expect(wrapper.find('SearchInput').dive().find('.error').text()).toEqual('')
        });
    });
});
