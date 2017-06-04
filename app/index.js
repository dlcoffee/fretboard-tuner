import React from 'react';
import ReactDOM from 'react-dom';

import './app.scss';

import Tables from './Tables';

class String extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.synthesizedSound = this.synthesizedSound.bind(this);
  }

  synthesizedSound() {
    let { context } = this.props;

    let sound = Tables.organ;
    let real = new Float32Array(sound.real.length);
    let imag = new Float32Array(sound.real.length);

    for (var i = 0; i < sound.real.length; i++) {
      real[i] = sound.real[i];
      imag[i] = sound.imag[i];
    }

    let wave = context.createPeriodicWave(real, imag);

    return wave;
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
    oscillator.setPeriodicWave(this.synthesizedSound());
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.start(context.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 3);
    oscillator.stop(context.currentTime + 3);
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