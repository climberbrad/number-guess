import {Box, Button, TextField, Typography} from "@mui/material";
import {useReducer, useState} from "react";
import './App.css';

type GameState = 'Play' | 'Success' | 'Failure'
const TOTAL_GUESSES = 10;

const getGameState = (state: gameData): GameState => {

    if(state.currentGuess === state.myNumber) {
        return 'Success';
    }

    if(state.guesses.length-1 === TOTAL_GUESSES) {
        return 'Failure';
    }

    return 'Play'
}

function reducer(state: gameData, action: gameData): gameData {
    console.log('STATE', action)
    switch (action.action) {
        case 'guess':
            return {
                ...action,
                guesses: [...action.guesses, action.currentGuess],
                gameState: getGameState(action)
            }
        default:
            return state;
    }
}

interface gameData {
    action: string;
    myNumber: number;
    currentGuess: number;
    guesses: number[];
    gameState: GameState;
    totalGuesses: number;
}

const INITIAL_STATE: gameData = {
    action: '',
    myNumber: Math.floor(Math.random() * 10),
    currentGuess: 0,
    guesses: [],
    gameState: 'Play',
    totalGuesses: 0,
}

function App() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [currentGuess, setCurrentGuess] = useState<number>(0);

    const handleUpdateGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val) {
            setCurrentGuess(Number(val))
        }
    }

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography fontFamily='Helvatica' fontSize={42}>Guess My Number {state.myNumber}</Typography>
                <Typography fontFamily='Helvatica' fontSize={18}>
                    Choose a number from 1 - 100
                </Typography>
                <Typography marginY={4}>Number of guesses:{state.guesses.length}/10</Typography>
            </Box>

            {state.gameState === 'Play' ? (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                    <TextField onChange={handleUpdateGuess} id="guess" label="Guess"
                               variant="outlined">{currentGuess}</TextField>
                    <Button onClick={() => dispatch({...state, action: 'guess', currentGuess: currentGuess})}
                            sx={{border: 1}}>Test</Button>
                </Box>
            ) : (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
                    <Typography fontSize={24} color='red'>{state.gameState}</Typography>
                </Box>
            )}
        </Box>
    )
}
export default App
