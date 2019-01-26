import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    query: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

const SearchInput = (props) => (
    <div className="input-group mb-3">
        <input type="text"
               className="form-control"
               placeholder="Type a query"
               value={props.query}
               onChange={props.onQueryChange}
               required={true}
        />
        <div className="input-group-append">
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={props.onSearch}
            >
                Search
            </button>
        </div>
    </div>
);

SearchInput.propTypes = propTypes;

export default SearchInput;
