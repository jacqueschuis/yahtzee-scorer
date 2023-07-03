import { useState } from 'react'

import './App.css'

import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { useTransition, a } from '@react-spring/web';

import StartForm from './components/StartForm'
import Game from './components/Game'
import Win from './components/Win'
import Home from './components/Home';

function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [players, setPlayers] = useState([]);

  const [isPlay, setIsPlay] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/new',
      element: <StartForm />,
    },
    {
      path: '/play',
      element: <Game />
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
