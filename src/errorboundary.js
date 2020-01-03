import React from 'react'
import PropTypes from 'prop-types';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    console.log("Look at this");
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Unhandled Error.</h1>;
    }

    return this.props.children; 
  }
}
ErrorBoundary.propTypes = {
    children: PropTypes.object
};
