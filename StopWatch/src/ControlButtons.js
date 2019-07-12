import React from 'react';
import PropTypes from 'prop-types';
import './ControlButtons.css';

const ControlButtons = ({ activated, handleStart, handlePause, handleReset, handleSplit }) => {
    if (activated) {
        return (
            <div>
                <button onClick={handleSplit} className="left-btn" >计次</button>
                <button onClick={handlePause} className="right-btn" >停止</button>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={handleReset} className="left-btn" >复位</button>
                <button onClick={handleStart} className="right-btn" >启动</button>
            </div>
        );
    }
};
ControlButtons.propTypes = {
    activated: PropTypes.bool,
    handleStart: PropTypes.func.isRequired,
    handlePause: PropTypes.func.isRequired,
    handleSplit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired
};

export default ControlButtons;