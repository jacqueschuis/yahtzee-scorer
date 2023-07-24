import { Link, useNavigate } from "react-router-dom";

const Win = ({winner, playerList, setPlayerList, setGameOver, setWinner, setTurnCount, setPlayerNumber, setTurnsLeft, playerNumber}) => {    
    return ( 

        <section className="w-full h-full flex flex-col justify-center items-center pt-5 md:pt-16">
            <h1 className="font-bold text-6xl mb-5">{winner.name} is the winner!</h1>
            <div className="w-full flex items-center justify-center gap-10">
                <Link to="../new">
                    <button className="p-3 rounded-md bg-gray-300 my-5" onClick={() => {
                        setGameOver(false);
                        setWinner(null);
                        setPlayerNumber(0)
                        setPlayerList([]);
                        setTurnCount(0);
                        setTurnsLeft(13);
                    }}>
                        New Game
                    </button>
                </Link>
            </div>
        </section>
     );
}
 
export default Win;