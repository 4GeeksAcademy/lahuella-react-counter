import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faArrowsRotate, faClock } from '@fortawesome/free-solid-svg-icons';

const SecondsCounter = (props) => {
    return (
        <div className="CounterBox">
            <div className="calendar">
                <FontAwesomeIcon icon={faClock} size="3x" />
            </div>
            <div className="Counter">
                <div className="Four">{props.digitFour % 10}</div>
                <div className="Three">{props.digitThree % 10}</div>
                <div className="Two">{props.digitTwo % 10}</div>
                <div className="One">{props.digitOne % 10}</div>
            </div>
        </div>
    );
};

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [targetTime, setTargetTime] = useState(60);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (counter === targetTime) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }, [counter, targetTime]);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
            setIntervalId(id);

            return () => clearInterval(id);
        } else {
            return () => clearInterval(intervalId);
        }
    }, [isRunning]);

    const digitFour = Math.floor(counter / 1000);
    const digitThree = Math.floor(counter / 100);
    const digitTwo = Math.floor(counter / 10);
    const digitOne = Math.floor(counter / 1);

    const stopCounter = () => {
        setIsRunning(false);
    };

    const resumeCounter = () => {
        setIsRunning(true);
    };

    const resetCounter = () => {
        setIsRunning(false);
        setCounter(0);
    };

    return (
        <div className="Content">
            <SecondsCounter
                digitFour= {digitFour} digitThree= {digitThree} digitTwo= {digitTwo} digitOne= {digitOne}/>
            <div className="Buttons">
                <button onClick={resumeCounter}><FontAwesomeIcon icon={faPlay} /></button>
                <button onClick={stopCounter}><FontAwesomeIcon icon={faPause} /></button>
                <button onClick={resetCounter}><FontAwesomeIcon icon={faArrowsRotate} /></button>
            </div>
            <div>
                <label>Alerta: </label>
                <input 
                    type="number" 
                    value={targetTime}
                    onChange={(e) => setTargetTime(parseInt(e.target.value))}
                    min="1"
                    max="60"
                />
            </div>
            {showAlert && (
                <div className="alert">
                    <FontAwesomeIcon icon={faClock} />
                    <span>¡Has llegado a los {targetTime} segundos!</span>
                </div>
            )}
        </div>
    );
};

export default Counter;