import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import App from './App';
import { getTodos } from '../actions/todos';

class Root extends React.Component {

  componentDidMount = () => {
    this.props.getTodos();
  }

  render() {
    console.log(this.props);
    return (
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    );
  }
}

Root.propTypes = {
  getTodos: PropTypes.func.isRequired
};


export default connect(null, { getTodos })(Root);