import { useState } from 'react'

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import StartForm from './components/StartForm'
import Game from './components/Game'
import Home from './components/Home';

function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerList, setPlayerList] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [turnsLeft, setTurnsLeft] = useState(13);

  const router = createBrowserRouter([
    {
      path: '/new',
      element: <StartForm playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} playerList={playerList} setPlayerList={setPlayerList} setTurnsLeft={setTurnsLeft} setGameOver={setGameOver} />,
    },
    {
      path: '/play',
      element: <Game playerList={playerList} setPlayerList={setPlayerList} isGameOver={isGameOver} setGameOver={setGameOver} winner={winner} setWinner={setWinner} turnCount={turnCount} setTurnCount={setTurnCount} playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} turnsLeft={turnsLeft} setTurnsLeft={setTurnsLeft} />
    },
    {
      path: '*',
      element: <Home />
    }
  ]);


  return (
    <>
      <main className="w-full min-h-screen h-full py-10 md:flex-col bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-sans flex justify-center leading-none font-normal">
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
