import React, { Component } from 'react';
import ControlButtons from './ControlButtons';
import MajorClock from './MajorClock';
import SplitTimes from './SplitTimes';

class StopWatch extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isStarted: false,
            startTime: null,
            currentTime: null,
            splits: []
        }
    }

    handleStart = () => {
        this.setState({
            isStarted: true,
            startTime: new Date(),
            currentTime: new Date()
        });

        this.timer = setInterval(() => this.setState({ currentTime: new Date() }), 1000 / 60);
    }

    handlePause = () => {
        clearInterval(this.timer);

        this.setState({
            isStarted: false
        });
    }

    handleReset = () => {
        this.setState({
            startTime: null,
            currentTime: null,
            splits: []
        });
    }

    handleSplit = () => {
        this.setState({
            splits: [...this.state.splits, this.state.currentTime - this.state.startTime]
        });
    }

    render() {
        return (
            <>
                <MajorClock milliseconds={this.state.currentTime - this.state.startTime} />
                <ControlButtons
                    activated={this.state.isStarted}
                    handlePause={this.handlePause}
                    handleReset={this.handleReset}
                    handleSplit={this.handleSplit}
                    handleStart={this.handleStart}
                />
                <SplitTimes value={this.state.splits} />
            </>
        );
    }
}

export default StopWatch;