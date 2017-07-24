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
      on: true,
    };

    // set up audio context

    // strings = [frequencies]

    this.toggleLoop = this.toggleLoop.bind(this);
    this.toggleOnOff = this.toggleOnOff.bind(this);
  }

  toggleLoop() {
    const { looping, on } = this.state;
    const toggledLooping = !looping;

    if (!toggledLooping && on) {
    }

    this.setState({ looping: toggledLooping });
  }

  toggleOnOff() {
    const { on } = this.state;
    this.setState({ on: !on });
  }

  render() {
    const { context, looping, on } = this.state;
    const loopText = looping ? 'Loop Off' : 'Loop On';
    const onOffText = on ? 'Turn Off' : 'Turn On';

    return (
      <div className="container">
        <h1>fretboard tuner</h1>

        <LoopControl onClick={this.toggleLoop}>{ loopText }</LoopControl>
        <LoopControl onClick={this.toggleOnOff}>{ onOffText }</LoopControl>

        <div className="neck">
          <String name={'E'} context={context} loop={looping} on={on} freq={1318.51} />
          <String name={'B'} context={context} loop={looping} on={on} freq={987.77} />
          <String name={'G'} context={context} loop={looping} on={on} freq={783.99} />
          <String name={'D'} context={context} loop={looping} on={on} freq={587.33} />
          <String name={'A'} context={context} loop={looping} on={on} freq={440}/>
          <String name={'E'} context={context} loop={looping} on={on} freq={329.63} />
        </div>
      </div>
    );
  }
};


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
