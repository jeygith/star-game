import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
//STAR MATCH - Starting Template
import Game from "./components/Game";


// v1 STAR MATCH - Starting Template


const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}


// ReactDOM.render(<StarMatch/>, mountNode);


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default StarMatch;
