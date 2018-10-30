import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Header extends React.Component {

  render() {
    return (
      <header>
        <Link to='/'>View All</Link>{' | '}
        <Link to='/completed'>View Completed</Link>{' | '}
        <Link to='/incomplete'>View Incomplete</Link>
        
        <hr />
      </header>
    );
  }
}

export default withRouter(Header);