
const Game = ({playerList, isGameOver, setGameOver, setWinner}) => {
    return (
        <section id="game" className="flex flex-col items-center max-h-screen">
            <h1 className="font-bold text-5xl mb-5">Yahtzee!</h1>
            <table className="table-fixed text-center self-start w-full overflow-scroll border border-collapse">
                <thead className="border">
                    <tr className="border">
                        <th className="p-2 border">Upper Section</th>
                        {playerList.map((name, index) => {
                            return <th className="p-2 border" key={`${name}${index}`}>{name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border">ones</td>
                        {playerList.map((name, index) => {
                            return <td className="p-2 border" key={`${name}Ones`}><input type="number" max={6} className="text-center w-full h-full" /></td>
                        })}
                    </tr>
                    <tr>
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
                    </tr>
                </tbody>
            </table>
        </section>
     );
}
 
export default Game;

