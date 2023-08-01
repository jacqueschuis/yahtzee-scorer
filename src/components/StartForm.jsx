import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { times } from "../utils";
import Trail from "./Trail";
import Dice from "./Dice";

const generateNewPlayer = (name = "") => {
  return {
    name,
    upperSectionScores: {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixes: 0,
    },
    lowerSectionScores: {
      threeOfAKind: 0,
      fourOfAKind: 0,
      fullHouse: 0,
      smStraight: 0,
      lgStraight: 0,
      yahtzee: 0,
      chance: 0,
      yahtzeeBonus: 0,
    },
    hasCountedBonus: false,
  };
};

const StartForm = ({ players, onUpdatePlayers, onStartGame }) => {
  const navigate = useNavigate();
  const [count, setPlayerCount] = useState();

  const isReadyToStart =
    players.length > 0 &&
    players.every((player) => player.name && player.name.trim().length > 0);

  const handleSetNumberOfPlayers = (e) => {
    const val = Number(e.target.value) || 0;

    if (val >= 0) {
      const MAX_PLAYERS = 20;
      const count = Math.min(val, MAX_PLAYERS);

      setPlayerCount(count);
      onUpdatePlayers(
        times(count, (index) => players[index] || generateNewPlayer()),
      );
    } else {
      setPlayerCount();
      onUpdatePlayers([]);
    }
  };

  const handleSetPlayerName = (value, index) => {
    onUpdatePlayers(
      players.map((player, i) => {
        if (i === index) {
          return { ...player, name: value };
        } else {
          return player;
        }
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isReadyToStart) {
      return navigate("/play");
    }
  };

  return (
    <section id="new-game" className="h-full">
      <div className="mb-10">
        <Trail>
          <h1 className="w-full tracking-wider leading-none font-bold md:text-8xl sm:text-7xl text-6xl text-teal-500 dark:text-blue-300">
            New Game
          </h1>
          <Dice className="pt-2 w-full flex lg:justify-center lg:gap-24 justify-evenly" />
        </Trail>
      </div>
      <form
        className="flex flex-col w-full items-center justify-center text-blue-900 dark:text-blue-100 text-lg"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="player-number"
          className="mb-3 text-3xl font-semibold tracking-wide text-orange-500 dark:text-orange-300"
        >
          Number of Players
        </label>
        <input
          type="tel"
          id="player-number"
          className="py-3 px-5 rounded-md mb-8 dark:bg-blue-700 bg-blue-100 dark:border-blue-300 border-teal-500 border-4 focus:outline-none tracking-wide"
          onChange={handleSetNumberOfPlayers}
        />
        <Trail>
          {players.length > 0 && (
            <p className="mb-3 text-3xl font-semibold tracking-wide text-orange-500 dark:text-orange-300">
              Player Names
            </p>
          )}
          {players.map((player, index) => {
            return (
              <input
                required
                key={index}
                type="text"
                placeholder="Enter name"
                className="py-3 px-5 rounded-md mb-8 dark:bg-blue-700 bg-blue-100 dark:border-blue-300 border-teal-500 border-4 focus:outline-none tracking-wide"
                value={player.name}
                onChange={(e) => handleSetPlayerName(e.target.value, index)}
              />
            );
          })}
        </Trail>
        {isReadyToStart && (
          <Trail>
            <button className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
              Start Game
            </button>
          </Trail>
        )}
      </form>
    </section>
  );
};

export default StartForm;
