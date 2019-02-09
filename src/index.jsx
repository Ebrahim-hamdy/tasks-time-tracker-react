import React from 'react';
import ReactDOM from 'react-dom';

import TaskComponent from './components/Task/Task.component'

class App extends React.Component {
  render() {
    return <TaskComponent />;
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
