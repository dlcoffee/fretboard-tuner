import React from 'react';

import '../app.scss';

import Tables from '../Tables';

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

export default String;