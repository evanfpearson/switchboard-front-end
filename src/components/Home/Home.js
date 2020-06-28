import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


function Home() {

    const openLobby = async () => {
        let response = await fetch(
            "http://localhost:5000/lobby",
            {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({"name": playerName}),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );
        let data = await response.json()
        setGroupCode(data.code)
    };

    const newGame = () => {
        openLobby().then(
            () => setRedirect(true)
        )
    }

    const joinLobby = () => {
        fetch(
            "http://localhost:5000/lobby/" + groupCode,
            {
                method: 'PUT',
                credentials: 'same-origin',
                body: JSON.stringify({"name": playerName}),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        ).then(
            () => setRedirect(true)
        )
    }


    const [playerName, setPlayerName] = useState("");
    const [groupCode, setGroupCode] = useState("");
    const [redirect, setRedirect] = useState(false)

    if (redirect) {
        return <Redirect to={"/lobby/" + groupCode}/>
    }

    return (
        <>
            <h2>Welcome</h2>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter your name"
                    onChange={(event) => setPlayerName(event.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="primary" onClick={newGame}>New Game</Button>
                </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter Lobby Code"
                    onChange={(event) => setGroupCode(event.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={joinLobby}>Join Game</Button>
                </InputGroup.Append>
            </InputGroup>


        </>
    );
}

export default Home;
