import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  calculatePlayerGrandTotal,
  calculatePlayerUpperScore,
  calculatePlayerLowerScore,
} from "../utils";
import Trail from "./Trail";
import Dice from "./Dice";

const LabelColumnCell = ({ label, description }) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const handleToggleDescription = () => {
    if (!description) {
      return;
    }

    setDescriptionVisible((visible) => !visible);
  };

  return (
    <td
      className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
      onClick={handleToggleDescription}
    >
      {isDescriptionVisible ? description : label}
    </td>
  );
};

const Game = ({ players, onUpdatePlayers, onStartOver }) => {
  const navigate = useNavigate();

  const [turnCount, setTurnCount] = useState(0);
  const [turnsLeft, setTurnsLeft] = useState(players.length * 13);
  const [winner, setWinner] = useState(null);

  const playerNumber = players.length;
  const isGameOver = !!winner;

  useEffect(() => {
    if (!players.length) {
      return navigate("/");
    }
  }, []);

  const nextTurn = () => {
    if (turnsLeft === 1) {
      const winner = players.reduce((current, next) => {
        const x = calculatePlayerGrandTotal(current);
        const y = calculatePlayerGrandTotal(next);

        return x >= y ? current : next;
      });

      setWinner(winner);
    } else {
      setTurnCount((count) => count + 1);
      setTurnsLeft((remaining) => remaining - 1);
    }
  };

  const isPlayerTurn = useCallback(
    (index) => turnCount % playerNumber === index,
    [turnCount, playerNumber],
  );

  const handleUpdatePlayerScores = (index, updates = {}) => {
    onUpdatePlayers(
      players.map((player, i) => {
        if (i === index) {
          return { ...player, ...updates };
        } else {
          return player;
        }
      }),
    );
  };

  return (
    <section id="game" className="h-full w-full lg:px-24 px-5">
      <Trail>
        <div className="header mb-14 flex flex-col gap-4">
          {isGameOver ? (
            <div>
              <h2 className="w-full tracking-wider leading-none font-bold text-6xl text-teal-500 dark:text-blue-300">
                <span className="text-orange-500 dark:text-orange-300">
                  {winner.name}
                </span>{" "}
                is the winner!
              </h2>
              <Link to="/new">
                <button
                  className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700"
                  onClick={onStartOver}
                >
                  Start Over
                </button>
              </Link>
            </div>
          ) : (
            <h1 className="w-full tracking-wider leading-none font-bold text-6xl text-teal-500 dark:text-blue-300">
              Yahtzee!
            </h1>
          )}
          <Dice className="pt-2 mb-5 w-full flex lg:justify-center lg:gap-24 justify-evenly" />
        </div>
        <h2 className="mb-2 text-3xl font-semibold tracking-wider text-orange-500 dark:text-orange-300">
          Upper Section
        </h2>
        <div className="overflow-auto rounded-3xl h-fit w-full mb-5 shadow-2xl">
          <table className="table-auto w-full text-center md:text-xl self-start text-blue-900 dark:text-teal-300">
            <thead className="dark:text-blue-100 tracking-wider">
              <tr>
                <th className="dark:bg-blue-700 bg-teal-500"></th>
                {players.map((player, index) => {
                  return (
                    <th
                      className={`p-2 uppercase font-semibold ${
                        isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-60"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name}
                    >
                      {player.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="ones" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Ones"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 5
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                ones: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (!val.match(/^[0-9]*$/) || num < 0 || num > 5) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="twos" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Twos"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 10 &&
                            num % 2 === 0
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                twos: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            !val.match(/^[0-9]*$/) ||
                            num < 0 ||
                            num > 10 ||
                            num % 2 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="threes" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Threes"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 15 &&
                            num % 3 === 0
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                threes: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            !val.match(/^[0-9]*$/) ||
                            num < 0 ||
                            num > 15 ||
                            num % 3 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="fours" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Fours"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 20 &&
                            num % 4 === 0
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                fours: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            !val.match(/^[0-9]*$/) ||
                            num < 0 ||
                            num > 20 ||
                            num % 4 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="fives" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Fives"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 25 &&
                            num % 5 === 0
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                fives: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            !val.match(/^[0-9]*$/) ||
                            num < 0 ||
                            num > 25 ||
                            num % 5 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="sixes" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Sixes"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 30 &&
                            num % 6 === 0
                          ) {
                            handleUpdatePlayerScores(index, {
                              upperSectionScores: {
                                ...player.upperSectionScores,
                                sixes: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            !val.match(/^[0-9]*$/) ||
                            num < 0 ||
                            num > 30 ||
                            num % 6 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="relative dark:text-blue-100 text-teal-900 font-semibold tracking-wider">
                <td className="border-0 border-none outline-0 outline-none dark:text-teal-100 p-2 w-40 sm:w-48 sticky z-10 left-0 dark:bg-blue-600 bg-teal-400">
                  upper
                </td>
                {players.map((player, index) => {
                  return (
                    <td
                      className={`${
                        isPlayerTurn(index)
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "UpperScore"}
                    >
                      <input
                        disabled
                        className={`text-center w-full h-full p-2 dark:text-blue-900 text-teal-900 ${
                          isPlayerTurn(index)
                            ? "dark:bg-blue-500 bg-teal-200"
                            : "dark:bg-blue-600 bg-teal-400"
                        }`}
                        value={calculatePlayerUpperScore(player)}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="mb-3 text-3xl font-semibold tracking-wider text-orange-500 dark:text-orange-300">
          Lower Section
        </h2>
        <div className="overflow-auto rounded-3xl h-fit w-full mb-5 shadow-2xl">
          <table className="table-auto w-full text-center md:text-xl self-start text-blue-900 dark:text-teal-300">
            <thead className="dark:text-blue-100 tracking-wider">
              <tr>
                <th className="dark:bg-blue-700 bg-teal-500"></th>
                {players.map((player, index) => {
                  return (
                    <th
                      className={`p-2 uppercase font-semibold ${
                        isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name}
                    >
                      {player.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="3/kind" description="total all" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "ThreeKind"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 30
                          ) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                threeOfAKind: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (!val.match(/^[0-9]*$/) || num < 0 || num > 30) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="4/kind" description="total all" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "FourOfAKind"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 30
                          ) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                fourOfAKind: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (!val.match(/^[0-9]*$/) || num < 0 || num > 30) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="full house" description="25" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "FullHouse"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (val && (num === 25 || num === 0)) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                fullHouse: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (num === 25 || num === 0) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="sm straight" description="30" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "SmStraight"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (val && (num === 30 || num === 0)) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                smStraight: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (num === 30 || num === 0) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="lg straight" description="40" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "LgStraight"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (val && (num === 40 || num === 0)) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                lgStraight: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (num === 40 || num === 0) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="yahtzee" description="50" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Yahtzee"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (val && (num === 50 || num === 0)) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                yahtzee: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (num === 50 || num === 0) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="chance" description="total all" />
                {players.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && isPlayerTurn(index)
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Chance"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && isPlayerTurn(index)
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 36
                          ) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                chance: num,
                              },
                            });
                            nextTurn();
                            setIsDisabled(true);
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (!val.match(/^[0-9]*$/) || num < 0 || num > 36) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          !isPlayerTurn(index) || isGameOver || isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="yahtzee" />
                {players.map((player, index) => {
                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        isPlayerTurn(index)
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "YB"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          isPlayerTurn(index)
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (
                            val &&
                            val.match(/^[0-9]*$/) &&
                            num >= 0 &&
                            num <= 5
                          ) {
                            handleUpdatePlayerScores(index, {
                              lowerSectionScores: {
                                ...player.lowerSectionScores,
                                yahtzeeBonus: num,
                              },
                            });
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          const num = Number(val);

                          if (!val.match(/^[0-9]*$/) || num < 0 || num > 5) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={!isPlayerTurn(index) || isGameOver}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="relative dark:text-blue-100 text-teal-900 font-semibold tracking-wider">
                <td className="border-0 border-none outline-0 outline-none dark:text-teal-100 p-2 w-40 sm:w-48 sticky z-10 left-0 dark:bg-blue-600 bg-teal-400">
                  lower
                </td>
                {players.map((player, index) => {
                  return (
                    <td
                      className={`${
                        isPlayerTurn(index)
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "LowerScore"}
                    >
                      <input
                        disabled
                        className={`text-center w-full h-full p-2 dark:text-blue-900 text-teal-900 ${
                          isPlayerTurn(index)
                            ? "dark:bg-blue-500 bg-teal-200"
                            : "dark:bg-blue-600 bg-teal-400"
                        }`}
                        value={calculatePlayerLowerScore(player)}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="relative font-semibold tracking-wider bg-orange-300 text-orange-900 dark:bg-orange-700 dark:text-orange-100">
                <td className="p-2 w-40 sm:w-48 sticky z-10 left-0 uppercase bg-orange-300 dark:bg-orange-700">
                  total
                </td>
                {players.map((player, index) => {
                  return (
                    <td
                      className={`${
                        isPlayerTurn(index)
                          ? "dark:bg-orange-500 bg-orange-100"
                          : "dark:bg-orange-700 bg-orange-300"
                      }`}
                      key={player.name + "Total"}
                    >
                      <input
                        disabled
                        className={`text-center w-full p-2 ${
                          isPlayerTurn(index)
                            ? "dark:bg-orange-500 bg-orange-100"
                            : "dark:bg-orange-700 bg-orange-300"
                        }`}
                        value={calculatePlayerGrandTotal(player)}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <Link to="/new">
          <button
            className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700"
            onClick={onStartOver}
          >
            Start Over
          </button>
        </Link>
      </Trail>
    </section>
  );
};

export default Game;
