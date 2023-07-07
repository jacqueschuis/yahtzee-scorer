import { useState } from 'react'

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import StartForm from './components/StartForm'
import Game from './components/Game'
import Win from './components/Win'
import Home from './components/Home';

function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerList, setPlayerList] = useState([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState()

  const [isPlay, setIsPlay] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/new',
      element: <StartForm playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} playerList={playerList} setPlayerList={setPlayerList} setIsPlay={setIsPlay} />,
    },
    {
      path: '/play',
      element: <Game playerList={playerList} setPlayerList={setPlayerList} isGameOver={isGameOver} setGameOver={setGameOver} setWinner={setWinner} />
    },
    {
      path: '/win',
      element: <Win />
    },
    {
      path: '*',
      element: <Home />
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
