import React from 'react';

import '../app.scss';

import Tables from '../Tables';

class String extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.synthesizedSound = this.synthesizedSound.bind(this);
    this.playAt = this.playAt.bind(this);
    this.createOscillator = this.createOscillator.bind(this);
    this.stop = this.stop.bind(this);
  }

  synthesizedSound() {
    let { context } = this.props;

    let sound = Tables.fuzzGuitar;
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
    let { on, context } = this.props;

    if (!on) {
      return;
    }

    this.playAt(context.currentTime, true);
  }

  createOscillator() {
    let { context } = this.props;

    this.stop();
    this.osc = context.createOscillator();
  }

  stop() {
    if (this.osc) {
      this.osc.onended = null;
      this.osc.disconnect();
      this.osc = null;
    }
  }

  playAt(when, loopOnce) {
    console.log('called:', when);
    let { context, loop, freq } = this.props;

    this.createOscillator();
    let gainNode = context.createGain();

    this.osc.connect(gainNode)
    gainNode.connect(context.destination);

    this.osc.type = 'sine';
    this.osc.frequency.value = freq;
    this.osc.setPeriodicWave(this.synthesizedSound());
    gainNode.gain.setValueAtTime(1, when);

    this.osc.start(when);

    let duration = 2;

    gainNode.gain.exponentialRampToValueAtTime(0.001, when + duration);
    this.osc.stop(when + duration);

    this.osc.onended = (loop && loopOnce) ? this.playAt(when + 2, true) : null;
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
