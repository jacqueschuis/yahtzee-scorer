import { useNavigate } from "react-router-dom";

const StartForm = ({playerNumber, setPlayerNumber, playerList, setPlayerList, setIsPlay}) => {
    const navigate = useNavigate();

    let playerInputs = [];
    let playerNames = [...playerList];

    for (let i=0; i<playerNumber; i++){
        playerInputs.push(`Player ${i+1} Name`)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let adjustedPlayers = [...playerList];
        adjustedPlayers.splice(playerNumber, (playerList.length - playerNumber));
        setPlayerList(adjustedPlayers);
        return navigate('../play');
    }
    

    return ( 
        <section className="w-full h-full flex justify-center items-center">
            <div className="w-full md:w-3/4">
                <h1 className="font-bold text-5xl mb-5">New Game</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <label htmlFor="player-number" className="text-xl">Number of Players</label>
                    <input id="player-number" type="number" placeholder="Number of Players" className="p-3" value={playerNumber} onChange={(e) => setPlayerNumber(Number(e.target.value))} />
                    <label className="text-xl">Player Names</label>
                    {
                        playerInputs.map((el, index) => {
                            return(
                                <input key={el} type="text" placeholder={`${el}`} className="p-3" onKeyUp={(e) => {
                                    function Player(name) {
                                        this.name = name;
                                        this.upperSection = {
                                            ones: 0,
                                            twos: 0,
                                            threes: 0,
                                            fours: 0,
                                            fives: 0,
                                            sixes: 0,
                                        };
                                        this.getUpperScore = () => {
                                            return (
                                                this.upperSection.ones + 
                                                this.upperSection.twos +
                                                this.upperSection.threes +
                                                this.upperSection.fours +
                                                this.upperSection.fives +
                                                this.upperSection.sixes
                                                )
                                        };
                                        this.bonus = false;
                                        this.countedBonus = false;
                                        this.upperScore = 0
                                    }
                                    playerNames[index] = new Player(e.target.value)
                                    setPlayerList(playerNames);
                                    console.log(playerList)
                                }}/>
                            )
                        })
                    }
                        <button className="p-3 rounded-md bg-gray-300 my-5">
                            Start Game
                        </button>
                </form>
            </div>
        </section>
     );
}
 
export default StartForm;