import React from 'react'
import PropTypes from 'prop-types';

export default class BackButton extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    render () {
        let result = (<button onClick={this.goBack}>{this.props.text}</button>);
        return result;
    }
}

BackButton.propTypes = {
    history : PropTypes.object,
    text  : PropTypes.string,
}
