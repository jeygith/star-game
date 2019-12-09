import React, {useState} from "react";
import utils from "../math-utils";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarDisplay";
import PlayNumber from "./PlayNumber";

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));

    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    //setInterval setTimeout

    React.useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
        return () => console.log('component is c');
    });

    const setGameState = (newCandidateNums) => {

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNumbers = availableNums.filter(number => !newCandidateNums.includes(number));

            setStars(utils.randomSumIn(newAvailableNumbers, 9));

            setAvailableNums(newAvailableNumbers);
            setCandidateNums([]);
        }
    }
    return {
        stars, availableNums, candidateNums, secondsLeft, setGameState
    };
}


const Game = (props) => {
    /*   const [stars, setStars] = useState(utils.random(1, 9));

       const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
       const [candidateNums, setCandidateNums] = useState([]);
       const [secondsLeft, setSecondsLeft] = useState(10);

       //setInterval setTimeout

       React.useEffect(() => {
           if (secondsLeft > 0 && availableNums.length > 0) {
               const timerId = setTimeout(() => {
                   setSecondsLeft(secondsLeft - 1);
               }, 1000)
               return () => clearTimeout(timerId);
           }
           return () => console.log('component is c');
       })*/
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState();
    const candidatesAreWrong = utils.sum(candidateNums) > stars;


    /*const gameIsWon = availableNums.length === 0;
    const gameIsLost = secondsLeft === 0;*/
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active'
    /*
        const resetGame = () => {
            setStars(utils.random(1, 9));
            setAvailableNums(utils.range(1, 9));
            setCandidateNums([]);

        };*/

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available'
    };

    const onNumberClick = (number, status) => {
        console.log(number, status);
        if (gameStatus !== 'active' || status == 'used') return;

        const newCandidateNums =
            status === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        /*  if (utils.sum(newCandidateNums) !== stars) {
              setCandidateNums(newCandidateNums);
          } else {
              const newAvailableNumbers = availableNums.filter(number => !newCandidateNums.includes(number));

              setStars(utils.randomSumIn(newAvailableNumbers, 9));

              setAvailableNums(newAvailableNumbers);
              setCandidateNums([]);
          }*/
        setGameState(newCandidateNums);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ?
                            (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>)
                            : (<StarsDisplay count={stars}/>
                            )
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default Game;
