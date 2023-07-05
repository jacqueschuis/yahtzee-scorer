
const Game = ({playerList, isGameOver, setGameOver, setWinner}) => {
    return (
        <section className="flex flex-col items-center">
            <h1 className="font-bold text-5xl mb-5">Yahtzee!</h1>
            <table className="table-auto text-center justify-center">
                <thead>
                    <tr>
                        <th>Upper Section</th>
                        {playerList.map((name, index) => {
                            return <th key={`${name}${index}`}>{name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ones</td>
                        {playerList.map((name, index) => {
                            return <td><input key={`${name}Ones`} type="number" className="text-center" /></td>
                        })}
                    </tr>
                </tbody>
            </table>
        </section>
     );
}
 
export default Game;

