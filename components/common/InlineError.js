import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
    <span style={{ color: "#ff0000",fontSize:".8em" }}>{text}</span>
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;