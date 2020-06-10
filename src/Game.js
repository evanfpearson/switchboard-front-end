import React, {useState, useEffect, useRef} from 'react';
import {Link, useParams, Redirect} from "react-router-dom"
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ReactDice from "react-dice-complete"
import 'react-dice-complete/dist/react-dice-complete.css'


function Game() {

    let { code } = useParams();
    let reactDice = useRef(null);

    const [activePlayer, setActive] = useState(true);
    const [rollPhase, setRollPhase] = useState('roll');
    const [diceRoll, setDiceRoll] = useState([1,1]);
    const [currentPlayer, setCurrentPlayer] = useState("");

    useEffect(
        () => {
            const interval = setInterval(
                () => fetch(
                    "http://localhost:5000/game/" + code,
                    {
                        method: 'GET',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors'
                    }
                ).then(
                    response => response.json()
                ).then(
                    response => {
                        setDiceRoll(response['dice_roll']);
                        setCurrentPlayer(response.players[response.player_to_move].name)
                    }
                )
                , 1000);
            return () => clearInterval(interval)
        }, [code]
    );

    const rollDice = () => {
        console.log(diceRoll)
        reactDice.rollAll(diceRoll)
    }

    const getRollButton = () => {
        if (activePlayer && rollPhase === 'roll') {
            return <Button onClick={() => rollDice()} block active>
                Roll Dice
            </Button>
        } else {
            return <Button block disabled>
                Roll Dice
            </Button>
        }
    };

    return (
        <>
            <h2>Game Code: <Badge variant="primary">{code}</Badge></h2>
            <h3>Current player: {currentPlayer}</h3>
            <br/>

            {getRollButton()}
            <ReactDice
                numDice={2}
                ref={dice => reactDice = dice}
                rollDone={() => console.log("rolled")}
                faceColor={"#FFFFFF"}
                dotColor={"#000000"}
                outlineColor={"#BBBBBB"}
                outline={true}
                rollTime={1}
            />
            <Button variant="secondary" size="sm" block>
                Leave
            </Button>
        </>
    );
}

export default Game;
