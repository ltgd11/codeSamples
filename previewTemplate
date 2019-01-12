import React, { Component } from 'react';
import { connect } from 'react-redux';
import he from 'he';

class PreviewPage extends Component {
  
  renderPreview() {
    if(this.props.parsedTemplate.title === '') {
      return <p style={styles.textStyle}>No Template Selected</p>;
    } else {
      const decodedHtml = he.decode(this.props.parsedTemplate.content);
      return <div dangerouslySetInnerHTML={{__html: decodedHtml}} />
    }
  }
  
  render() {
    return (
      <div className="gutter-bottom" style={styles.containerStyle}>
        {this.renderPreview()}
      </div>
    );
  };
}

const styles = {
  containerStyle: {
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 550,
    overflow: 'auto'
  },
  textStyle: {
    textAlign: 'center'
  }
}

function mapStateToProps(state) {
  return {
    parsedTemplate: state.options.parsedTemplate
   };
}

export default connect(mapStateToProps)(PreviewPage);
