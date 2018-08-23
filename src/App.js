import React, { Component } from 'react';
import './App.css';

const columns = [
  { name: 'Winnie', color: '#836e95' },
  { name: 'Bob', color: '#39a59c' },
  { name: 'Thomas', color: '#344759' },
  { name: 'George', color: '#e8741e' }
];

class App extends Component {
  state = {
    tasks: []
  };

  componentWillMount() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.setState({ tasks: JSON.parse(tasks) });
    }
  }

  getTasksForColumn(column) {
    return this.state.tasks.filter(task => task.columnName === column.name);
  }

  addCardToColumn(column) {
    const cardText = prompt('What to do');

    const tasks = [...this.state.tasks, { columnName: column.name, text: cardText }];
    this.setState({ tasks });
    this.saveState(tasks);
  }

  moveCard(task, amount) {
    let index = -1;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].name === task.columnName) {
        index = i;
      }
    }

    let newIndex = ((index + amount) + columns.length) % columns.length;
    const newColumn = columns[newIndex];

    const tasks = this.state.tasks.map(t => {
      if (t === task) {
        t = { ...t, columnName: newColumn.name };
      }

      return t;
    });

    this.setState({ tasks });
    this.saveState(tasks);
  }

  saveState(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  render() {
    return (
      <div className="row">
        {columns.map(column => (
          <div className="task-card">
            <div className="task-card__header" style={{ backgroundColor: column.color }}>
              {column.name}
            </div>

            {this.getTasksForColumn(column).map(task => (
              <div className="task-card-item">
                <div className="caret caret--left" onClick={() => this.moveCard(task, -1)} />
                <div className="task-card-item__body">{task.text}</div>
                <div className="caret caret--right" onClick={() => this.moveCard(task, 1)} />
              </div>
            ))}

            <button onClick={() => this.addCardToColumn(column)}>Add a card</button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
