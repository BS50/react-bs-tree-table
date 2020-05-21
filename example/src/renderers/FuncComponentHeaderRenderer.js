import React from "react";
import PropTypes from 'prop-types';

const FuncComponentHeaderRenderer = (props) => {
    return <div style={{backgroundColor: 'blue'}}>
        {props.headerInfo.title}
    </div>
}

FuncComponentHeaderRenderer.propTypes = {
    headerInfo: PropTypes.object.isRequired
};

export default FuncComponentHeaderRenderer
