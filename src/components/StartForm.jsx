import { useNavigate } from "react-router-dom";
import Trail from "./Trail";

const StartForm = ({playerNumber, setPlayerNumber, playerList, setPlayerList, setTurnsLeft, setGameOver}) => {
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
        setTurnsLeft(playerNumber * 13)
        setGameOver(false);
        return navigate('../play');
    }

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
        this.countedBonus = false;
        this.upperScore = 0;
        this.lowerSection = {
            threeOfAKind: 0,
            fourOfAKind: 0,
            fullHouse: 0,
            smStraight: 0,
            lgStraight: 0,
            yahtzee: 0,
            chance: 0,
            yahtzeeBonus: 0,
        }
        this.lowerScore = 0;
        this.grandTotal = 0;
        this.getLowerScore = () => {
            return this.lowerScore = (
                this.lowerSection.threeOfAKind +
                this.lowerSection.fourOfAKind +
                this.lowerSection.fullHouse +
                this.lowerSection.smStraight +
                this.lowerSection.lgStraight +
                this.lowerSection.yahtzee +
                this.lowerSection.chance +
                (this.lowerSection.yahtzeeBonus * 100)
            )
        };
        this.getUpperScore = () => {
            if (this.countedBonus) {
                return this.upperScore = (
                    this.upperSection.ones + 
                    this.upperSection.twos +
                    this.upperSection.threes +
                    this.upperSection.fours +
                    this.upperSection.fives +
                    this.upperSection.sixes +
                    35
                    )
            }
            return this.upperScore = (
                this.upperSection.ones + 
                this.upperSection.twos +
                this.upperSection.threes +
                this.upperSection.fours +
                this.upperSection.fives +
                this.upperSection.sixes
                )
        };
        this.getGrandTotal = () => {
            return this.grandTotal = (
                this.upperScore + this.lowerScore
            )
        };
        this.addBonus = () => {
            this.upperScore += 35;
            this.getGrandTotal();
        };
        this.checkForBonus = () => {
            if (!(this.countedBonus)){
                if (this.upperScore >= 63) {
                    this.countedBonus = true;
                    console.log('adding bonus')
                    return this.addBonus();
                }
            return
            }
            return
        }
    }

    return ( 
        <section className=" w-full h-full flex justify-center items-center md:pt-16">
                <div className="w-full">
            <Trail>
                    <h1 className="font-bold text-5xl mb-5 text-teal-500 dark:text-teal-300">New Game</h1>
                    <form className="flex flex-col w-full items-center justify-center text-blue-900 dark:text-teal-300 text-lg" onSubmit={handleSubmit}>
                        <Trail>

                        </Trail>
                        <label htmlFor="player-number" className="text-xl mb-2 text-blue-700 dark:text-blue-100 font-bold">Number of Players</label>
                        <input 
                            type="tel"
                            id="player-number" 
                            placeholder="Number of Players" 
                            className="p-3 rounded-md mb-8 dark:bg-teal-900 border-teal-500 border-2  outline-orange-300 placeholder:text-teal-300"
                            onChange={(e) => {
                                if (e.target.value.match(/^[0-9]*$/)) {
                                    e.target.classList.remove('text-red-500')
                                    return setPlayerNumber(Number(e.target.value))
                                } 
                                setPlayerNumber(0);
                                setPlayerList([])
                                e.target.classList.add('text-red-500')
                            }} />
                        <Trail>
                        { playerNumber > 0  && 
                            <p className="text-xl mb-2 text-blue-700 dark:text-blue-100 font-bold">
                                Player Names
                            </p>
                        }
                        {
                            playerInputs.map((el, index) => {
                                return(
                                        <input required key={el} type="text" placeholder={`${el}`} className="p-3 rounded-md mb-3 dark:bg-teal-900 border-teal-500 border-2 outline-orange-300 placeholder:text-teal-300" onChange={(e) => {
                                            if (e.target.value) {
                                                playerNames[index] = new Player(e.target.value)
                                                return setPlayerList(playerNames);
                                            }
                                            playerNames[index] = undefined
                                            setPlayerList(playerNames)
                                        }}/>
                                        )
                                    })
                                }
                         </Trail>
                         {(playerList.length === playerNumber) && playerList.length !== 0 && !isNaN(playerNumber) && !playerList.includes(undefined) &&
                            <Trail>
                                <button className="p-5 rounded-md w-full md:w-3/4 text-xl bg-teal-300 text-teal-900 font-bold my-5 dark:bg-teal-500 dark:text-teal-100">
                                Start Game
                                </button>
                            </Trail>
                         }
                    </form>
            </Trail>
                </div>
        </section>
     );
}
 
export default StartForm;