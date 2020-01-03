import React from 'react'
import PropTypes from 'prop-types';
import {showValidationMessages} from './validationmessage'

export default class AddImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            detail : { description : ''},
            uploadInput : null,
        };

        console.log("AddImage constructor " + Object.keys(props));

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('uploadedFile', this.uploadInput.files[0]);
        formData.append('description',  this.state.detail.description);

        console.log("formData "+ formData);
        const patientId = this.props.match.params.patientId;
        console.log("patientId " + patientId);

        let url = `/rest/hospital/patient/${patientId}/image`

        fetch(url, {
        method: 'POST',
        body: formData,
        }).then((response) => {
          console.log("got response" + response.status);
          if (response.status === 413) {
            console.log("413 problem");
            let validations = {errors: [{field: "uploadedFile",message:"Sorry image size is too large."}]};


            showValidationMessages(validations);
          }
          //response.json().then((body) => {
          //    //this.setState({ imageURL: `http://localhost:8000/${body.file}` });
          //});
        })
        .catch(exn => {
            console.log('Some fault.   : ' + exn.statusText)
        });

        console.log("Got after the post");
    }

    handleFormChange (event) {

        let detail = this.state.detail

        detail[event.target.name] = event.target.value
        this.setState({ detail })
    }

    render () {

        const patientId = this.props.match.params.patientId;
        console.log("Render upload screen patientId " + patientId);
        const detail = this.state.detail;
        return ( 
            <div>
              <form onSubmit={this.handleUploadImage}>
                <div className="col-md-6 form-line">
                  <div className="form-group">
                    <label htmlFor="uploadedFile">Select Image</label>

                    <input className="form-control-file" 
                           ref={(ref) => {this.uploadInput = ref;}} 
                           type="file" 
                           name="uploadedFile" accept=".png,.jpg" /> 

                    <span className="errors" name="uploadedFile.errors"></span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" 
                           type="text" 
                           name="description" 
                           value={detail.description} 
                           onChange={this.handleFormChange}
                           placeholder="Image Description" />
                  </div>

                  <br />
                  <div>
                    <button>Upload</button>
                  </div>
                </div>
              </form>
            </div>)
    }
}


AddImage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            patientId: PropTypes.string.isRequired
        })
    })
}
