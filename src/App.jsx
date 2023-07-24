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
  const [activePlayerIndex, setActivePlayerIndex] = useState();
  const [turnCount, setTurnCount] = useState(0);
  const [turnsLeft, setTurnsLeft] = useState(13);

  function Player(name) {
        this.name = name;
        this.upperSection = {
            ones: 0,
            twos: 0,
            threes: 0,
            fours: 0,
            fives: 0,
            sixes: 0,
        };
        this.countedBonus = false;
        this.upperScore = 0;
        this.lowerSection = {
            threeOfAKind: 0,
            fourOfAKind: 0,
            fullHouse: 0,
            smStraight: 0,
            lgStraight: 0,
            yahtzee: 0,
            chance: 0,
            yahtzeeBonus: 0,
        }
        this.lowerScore = 0;
        this.grandTotal = 0;
        this.getLowerScore = () => {
            return this.lowerScore = (
                this.lowerSection.threeOfAKind +
                this.lowerSection.fourOfAKind +
                this.lowerSection.fullHouse +
                this.lowerSection.smStraight +
                this.lowerSection.lgStraight +
                this.lowerSection.yahtzee +
                this.lowerSection.chance +
                (this.lowerSection.yahtzeeBonus * 100)
            )
        };
        this.getUpperScore = () => {
            if (this.countedBonus) {
                return this.upperScore = (
                    this.upperSection.ones + 
                    this.upperSection.twos +
                    this.upperSection.threes +
                    this.upperSection.fours +
                    this.upperSection.fives +
                    this.upperSection.sixes +
                    35
                    )
            }
            return this.upperScore = (
                this.upperSection.ones + 
                this.upperSection.twos +
                this.upperSection.threes +
                this.upperSection.fours +
                this.upperSection.fives +
                this.upperSection.sixes
                )
        };
        this.getGrandTotal = () => {
            return this.grandTotal = (
                this.upperScore + this.lowerScore
            )
        };
        this.addBonus = () => {
            this.upperScore += 35;
            this.getGrandTotal();
        };
        this.checkForBonus = () => {
            if (!(this.countedBonus)){
                if (this.upperScore >= 63) {
                    this.countedBonus = true;
                    console.log('adding bonus')
                    return this.addBonus();
                }
            return
            }
            return
        }
    }

  const router = createBrowserRouter([
    {
      path: '/new',
      element: <StartForm player={Player} playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} playerList={playerList} setPlayerList={setPlayerList} setTurnsLeft={setTurnsLeft} />,
    },
    {
      path: '/play',
      element: <Game playerList={playerList} setPlayerList={setPlayerList} isGameOver={isGameOver} setGameOver={setGameOver} winner={winner} setWinner={setWinner} turnCount={turnCount} setTurnCount={setTurnCount} playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} turnsLeft={turnsLeft} setTurnsLeft={setTurnsLeft} />
    },
    {
      path: '/win',
      element: <Win winner={winner} playerList={playerList} setPlayerList={setPlayerList} setGameOver={setGameOver} setWinner={setWinner} setTurnCount={setTurnCount} playerNumber={playerNumber} setPlayerNumber={setPlayerNumber} setTurnsLeft={setTurnsLeft} />
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
