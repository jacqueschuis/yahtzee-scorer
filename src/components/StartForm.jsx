import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trail from "./Trail";
import Dice from "./Dice";

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

    class Player {
        constructor (name) {
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
        }
        getLowerScore() {
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
        }
        getUpperScore() {
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
        }
        getGrandTotal() {
            return this.grandTotal = (
                this.upperScore + this.lowerScore
            )
        }
        addBonus() {
            this.upperScore += 35;
            this.getGrandTotal();
        }
        checkForBonus() {
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

    const [dice, setDice] = useState([]);

    useEffect(() => {
        newDice()
    }, [])

    const newDice = () => {
        setDice([
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
        ])
    }

    return ( 
        <section id="new-game" className="h-full">
            <div className="mb-10">
                <Trail>
                    <h1 className="w-full tracking-wider leading-none font-bold md:text-8xl sm:text-7xl text-6xl text-teal-500 dark:text-blue-300">New Game</h1>
                    <div className="pt-2 w-full flex lg:justify-center lg:gap-24 justify-evenly">
                        {dice.map((di, index) => {
                        return <Dice key={`formDi${index}`} newDice={newDice} value={di} />
                        })}
                        
                    </div>
                </Trail>
            </div>
            <form className="flex flex-col w-full items-center justify-center text-blue-900 dark:text-blue-100 text-lg" onSubmit={handleSubmit}>
                        <label htmlFor="player-number" className="mb-3 text-3xl font-semibold tracking-widest text-orange-500 dark:text-orange-300">Number of Players</label>
                        <input 
                            type="tel"
                            id="player-number" 
                            className="py-3 px-5 rounded-md mb-8 dark:bg-blue-700 bg-blue-100 dark:border-blue-300 border-teal-500 border-4 focus:outline-none tracking-wide"
                            onChange={(e) => {
                                if (e.target.value.match(/^[0-9]*$/)) {
                                    return setPlayerNumber(Number(e.target.value))
                                } 
                                setPlayerNumber(0);
                                setPlayerList([])
                            }} />
                        <Trail>
                        { playerNumber > 0  && 
                            <p className="mb-3 text-3xl font-semibold tracking-widest text-orange-500 dark:text-orange-300">
                                Player Names
                            </p>
                        }
                        {
                            playerInputs.map((el, index) => {
                                return(
                                        <input 
                                            required 
                                            key={el} 
                                            type="text" 
                                            placeholder={`${el}`}
                                            className="py-3 px-5 rounded-md mb-8 dark:bg-blue-700 bg-blue-100 dark:border-blue-300 border-teal-500 border-4 focus:outline-none tracking-wide"
                                            onChange={(e) => {
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
                                <button className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
                                Start Game
                                </button>
                            </Trail>
                         }
            </form>
        </section>
     );
}
 
export default StartForm;

{/* 

 <Trail>
                <h1 className="w-full tracking-wider leading-none font-bold md:text-8xl sm:text-7xl text-6xl text-teal-500 dark:text-blue-300 mb-10">New Game</h1>
                <form className="flex flex-col w-full h-full items-center justify-center text-blue-900 dark:text-teal-300 text-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                        <div className="flex flex-col w-full">
                            <label htmlFor="player-number" className="font-semibold text-3xl mb-5 tracking-widest text-orange-900 dark:text-orange-300">Number of Players</label>
                            <input 
                                type="tel"
                                id="player-number" 
                                placeholder="Number of Players" 
                                className="p-3 rounded-md mb-8 dark:bg-teal-900 focus:outline-0 border-teal-500 border-2  outline-orange-300 placeholder:text-teal-300"
                                onChange={(e) => {
                                    if (e.target.value.match(/^[0-9]*$/)) {
                                        e.target.classList.remove('text-red-500')
                                        return setPlayerNumber(Number(e.target.value))
                                    } 
                                    setPlayerNumber(0);
                                    setPlayerList([])
                                    e.target.classList.add('text-red-500')
                                }} 
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Trail>
                                { playerNumber > 0  && 
                                    <p className="w-full font-semibold text-3xl mb-5 tracking-widest text-orange-900 dark:text-orange-300">
                                        Player Names
                                    </p>
                                }
                                {
                                    playerInputs.map((el, index) => {
                                        return(
                                                <input required key={el} type="text" placeholder={`${el}`} className="p-3 w-full md:w-auto rounded-md mb-3 dark:bg-teal-900 border-teal-500 border-2 outline-orange-300 placeholder:text-teal-300" onChange={(e) => {
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
                        </div>
                    </div>
                    {(playerList.length === playerNumber) && playerList.length !== 0 && !isNaN(playerNumber) && !playerList.includes(undefined) &&
                        <Trail>
                            <button className="select-none p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
                            Start Game
                            </button>
                        </Trail>
                    }
                </form>
            </Trail>








<section className=" w-full h-full flex flex-col justify-start items-start md:pt-16">
            <Trail>
                    <h1 className="w-full tracking-wider leading-none font-bold md:text-8xl sm:text-7xl text-6xl text-teal-500 dark:text-blue-300 mb-10">New Game</h1>
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
                                <button className="select-none p-5 hidden lg:inline-block rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
                                Start Game
                                </button>
                            </Trail>
                         }
                    </form>
            </Trail>
        </section> */}