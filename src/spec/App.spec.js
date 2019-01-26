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
        Client.get.mockClear();
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
            }];

            wrapper.find('SearchInput').props().onQueryChange({target: {value: 'test'}});
            wrapper.find('SearchInput').props().onSearch();
        });

        it('sends get a request to external API', () => {
            let expectedUrl = constants.API_ENDPOINT + '?q=test&key=' + constants.API_KEY;
            let invocationArguments = Client.get.mock.calls[0];

            expect(invocationArguments[0]).toEqual(expectedUrl)
        });

        describe('when API returns data', () => {
            it('displays books', () => {
                let invocationArguments = Client.get.mock.calls[0];
                let callback = invocationArguments[1];

                callback(books);

                expect(wrapper.state().books).toEqual(books)
            })
        });
    })
});
