import { useState } from "react";
import { Link } from "react-router-dom";

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

    const [fullHouseClick, setFullHouseClick] = useState(false)
    const [smStraightClick, setSmStraightClick] = useState(false)
    const [lgStraightClick, setLgStraightClick] = useState(false)

    return (
        <section id="game" className="flex flex-col items-center md:pt-16 pt-5">
            <h1 className="font-bold text-xl">Yahtzee!</h1>
            {isGameOver && 
            <div>
                <h2 className="font-bold text-5xl mb-5">{winner.name} is the winner!</h2>
                <Link to="../new">
                    <button className="p-3 rounded-md dark:text-black  bg-gray-300 my-5" onClick={() => {
                    setGameOver(false);
                    setPlayerList([]);
                    setPlayerNumber(0);
                    setTurnCount(0);
                    }}>new game</button>
                </Link>
            </div>
            }
            <h2 className="text-xl mb-1">Upper Section</h2>
            <div className="overflow-auto h-fit w-full mb-5">
                <table className="table-auto text-center self-start min-w-full border border-collapse">
                    <thead className="border">
                        <tr className="border">
                            <th className="p-2 border"></th>
                            {playerList.map((player, index) => {
                                return <th className={`p-2 border ${turnCount % playerNumber === index ? "bg-green-500" : ""}`} key={player.name}>{player.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">ones</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Ones"}>
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
                                                    updateWinner();
                                                 }
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 6) {
                                                return e.target.classList.add("text-red-500");
                                                }
                                                e.target.classList.remove('text-red-500');
                                            }}
                                            disabled={turnCount % playerNumber !== index || isGameOver}/>
                                    </td>
                                )
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">twos</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Twos"}>
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
                                                    updateWinner();
                                                }
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 12 || Number(e.target.value) % 2 !== 0) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">threes</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Threes"}>
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
                                                    updateWinner();
                                                }                                            
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 18 || Number(e.target.value) % 3 !== 0) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">fours</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Fours"}>
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
                                                    updateWinner();
                                                }   
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 24 || Number(e.target.value) % 4 !== 0) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">fives</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Fives"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 30 || Number(e.target.value) % 5 !== 0) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">sixes</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Sixes"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36 || Number(e.target.value) % 6 !== 0) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">upper</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "UpperScore"}><input disabled className="text-center w-full h-full p-2" value={player.upperScore} /></td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className="text-xl my-1">Lower Section</h2>
            <div className="overflow-auto h-fit w-full">
                <table className="table-auto text-center self-start min-w-full border border-collapse">
                    <thead className="border">
                        <tr className="border">
                            <th className="p-2 border"></th>
                            {playerList.map((player, index) => {
                                return <th className={`p-2 border ${turnCount % playerNumber === index ? "bg-green-500" : ""}`} key={player.name}>{player.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">3/kind</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "ThreeOfAKind"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">4/kind</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "FourOfAKind"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black" onClick={() => setFullHouseClick(!fullHouseClick)}>{fullHouseClick ? "25" : "full house"}</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "FullHouse"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                               if (Number(e.target.value) === 25 || Number(e.target.value) === 0) {
                                                    return e.target.classList.remove('text-red-500');
                                                }
                                                return e.target.classList.add("text-red-500");
                                            }}
                                            disabled={turnCount % playerNumber !== index || isGameOver} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black" onClick={() => setSmStraightClick(!smStraightClick)}>{smStraightClick ? "30" : "sm straight"}</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "SmStraight"}>
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
                                                    updateWinner();
                                                } 
                                            }}
                                            onChange={(e) => {
                                                if (Number(e.target.value) === 30 || Number(e.target.value) === 0) {
                                                    return e.target.classList.remove('text-red-500');
                                                }
                                                return e.target.classList.add("text-red-500");
                                            }}
                                            disabled={turnCount % playerNumber !== index || isGameOver} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black" onClick={() => setLgStraightClick(!lgStraightClick)}>{lgStraightClick ? "40" : "lg straight"}</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "LgStraight"}>
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
                                                    updateWinner();
                                                } 
                                            }}
                                            onChange={(e) => {
                                                if (Number(e.target.value) === 40 || Number(e.target.value) === 0) {
                                                    return e.target.classList.remove('text-red-500');
                                                }
                                                return e.target.classList.add("text-red-500");
                                            }}
                                            disabled={turnCount % playerNumber !== index || isGameOver} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">yahtzee</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Yahtzee"}>
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
                                                    updateWinner();
                                                } 
                                            }}
                                            onChange={(e) => {
                                                if (Number(e.target.value) === 50 || Number(e.target.value) === 0) {
                                                    return e.target.classList.remove('text-red-500');
                                                }
                                                return e.target.classList.add("text-red-500");
                                            }}
                                            disabled={turnCount % playerNumber !== index || isGameOver} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">chance</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Chance"}>
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
                                                    updateWinner();
                                                }  
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value.match(/^[0-9]*$/) || Number(e.target.value) < 0 || Number(e.target.value) > 36) {
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">yahtzee bonus</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "YahtzeeBonus"}>
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
                            <td className="p-2 border sticky left-0 bg-white dark:bg-black">lower</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "LowerScore"}><input disabled className="text-center w-full h-full p-2" value={player.lowerScore} /></td>
                            })}
                        </tr>
                        <tr className="relative">
                            <td className="p-2 border font-bold sticky left-0 bg-white dark:bg-black">total</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "Total"}><input disabled  className="text-center w-full h-full p-2" value={player.grandTotal} /></td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

            <Link to="../new">
                <button
                    className="p-3 rounded-md dark:text-black  bg-gray-300 my-5" onClick={() => {
                    setGameOver(false);
                    setPlayerList([]);
                    setPlayerNumber(0);
                    setTurnCount(0);
            } }>start over</button></Link>
        </section>
     );
}
 
export default Game;