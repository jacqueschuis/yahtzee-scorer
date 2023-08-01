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
      className="text-sm md:text-xl p-2 w-12 md:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
      onClick={handleToggleDescription}
    >
      {isDescriptionVisible ? description : label}
    </td>
  );
};

const hasOnlyDigits = (str) => !!(str && String(str).match(/^\d+$/));

const PlayerScoreCell = ({
  score,
  isPlayerTurn,
  isGameOver,
  onValidateScore,
  onSetScore,
  isEditableAfterSetting = false,
  activeClassName = "bg-teal-200 dark:bg-blue-500",
  inactiveClassName = "bg-teal-500 dark:bg-blue-700",
}) => {
  const [value, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    const num = val ? Number(val) : null;
    const isValid = hasOnlyDigits(val) && onValidateScore(num);

    setInputValue(val);
    setIsValid(isValid);
  };

  const handleBlur = (e) => {
    const val = e.target.value;
    const num = val ? Number(val) : null;
    const isValid = hasOnlyDigits(val) && onValidateScore(num);

    if (isValid) {
      const shouldDisableAfterSetting = !isEditableAfterSetting;

      onSetScore(num);
      setIsDisabled(shouldDisableAfterSetting);
    }
  };

  return (
    <td
      className={`border-0 border-none outline-none outline-0 ${
        !isDisabled && isPlayerTurn ? activeClassName : inactiveClassName
      } ${!isValid && "text-orange-500"}`}
    >
      <input
        type="tel"
        className="text-center outline-none w-full h-full p-2 bg-transparent"
        disabled={!isPlayerTurn || isGameOver || isDisabled}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
          {isGameOver && winner ? (
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
                <LabelColumnCell label="ones" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Ones"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.upperSectionScores.ones}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 5;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            ones: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="twos" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Twos"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.upperSectionScores.twos}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 10 && score % 2 === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            twos: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="threes" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Threes"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.upperSectionScores.threes}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 15 && score % 3 === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            threes: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="fours" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Fours"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.upperSectionScores.fours}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 20 && score % 4 === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            fours: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="fives" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Fives"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.upperSectionScores.fives}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 25 && score % 5 === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            fives: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="sixes" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Sixes"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.upperSectionScores.sixes}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 30 && score % 6 === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          upperSectionScores: {
                            ...player.upperSectionScores,
                            sixes: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
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
                      className={`dark:text-blue-900 text-teal-900 ${
                        isPlayerTurn(index)
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "UpperScore"}
                    >
                      {calculatePlayerUpperScore(player)}
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
                  return (
                    <PlayerScoreCell
                      key={player.name + "ThreeKind"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.lowerSectionScores.threeOfAKind}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 30;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            threeOfAKind: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="4/kind" description="total all" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "FourOfAKind"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.lowerSectionScores.fourOfAKind}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 30;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            fourOfAKind: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="full house" description="25" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "FullHouse"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.lowerSectionScores.fullHouse}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score === 25 || score === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            fullHouse: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="sm straight" description="30" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "SmStraight"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.lowerSectionScores.smStraight}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score === 30 || score === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            smStraight: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="lg straight" description="40" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "LgStraight"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.lowerSectionScores.lgStraight}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score === 40 || score === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            lgStraight: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="yahtzee" description="50" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Yahtzee"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.lowerSectionScores.yahtzee}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score === 50 || score === 0;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            yahtzee: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="chance" description="total all" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "Chance"}
                      activeClassName="bg-teal-200 dark:bg-blue-500"
                      score={player.lowerSectionScores.chance}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 36;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            chance: score,
                          },
                        });
                        nextTurn();
                      }}
                    />
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <LabelColumnCell label="yahtzee bonus" />
                {players.map((player, index) => {
                  return (
                    <PlayerScoreCell
                      key={player.name + "YB"}
                      activeClassName="bg-teal-300 dark:bg-blue-600"
                      score={player.lowerSectionScores.yahtzeeBonus}
                      isPlayerTurn={isPlayerTurn(index)}
                      isGameOver={isGameOver}
                      isEditableAfterSetting={true}
                      onValidateScore={(score) => {
                        return score >= 0 && score <= 5;
                      }}
                      onSetScore={(score) => {
                        handleUpdatePlayerScores(index, {
                          lowerSectionScores: {
                            ...player.lowerSectionScores,
                            yahtzeeBonus: score,
                          },
                        });
                      }}
                    />
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
                      className={`dark:text-blue-900 text-teal-900 ${
                        isPlayerTurn(index)
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "LowerScore"}
                    >
                      {calculatePlayerLowerScore(player)}
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
                      {calculatePlayerGrandTotal(player)}
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
