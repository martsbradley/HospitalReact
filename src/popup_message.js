import React from 'react'
import PropTypes from 'prop-types';

export default class PopupMessage extends React.Component {

  render() {
        return (
          <div className='popup'>
            <div className='popup_inner'>
              <h1>{this.props.title}</h1>
                  {this.props.message} 
                <br/>
                <br/>
                <button onClick={this.props.closePopup}>Ok</button>
            </div>
          </div>
        );
    }
}
PopupMessage.propTypes = {
    title : PropTypes.string,
    message   : PropTypes.string,
    closePopup   : PropTypes.function
}
