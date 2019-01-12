import React, { Component } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import copyToClipboard from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardSection } from './common';

class FlatHtmlCopy extends Component {
  renderFlatHtml() {
    if(this.props.parsedTemplate.title === '') {
      return <p style={styles.placeHolderTextStyle}>No Template Selected</p>;
    } else {
      return he.decode(this.props.parsedTemplate.content);
    }
  }
  
  copyToClip() {
    if(this.props.parsedTemplate.title === '') {
      toast.error('Template not selected!');
      return;
    }
    
    copyToClipboard(he.decode(this.props.parsedTemplate.content));
    toast.info('Copied HTML to Clipboard');
  }
  
  render() {
    return (
      <Card headerText="Flat HTML">
        <CardSection>
          <div className="" style={styles.flatHtmlContainerStyle}>
            {this.renderFlatHtml()}
          </div>
          <div style={styles.copyButtonStyle}>
            <button className="btn btn-secondary gutter-top gutter-bottom" onClick={this.copyToClip.bind(this)}>Copy to Clipboard</button>
          </div>
          
          <ToastContainer
             position="top-right"
             type="info"
             autoClose={5000}
             hideProgressBar
             newestOnTop={false}
             closeOnClick
             pauseOnHover={false}
          />
        </CardSection>
      </Card>
    );
  };
}


const styles = {
  flatHtmlContainerStyle: {
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 550,
    overflow: 'auto'
  },
  placeHolderTextStyle: {
    textAlign: 'center'
  },
  copyButtonStyle: {
    textAlign: 'right'
  }
}

function mapStateToProps(state) {
  return {
    parsedTemplate: state.options.parsedTemplate
   };
}

export default connect(mapStateToProps)(FlatHtmlCopy);
