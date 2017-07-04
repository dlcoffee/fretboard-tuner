import React from 'react';
import ReactDOM from 'react-dom';

import String from './components/String';
import LoopControl from './components/LoopControl';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      context: new (window.AudioContext || window.webkitAudioContext)(),
      looping: false,
    };

    // set up audio context

    // strings = [frequencies]

    this.toggleLoop = this.toggleLoop.bind(this);
  }

  toggleLoop() {
    const { looping } = this.state;
    this.setState({ looping: !looping });
  }

  render() {
    const { context, looping } = this.state;
    const loopText = looping ? 'Loop Off' : 'Loop On';

    return (
      <div className="container">
        <h1>fretboard tuner</h1>

        <LoopControl onClick={this.toggleLoop}>{ loopText }</LoopControl>

        <div className="neck">
          <String name={'E'} context={context} freq={1318.51} />
          <String name={'B'} context={context} freq={987.77} />
          <String name={'G'} context={context} freq={783.99} />
          <String name={'D'} context={context} freq={587.33} />
          <String name={'A'} context={context} freq={440}/>
          <String name={'E'} context={context} freq={329.63} />
        </div>
      </div>
    );
  }
};


ReactDOM.render(
  <App />,
  document.getElementById('app')
);