import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Trail from "./Trail";
import Dice from "./Dice";

const Game = ({
  dice,
  newDice,
  playerList,
  setPlayerList,
  isGameOver,
  setGameOver,
  winner,
  setWinner,
  turnCount,
  setTurnCount,
  playerNumber,
  setPlayerNumber,
  turnsLeft,
  setTurnsLeft,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!playerList.length) {
      return navigate("../");
    }
    newDice();
  }, []);

  let playerNames = [...playerList];

  const updateWinner = () => {
    const newWinner = playerList.reduce(function (player, nextPlayer) {
      return player.grandTotal > nextPlayer.grandTotal ? player : nextPlayer;
    });
    setWinner(newWinner);
  };

  const nextTurn = () => {
    if (turnsLeft === 1) {
      return setGameOver(true);
    }
    setTurnCount((turnCount += 1));
    setTurnsLeft((turnsLeft -= 1));
  };

  const [threeKindClick, setThreeKindClick] = useState(false);
  const [fourKindClick, setFourKindClick] = useState(false);
  const [fullHouseClick, setFullHouseClick] = useState(false);
  const [smStraightClick, setSmStraightClick] = useState(false);
  const [lgStraightClick, setLgStraightClick] = useState(false);
  const [yahtzeeClick, setYahtzeeClick] = useState(false);
  const [chanceClick, setChanceClick] = useState(false);

  return (
    <section id="game" className="h-full w-full lg:px-24 px-5">
      <Trail>
        <div className="header mb-14 flex flex-col gap-4">
          {!isGameOver && (
            <h1 className="w-full tracking-wider leading-none font-bold text-6xl text-teal-500 dark:text-blue-300">
              Yahtzee!
            </h1>
          )}
          {isGameOver && (
            <div>
              <h2 className="w-full tracking-wider leading-none font-bold text-6xl text-teal-500 dark:text-blue-300">
                <span className="text-orange-500 dark:text-orange-300">
                  {winner.name}
                </span>{" "}
                is the winner!
              </h2>
              <Link to="../new">
                <button
                  className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700"
                  onClick={() => {
                    setGameOver(false);
                    setPlayerList([]);
                    setPlayerNumber(0);
                    setTurnCount(0);
                  }}
                >
                  Start Over
                </button>
              </Link>
            </div>
          )}
          <div className="pt-2 mb-5 w-full flex lg:justify-center lg:gap-24 justify-evenly">
            {dice.map((di, index) => {
              return (
                <Dice key={`formDi${index}`} onClick={newDice} value={di} />
              );
            })}
          </div>
        </div>
        <h2 className="mb-2 text-3xl font-semibold tracking-wider text-orange-500 dark:text-orange-300">
          Upper Section
        </h2>
        <div className="overflow-auto rounded-3xl h-fit w-full mb-5 shadow-2xl">
          <table className="table-auto w-full text-center md:text-xl self-start text-blue-900 dark:text-teal-300">
            <thead className="dark:text-blue-100 tracking-wider">
              <tr>
                <th className="dark:bg-blue-700 bg-teal-500"></th>
                {playerList.map((player, index) => {
                  return (
                    <th
                      className={`p-2 uppercase font-semibold ${
                        turnCount % playerNumber === index
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
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  ones
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Ones"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 5
                          ) {
                            player.upperSection.ones = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 5
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  twos
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Twos"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 10 &&
                            Number(e.target.value) % 2 === 0
                          ) {
                            player.upperSection.twos = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 10 ||
                            Number(e.target.value) % 2 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  threes
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Threes"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 15 &&
                            Number(e.target.value) % 3 === 0
                          ) {
                            player.upperSection.threes = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 15 ||
                            Number(e.target.value) % 3 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  fours
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Fours"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 20 &&
                            Number(e.target.value) % 4 === 0
                          ) {
                            player.upperSection.fours = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 20 ||
                            Number(e.target.value) % 4 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  fives
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Fives"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 25 &&
                            Number(e.target.value) % 5 === 0
                          ) {
                            player.upperSection.fives = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 25 ||
                            Number(e.target.value) % 5 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-teal-100 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  sixes
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Sixes"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 30 &&
                            Number(e.target.value) % 6 === 0
                          ) {
                            player.upperSection.sixes = Number(e.target.value);
                            player.getUpperScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 30 ||
                            Number(e.target.value) % 6 !== 0
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
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
                {playerList.map((player, index) => {
                  return (
                    <td
                      className={`${
                        turnCount % playerNumber === index
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "UpperScore"}
                    >
                      <input
                        disabled
                        className={`text-center w-full h-full p-2 dark:text-blue-900 text-teal-900 ${
                          turnCount % playerNumber === index
                            ? "dark:bg-blue-500 bg-teal-200"
                            : "dark:bg-blue-600 bg-teal-400"
                        }`}
                        value={player.upperScore}
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
                {playerList.map((player, index) => {
                  return (
                    <th
                      className={`p-2 uppercase font-semibold ${
                        turnCount % playerNumber === index
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
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setThreeKindClick(!threeKindClick)}
                >
                  {threeKindClick ? "total all" : "3/kind"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "ThreeKind"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 30
                          ) {
                            player.lowerSection.threeOfAKind = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 30
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setFourKindClick(!fourKindClick)}
                >
                  {fourKindClick ? "total all" : "4/kind"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "FourOfAKind"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 30
                          ) {
                            player.lowerSection.fourOfAKind = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 30
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setFullHouseClick(!fullHouseClick)}
                >
                  {fullHouseClick ? "25" : "full house"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "FullHouse"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            (Number(e.target.value) === 25 ||
                              Number(e.target.value) === 0)
                          ) {
                            player.lowerSection.fullHouse = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) === 25 ||
                            Number(e.target.value) === 0
                          ) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setSmStraightClick(!smStraightClick)}
                >
                  {smStraightClick ? "30" : "sm straight"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "SmStraight"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            (Number(e.target.value) === 30 ||
                              Number(e.target.value) === 0)
                          ) {
                            player.lowerSection.smStraight = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) === 30 ||
                            Number(e.target.value) === 0
                          ) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setLgStraightClick(!lgStraightClick)}
                >
                  {lgStraightClick ? "40" : "lg straight"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "LgStraight"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            (Number(e.target.value) === 40 ||
                              Number(e.target.value) === 0)
                          ) {
                            player.lowerSection.lgStraight = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) === 40 ||
                            Number(e.target.value) === 0
                          ) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setYahtzeeClick(!yahtzeeClick)}
                >
                  {yahtzeeClick ? "50" : "yahtzee"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Yahtzee"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            (Number(e.target.value) === 50 ||
                              Number(e.target.value) === 0)
                          ) {
                            player.lowerSection.yahtzee = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) === 50 ||
                            Number(e.target.value) === 0
                          ) {
                            return e.target.classList.remove("text-orange-500");
                          }
                          return e.target.classList.add("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td
                  className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100"
                  onClick={() => setChanceClick(!chanceClick)}
                >
                  {chanceClick ? "total all" : "chance"}
                </td>
                {playerList.map((player, index) => {
                  const [isDisabled, setIsDisabled] = useState(false);

                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        !isDisabled && turnCount % playerNumber === index
                          ? "bg-teal-200 dark:bg-blue-500"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "Chance"}
                    >
                      <input
                        type="number"
                        className={`text-center outline-none w-full h-full p-2 ${
                          !isDisabled && turnCount % playerNumber === index
                            ? "bg-teal-200 dark:bg-blue-500"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 36
                          ) {
                            player.lowerSection.chance = Number(e.target.value);
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            nextTurn();
                            setIsDisabled(true);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 36
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index ||
                          isGameOver ||
                          isDisabled
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="dark:text-blue-100 text-teal-900 divide-none font-semibold tracking-wider relative">
                <td className="text-sm md:text-xl p-2 w-40 sm:w-48 sticky z-10 left-0 bg-teal-500 dark:bg-blue-700 dark:text-teal-100">
                  yahtzee bonus
                </td>
                {playerList.map((player, index) => {
                  return (
                    <td
                      className={`border-0 border-none outline-none outline-0 ${
                        turnCount % playerNumber === index
                          ? "bg-teal-300 dark:bg-blue-600"
                          : " bg-teal-500 dark:bg-blue-700"
                      }`}
                      key={player.name + "YB"}
                    >
                      <input
                        type="number"
                        className={`text-center  outline-none w-full h-full p-2 ${
                          turnCount % playerNumber === index
                            ? "bg-teal-300 dark:bg-blue-600"
                            : " bg-teal-500 dark:bg-blue-700"
                        }`}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            e.target.value.match(/^[0-9]*$/) &&
                            Number(e.target.value) >= 0 &&
                            Number(e.target.value) <= 5
                          ) {
                            player.lowerSection.yahtzeeBonus = Number(
                              e.target.value,
                            );
                            player.getLowerScore();
                            player.getGrandTotal();
                            player.checkForBonus();
                            playerNames[index] = player;
                            setPlayerList(playerNames);
                            updateWinner();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !e.target.value.match(/^[0-9]*$/) ||
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 5
                          ) {
                            return e.target.classList.add("text-orange-500");
                          }
                          e.target.classList.remove("text-orange-500");
                        }}
                        disabled={
                          turnCount % playerNumber !== index || isGameOver
                        }
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="relative dark:text-blue-100 text-teal-900 font-semibold tracking-wider">
                <td className="border-0 border-none outline-0 outline-none dark:text-teal-100 p-2 w-40 sm:w-48 sticky z-10 left-0 dark:bg-blue-600 bg-teal-400">
                  lower
                </td>
                {playerList.map((player, index) => {
                  return (
                    <td
                      className={`${
                        turnCount % playerNumber === index
                          ? "dark:bg-blue-500 bg-teal-200"
                          : "dark:bg-blue-600 bg-teal-400"
                      }`}
                      key={player.name + "LowerScore"}
                    >
                      <input
                        disabled
                        className={`text-center w-full h-full p-2 dark:text-blue-900 text-teal-900 ${
                          turnCount % playerNumber === index
                            ? "dark:bg-blue-500 bg-teal-200"
                            : "dark:bg-blue-600 bg-teal-400"
                        }`}
                        value={player.lowerScore}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="relative font-semibold tracking-wider bg-orange-300 text-orange-900 dark:bg-orange-700 dark:text-orange-100">
                <td className="p-2 w-40 sm:w-48 sticky z-10 left-0 uppercase bg-orange-300 dark:bg-orange-700">
                  total
                </td>
                {playerList.map((player, index) => {
                  return (
                    <td
                      className={`${
                        turnCount % playerNumber === index
                          ? "dark:bg-orange-500 bg-orange-100"
                          : "dark:bg-orange-700 bg-orange-300"
                      }`}
                      key={player.name + "Total"}
                    >
                      <input
                        disabled
                        className={`text-center w-full p-2 ${
                          turnCount % playerNumber === index
                            ? "dark:bg-orange-500 bg-orange-100"
                            : "dark:bg-orange-700 bg-orange-300"
                        }`}
                        value={player.grandTotal}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <Link to="../new">
          <button
            className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700"
            onClick={() => {
              setGameOver(false);
              setPlayerList([]);
              setPlayerNumber(0);
              setTurnCount(0);
            }}
          >
            Start Over
          </button>
        </Link>
      </Trail>
    </section>
  );
};

export default Game;
