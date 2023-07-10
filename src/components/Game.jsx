import { useState } from "react";
import { Link } from "react-router-dom";

const Game = ({playerList, setPlayerList, isGameOver, setGameOver, setWinner, turnCount, setTurnCount, playerNumber}) => {
    let playerNames = [...playerList];

    let currentWinner

    // let currentWinner = playerList.reduce(function(player, nextPlayer) {
    //                             return player.grandTotal > nextPlayer.grandTotal ? player : nextPlayer
    //                     })
    //                     console.log(`winner: ${currentWinner.name}`)

    const nextTurn = () => {
        setTurnCount(turnCount += 1)
    }

    return (
        <section id="game" className="flex flex-col items-center">
            <h1 className="font-bold text-5xl mb-5">Yahtzee!</h1>
            <h2 className="font-bold text-3xl mb-5">Upper Section</h2>
            <h2 className="font-bold text3xl mb-5">turn: {turnCount + 1}</h2>
            <div className="overflow-auto h-fit w-full">
                <table className="table-auto text-center self-start border border-collapse">
                    <thead className="border">
                        <tr className="border">
                            <th className="p-2 border"></th>
                            {playerList.map((player, index) => {
                                return <th className={`p-2 border ${turnCount % playerNumber === index ? "bg-green-500" : ""}`} key={player.name}>{player.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border">ones</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Ones"}>
                                        <input
                                            type="number"
                                            max={6}
                                            min={0}
                                            className="text-center w-full h-full p-2"
                                            value={player.upperSection.ones}
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.ones = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames)
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">twos</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Twos"}>
                                        <input 
                                            type="number" 
                                            max={12} 
                                            min={0} 
                                            step={2} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.upperSection.twos} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0 || Number(e.target.value) === (2 || 4 || 6 )) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.twos = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">threes</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Threes"}>
                                        <input 
                                            type="number" 
                                            max={18} 
                                            min={0} 
                                            step={3} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.upperSection.threes} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.threes = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">fours</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Fours"}>
                                        <input 
                                            type="number" 
                                            max={24} 
                                            min={0} 
                                            step={4} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.upperSection.fours} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.fours = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">fives</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Fives"}>
                                        <input 
                                            type="number" 
                                            max={30} 
                                            min={0} 
                                            step={5} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.upperSection.fives} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.fives = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">sixes</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Sixes"}>
                                        <input 
                                            type="number" 
                                            max={36} 
                                            min={0} 
                                            step={6} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.upperSection.sixes} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    player.checkForBonus();
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.upperSection.sixes = Number(e.target.value);
                                                player.getUpperScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">upper</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "UpperScore"}><input disabled type="number" max={6} className="text-center w-full h-full p-2" value={player.upperScore} /></td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className="font-bold text-3xl my-5">Lower Section</h2>
            <div className="overflow-auto h-fit w-full">
                <table className="table-auto text-center self-start border border-collapse">
                    <thead className="border">
                        <tr className="border">
                            <th className="p-2 border"></th>
                            {playerList.map((player, index) => {
                                return <th className="p-2 border" key={player.name}>{player.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border">3/kind</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "ThreeOfAKind"}>
                                        <input 
                                            type="number" 
                                            max={36} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.threeOfAKind} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.threeOfAKind = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">4/kind</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "FourOfAKind"}>
                                        <input 
                                            type="number" 
                                            max={36} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.fourOfAKind} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.fourOfAKind = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">full house</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "FullHouse"}>
                                        <input 
                                            type="number" 
                                            max={25}
                                            step={25} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.fullHouse} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.fullHouse = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">sm straight</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "SmStraight"}>
                                        <input 
                                            type="number" 
                                            max={30}
                                            step={30} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.smStraight} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.smStraight = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">lg straight</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "LgStraight"}>
                                        <input 
                                            type="number" 
                                            max={40}
                                            step={40} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.lgStraight} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.lgStraight = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">yahtzee</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Yahtzee"}>
                                        <input 
                                            type="number" 
                                            max={50}
                                            step={50} 
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.yahtzee} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.yahtzee = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">chance</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "Chance"}>
                                        <input 
                                            type="number" 
                                            max={36}
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.chance} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.chance = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">yahtzee bonus</td>
                            {playerList.map((player, index) => {
                                return (
                                    <td className="border" key={player.name + "YahtzeeBonus"}>
                                        <input 
                                            type="number" 
                                            max={5}
                                            min={0} 
                                            className="text-center w-full h-full p-2" 
                                            value={player.lowerSection.yahtzeeBonus} 
                                            onBlur={(e) => {
                                                if (Number(e.target.value) > 0) {
                                                    e.target.setAttribute("disabled", "");
                                                    playerNames[index] = player;
                                                    setPlayerList(playerNames);
                                                    nextTurn();
                                                }
                                            }}
                                            onChange={(e) => {
                                                player.lowerSection.yahtzeeBonus = Number(e.target.value);
                                                player.getLowerScore();
                                                player.getGrandTotal();
                                                playerNames[index] = player;
                                                setPlayerList(playerNames);
                                            }} />
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border">lower</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "LowerScore"}><input disabled type="number" className="text-center w-full h-full p-2" value={player.lowerScore} /></td>
                            })}
                        </tr>
                        <tr>
                            <td className="p-2 border font-bold">total</td>
                            {playerList.map((player, index) => {
                                return <td className="border" key={player.name + "Total"}><input disabled type="number" className="text-center w-full h-full p-2" value={player.grandTotal} /></td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

            <Link to="../new">
                <button
                    className="p-3 rounded-md dark:text-black  bg-gray-300 my-5" onClick={() => {
                    setPlayerList([]);
                    setTurnCount(0);
            } }>back</button></Link>
        </section>
     );
}
 
export default Game;