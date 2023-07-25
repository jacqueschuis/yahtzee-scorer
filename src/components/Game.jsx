import { useState } from "react";
import { Link } from "react-router-dom";
import Trail from "./Trail";

const Game = ({playerList, setPlayerList, isGameOver, setGameOver, winner, setWinner, turnCount, setTurnCount, playerNumber, setPlayerNumber, turnsLeft, setTurnsLeft}) => {
    let playerNames = [...playerList];

  
    const updateWinner = () => {
        const newWinner = playerList.reduce(function(player, nextPlayer) {
                                return player.grandTotal > nextPlayer.grandTotal ? player : nextPlayer
                        })
        setWinner(newWinner);
    }

    const nextTurn = () => {
        if (turnsLeft === 1) {
            return setGameOver(true);
        }
        setTurnCount(turnCount += 1)
        setTurnsLeft(turnsLeft -= 1)
    }

    const [threeKindClick, setThreeKindClick] = useState(false);
    const [fourKindClick, setFourKindClick] = useState(false);
    const [fullHouseClick, setFullHouseClick] = useState(false)
    const [smStraightClick, setSmStraightClick] = useState(false)
    const [lgStraightClick, setLgStraightClick] = useState(false)
    const [yahtzeeClick, setYahtzeeClick] = useState(false);
    const [chanceClick, setChanceClick] = useState(false);

    return (
        <section id="game" className="flex flex-col items-center md:pt-16 pt-5 ">
            <Trail>
                <h1 className="font-bold text-xl text-teal-500 dark:text-teal-300">Yahtzee!</h1>
                {isGameOver && 
                <div>
                    <h2 className="font-bold text-5xl mt-5 mb-2 text-teal-500 dark:text-teal-300">{winner.name} is the winner!</h2>
                    <Link to="../new">
                        <button className="p-5 rounded-md w-full md:w-3/4 text-xl bg-teal-300 text-teal-900 font-bold mb-5 dark:bg-teal-700 dark:text-teal-100" onClick={() => {
                        setGameOver(false);
                        setPlayerList([]);
                        setPlayerNumber(0);
                        setTurnCount(0);
                        }}>New Game</button>
                    </Link>
                </div>
                }


                <h2 className="text-xl mb-2 text-blue-700 dark:text-blue-100 font-bold">Upper Section</h2>
                <div className="overflow-auto h-fit w-full mb-5">
                    <table className="table-auto text-center self-start min-w-full border-2 border-teal-500 border-collapse text-blue-900 dark:text-teal-300">
                        <thead className="border-teal-500 border-2">
                            <tr className="border-teal-500 border-2">
                                <th className="p-2 border-teal-500 border-2"></th>
                                {playerList.map((player, index) => {
                                    return <th className={`p-2 border-teal-500 border-2 dark:text-blue-100 ${turnCount % playerNumber === index ? "bg-teal-300 dark:bg-teal-500" : ""}`} key={player.name}>{player.name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">ones</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Ones"}>
                                            <input
                                                type="tel"
                                                className="text-center w-full h-full p-2"
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 6) {
                                                        player.upperSection.ones = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 6) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled}/>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">twos</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Twos"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 12 && Number(e.target.value) % 2 === 0) {
                                                        player.upperSection.twos = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 12 || Number(e.target.value) % 2 !== 0) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                    </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">threes</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Threes"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 18 && Number(e.target.value) % 3 === 0) {
                                                        player.upperSection.threes = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }                                            
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 18 || Number(e.target.value) % 3 !== 0) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">fours</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Fours"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {

                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 24 && Number(e.target.value) % 4 === 0) {
                                                        player.upperSection.fours = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }   
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 24 || Number(e.target.value) % 4 !== 0) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">fives</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Fives"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 30 && Number(e.target.value) % 5 === 0) {
                                                        player.upperSection.fives = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 30 || Number(e.target.value) % 5 !== 0) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">sixes</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Sixes"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 36 && Number(e.target.value) % 6 === 0) {
                                                        player.upperSection.sixes = Number(e.target.value);
                                                        player.getUpperScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36 || Number(e.target.value) % 6 !== 0) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">upper</td>
                                {playerList.map((player, index) => {
                                    return <td className="border-teal-500 border-2" key={player.name + "UpperScore"}><input disabled className="text-center w-full h-full p-2 font-bold" value={player.upperScore} /></td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2 className="text-xl mb-2 text-blue-700 dark:text-blue-100 font-bold">Lower Section</h2>
                <div className="overflow-auto h-fit w-full">
                    <table className="table-auto text-center self-start min-w-full border-2 border-teal-500 border-collapse text-blue-900 dark:text-teal-300">
                        <thead className="border-teal-500 border-2">
                            <tr className="border-teal-500 border-2">
                                <th className="p-2 border-teal-500 border-2"></th>
                                {playerList.map((player, index) => {
                                    return <th className={`p-2 border-teal-500 border-2 dark:text-blue-100 ${turnCount % playerNumber === index ? "bg-teal-300 dark:bg-teal-500" : ""}`} key={player.name}>{player.name}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setThreeKindClick(!threeKindClick)}>{threeKindClick ? "total all" : "3/kind"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "ThreeOfAKind"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 36) {
                                                        player.lowerSection.threeOfAKind = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setFourKindClick(!fourKindClick)}>{fourKindClick ? "total all" : '4/kind'}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "FourOfAKind"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 36) {
                                                        player.lowerSection.fourOfAKind = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setFullHouseClick(!fullHouseClick)}>{fullHouseClick ? "25" : "full house"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "FullHouse"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && (Number(e.target.value) === 25 || Number(e.target.value) === 0)) {
                                                        player.lowerSection.fullHouse = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                if (Number(e.target.value) === 25 || Number(e.target.value) === 0) {
                                                        return e.target.classList.remove('text-red-500');
                                                    }
                                                    return e.target.classList.add("text-red-500");
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setSmStraightClick(!smStraightClick)}>{smStraightClick ? "30" : "sm straight"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "SmStraight"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && (Number(e.target.value) === 30 || Number(e.target.value) === 0)) {
                                                        player.lowerSection.smStraight = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    } 
                                                }}
                                                onChange={(e) => {
                                                    if (Number(e.target.value) === 30 || Number(e.target.value) === 0) {
                                                        return e.target.classList.remove('text-red-500');
                                                    }
                                                    return e.target.classList.add("text-red-500");
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setLgStraightClick(!lgStraightClick)}>{lgStraightClick ? "40" : "lg straight"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "LgStraight"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && (Number(e.target.value) === 40 || Number(e.target.value) === 0)) {
                                                        player.lowerSection.lgStraight = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    } 
                                                }}
                                                onChange={(e) => {
                                                    if (Number(e.target.value) === 40 || Number(e.target.value) === 0) {
                                                        return e.target.classList.remove('text-red-500');
                                                    }
                                                    return e.target.classList.add("text-red-500");
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setYahtzeeClick(!yahtzeeClick)}>{yahtzeeClick ? "50" : "yahtzee"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Yahtzee"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && (Number(e.target.value) === 50 || Number(e.target.value) === 0)) {
                                                        player.lowerSection.yahtzee = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    } 
                                                }}
                                                onChange={(e) => {
                                                    if (Number(e.target.value) === 50 || Number(e.target.value) === 0) {
                                                        return e.target.classList.remove('text-red-500');
                                                    }
                                                    return e.target.classList.add("text-red-500");
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold" onClick={() => setChanceClick(!chanceClick)}>{chanceClick ? "total all" : "chance"}</td>
                                {playerList.map((player, index) => {
                                    const [isDisabled, setIsDisabled] = useState(false);

                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "Chance"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 36) {
                                                        player.lowerSection.chance = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        setIsDisabled(true);
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver || isDisabled } />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">yahtzee bonus</td>
                                {playerList.map((player, index) => {
                                    return (
                                        <td className="border-teal-500 border-2" key={player.name + "YahtzeeBonus"}>
                                            <input
                                                type="tel" 
                                                className="text-center w-full h-full p-2" 
                                                onBlur={(e) => {
                                                    if (e.target.value && e.target.value.match(/^[0-9]*$/) && Number(e.target.value) >= 0 && Number(e.target.value) <= 5) {
                                                        player.lowerSection.yahtzeeBonus = Number(e.target.value);
                                                        player.getLowerScore();
                                                        player.getGrandTotal();
                                                        player.checkForBonus();
                                                        playerNames[index] = player;
                                                        setPlayerList(playerNames)
                                                        nextTurn();
                                                        updateWinner();
                                                    }  
                                                }}
                                                onChange={(e) => {
                                                    if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 5) {
                                                    return e.target.classList.add("text-red-500");
                                                    }
                                                    e.target.classList.remove('text-red-500');
                                                }}
                                                disabled={turnCount % playerNumber !== index || isGameOver} />
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">lower</td>
                                {playerList.map((player, index) => {
                                    return <td className="border-teal-500 border-2" key={player.name + "LowerScore"}><input disabled className="text-center w-full h-full p-2 font-bold" value={player.lowerScore} /></td>
                                })}
                            </tr>
                            <tr className="relative">
                                <td className="p-2 border-teal-500 border-2 sticky left-0 bg-white dark:bg-black font-bold">total</td>
                                {playerList.map((player, index) => {
                                    return <td className="border-teal-500 border-2" key={player.name + "Total"}><input disabled  className="text-center w-full h-full p-2 font-bold" value={player.grandTotal} /></td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Link to="../new">
                    <button
                        className="p-5 rounded-md w-full md:w-3/4 text-xl bg-teal-300 text-teal-900 font-bold my-5 dark:bg-teal-700 dark:text-teal-100" onClick={() => {
                        setGameOver(false);
                        setPlayerList([]);
                        setPlayerNumber(0);
                        setTurnCount(0);
                } }>Start Over</button></Link>
            </Trail>
        </section>
     );
}
 
export default Game;