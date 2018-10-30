import React from 'react';
import { withRouter } from 'react-router-dom';

class TodoEdit extends React.Component {

  state = {
    id: this.props.data.byId[this.props.match.params.id].id,
    text: this.props.data.byId[this.props.match.params.id].text
  }

  inputTodo = e => {
    this.setState({ text: e.target.value.trim() });
  }

  updateTodo = e => {
    e.preventDefault();
    
    const { id, text } = this.state;
    if (id.length > 0 && text.length > 0) this.props.updateTodo(id, text);
  }

  render() {
    const { text } = this.state;

    return (
      <div>
        <h2>Edit a Todo</h2>
        
        <form onSubmit={this.updateTodo}>
          <input name="todo" type="text" defaultValue={text} onChange={this.inputTodo} />
          <button type="submit">Update</button>
        </form>

        <button onClick={() => this.props.history.goBack()}>Back</button>

      </div>
    );
  }
}

export default withRouter(TodoEdit);