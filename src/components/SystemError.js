import React from "react";
import PropTypes from 'prop-types'

const propTypes = {
    systemError: PropTypes.bool.isRequired
};

const SystemError = (props) => {
    if (props.systemError) {
        return (<div className="card text-white mb-3">
            <div className="card-body">
                <p className="card-text" style={{color: 'red'}}>Something went wrong.</p>
            </div>
        </div>)
    } else {
        return null
    }
};

SystemError.propTypes = propTypes;

export default SystemError;
