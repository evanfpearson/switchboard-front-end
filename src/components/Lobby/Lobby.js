import React, {useState, useEffect} from 'react';
import {Link, useParams, Redirect} from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Lobby() {

    let { code } = useParams();

    const [players, setPlayers] = useState([]);
    const [playersLoading, setLoading] = useState(true)
    const [gameStarted, setStarted] = useState(false)
    const [playerQuit, setPlayerQuit] = useState(false)

    useEffect(
        () => {
            const interval = setInterval(
                () => fetch(
                    "http://localhost:5000/lobby/" + code,
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
                        setPlayers(response.players)
                        setLoading(false)
                    }
                )
            , 1000);
            return () => clearInterval(interval)
        }, [code]
    )

    const startGame = async () => {
        let x = await fetch(
            "http://localhost:5000/game/" + code ,
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );
        setStarted(true)
    }

    if (gameStarted) {
        return <Redirect to={"/game/" + code}/>
    }

    if (playerQuit) {
        return <Redirect to={"/"}/>
    }

    const getPlayerList = () => {
        if (playersLoading) {
            return <Spinner animation="border" />
        } else {
            return <ListGroup>
                {players.map(player => <ListGroup.Item>{player.name}</ListGroup.Item>)}
            </ListGroup>
        }
    }

    return (
        <>
            <h2>Lobby Code: <Badge variant="primary">{code}</Badge></h2>
            <h3>Players</h3>
            {getPlayerList()}
            <br/>

            <Button variant="primary" size="lg" onClick={() => startGame()} block>
                Start Game
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setPlayerQuit(true)} block>
                Leave
            </Button>
        </>
    );
}

export default Lobby;
