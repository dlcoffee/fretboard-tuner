import React from 'react';
import ReactDOM from 'react-dom';

import './app.scss';

class String extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('clicked!');

    let { context, freq } = this.props;

    let oscillator = context.createOscillator();
    let gainNode = context.createGain();

    oscillator.connect(gainNode)
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.start(context.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
    oscillator.stop(context.currentTime + 1);
  }

  render() {
    let { freq, name } = this.props;

    return (
      <div className="string" onClick={() => this.onClick()}>
        frequency: {freq}, note: {name}
      </div>
    )
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      context: new (window.AudioContext || window.webkitAudioContext)(),
    };

    // set up audio context

    // strings = [frequencies]
  }

  render() {
    const { context } = this.state;

    return (
      <div className="container">
        <h1>fretboard tuner</h1>

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