import { useState } from "react";
import { Link } from "react-router-dom";

const Game = ({playerList, isGameOver, setGameOver, setWinner}) => {
    return (
        <section id="game" className="flex flex-col items-center max-h-screen">
            <h1 className="font-bold text-5xl mb-5">Yahtzee!</h1>
            <Link to="../new"><button>back</button></Link>
            <table className="table-fixed text-center self-start w-full overflow-scroll border border-collapse">
                <thead className="border">
                    <tr className="border">
                        <th className="p-2 border">Upper Section</th>
                        {playerList.map((player, index) => {
                            return <th className="p-2 border" key={player.name}>{player.name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border">ones</td>
                        {playerList.map((player, index) => {
                            const [onesVal, setOnesVal] = useState(player.upperSection.ones)
                            return (
                                <td className="border" key={player.name + "Ones"}>
                                    <input type="number"
                                        max={6}
                                        min={0}
                                        className="text-center w-full h-full p-2"
                                        value={onesVal}
                                        onBlur={(e) => e.target.setAttribute("disabled", "")}
                                        onChange={(e) => {
                                            player.upperSection.ones = Number(e.target.value);
                                            player.getUpperScore();
                                            player.checkForBonus();
                                            setOnesVal(player.upperSection.ones);
                                        }} />
                                </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">twos</td>
                        {playerList.map((player, index) => {
                            const [twosVal, setTwosVal] = useState(player.upperSection.twos)
                            return <td className="border" key={player.name + "Twos"}><input type="number" max={12} min={0} step={2} className="text-center w-full h-full p-2" value={twosVal} onChange={(e) => {
                                player.upperSection.twos = Number(e.target.value);
                                player.getUpperScore();
                                player.checkForBonus();
                                setTwosVal(player.upperSection.twos);
                            }} /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">threes</td>
                        {playerList.map((player, index) => {
                            const [threesVal, setThreesVal] = useState(player.upperSection.threes)
                            return <td className="border" key={player.name + "Threes"}><input type="number" max={18} min={0} step={3} className="text-center w-full h-full p-2" value={threesVal} onChange={(e) => {
                                player.upperSection.threes = Number(e.target.value);
                                player.getUpperScore();
                                player.checkForBonus();
                                setThreesVal(player.upperSection.threes);
                            }} /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">fours</td>
                        {playerList.map((player, index) => {
                            const [foursVal, setFoursVal] = useState(player.upperSection.fours)
                            return <td className="border" key={player.name + "Fours"}><input type="number" max={24} min={0} step={4} className="text-center w-full h-full p-2" value={foursVal} onChange={(e) => {
                                player.upperSection.fours = Number(e.target.value);
                                player.getUpperScore();
                                player.checkForBonus();
                                setFoursVal(player.upperSection.fours);
                            }} /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">fives</td>
                        {playerList.map((player, index) => {
                            const [fivesVal, setFivesVal] = useState(player.upperSection.fives)
                            return <td className="border" key={player.name + "Fives"}><input type="number" max={30} min={0} step={5} className="text-center w-full h-full p-2" value={fivesVal} onChange={(e) => {
                                player.upperSection.fives = Number(e.target.value);
                                player.getUpperScore();
                                player.checkForBonus();
                                setFivesVal(player.upperSection.fives);
                            }} /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">sixes</td>
                        {playerList.map((player, index) => {
                            const [sixesVal, setSixesVal] = useState(player.upperSection.sixes)
                            return <td className="border" key={player.name + "Sixes"}><input type="number" max={36} min={0} step={6} className="text-center w-full h-full p-2" value={sixesVal} onChange={(e) => {
                                player.upperSection.sixes = Number(e.target.value);
                                player.getUpperScore();
                                player.checkForBonus();
                                setSixesVal(player.upperSection.sixes);
                            }} /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">upper</td>
                        {playerList.map((player, index) => {
                            return <td className="border" key={player.name + "Ones"}><input disabled type="number" max={6} className="text-center w-full h-full p-2" value={player.upperScore} /></td>
                        })}
                    </tr>
                    {/* <tr>
                        <td className="p-2 border">twos</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Twos`}><input type="number" max={12} className="text-center w-full h-full" /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">threes</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Threes`}><input type="number" max={18} className="text-center w-full h-full" /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">fours</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Fours`}><input type="number" max={24} className="text-center w-full h-full" /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">fives</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Fives`}><input type="number" max={30} className="text-center w-full h-full" /></td>
                        })}
                    </tr>
                    <tr>
                        <td className="p-2 border">sixes</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Sixes`}><input type="number" max={36} className="text-center w-full h-full" /></td>
                        })}
                    </tr> */}
                </tbody>
            </table>
        </section>
     );
}
 
export default Game;

