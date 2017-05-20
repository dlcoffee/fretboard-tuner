import React from 'react';
import ReactDOM from 'react-dom';

console.log('hi!');

class App extends React.Component {
  render() {
    return(
      <div>hi</div>
    );
  }
};


ReactDOM.render(
  <App />,
  document.getElementById('app')
);

