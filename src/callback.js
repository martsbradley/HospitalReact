import React from "react";
import PropTypes from "prop-types";

export class Callback extends React.Component {
    componentDidMount() {
        console.log("Callback componentDidMount");
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            console.log("OK");
            this.props.auth.handleAuthentication();
        }
        else {
            throw new Error("Invalid callback URL");
        }
    }

    render() {
        return "<h1>Loading ... </h1>";
    }
}
Callback.propTypes = {
    location: PropTypes.object,
    auth: PropTypes.object,
}
