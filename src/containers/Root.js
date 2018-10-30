import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import App from './App';
import { getTodos } from '../actions/todos';

class Root extends React.Component {

  componentDidMount = () => {
    this.props.getTodos();
  }

  render() {
    return (
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    );
  }
}

export default connect(null, { getTodos })(Root);