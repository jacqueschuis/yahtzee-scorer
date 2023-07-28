import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Trail from "./Trail";
import Dice from "./Dice";

const Home = () => {
    const [homeDice, setHomeDice] = useState([]);

    useEffect(() => {
        newDice()
    }, [])

    const newDice = () => {
        setHomeDice([
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
            Math.floor(Math.random()*6 + 1),
        ])
    }

    return ( 
        <section id="home" className="w-full h-full flex flex-col gap-10 items-center justify-center">
            <div className="lg:columns-2 lg:gap-10 lg:flex lg:justify-center lg:items-center w-full" id="column-container">
                <div className="md:px-5 flex flex-col gap-5 break-inside-avoid text-center lg:text-end mb-10" id="col-1">
                    <Trail>
                        <div>
                            <h1 className="w-full tracking-wider leading-none font-bold lg:text-9xl md:text-8xl sm:text-7xl text-6xl text-teal-500 dark:text-blue-300">Yahtzee</h1>
                            <h2 className="w-full font-semibold lg:text-7xl md:text-6xl sm:text-5xl text-4xl tracking-[.2em] md:tracking-[.5em] text-teal-900 dark:text-blue-100">scorer</h2>
                        </div>
                        <div className="pt-5 w-full flex lg:justify-end lg:gap-24 justify-evenly">
                          {homeDice.map((di, index) => {
                            return <Dice newDice={newDice} value={di} />
                          })}
                          
                        </div>
                        <Link to="../new">
                            <button className="p-5 hidden lg:inline-block rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
                                    New Game
                            </button>
                    </Link>
                    </Trail>
                </div>
                <div id="col-2" className="p-5 rounded-3xl text-start break-inside-avoid flex flex-col gap-3">
                    <Trail>
                        <p className="lg:w-96">Yahtzee Scorer is a dynamic Yahtzee score card. It is designed for any occasion in which you have the players and the dice, but no score card.</p>
                        <p className="mt-5">Yahtzee Scorer:</p>
                        <ul className="lg:w-96 list-disc list-inside flex flex-col gap-1">
                            <li className="ml-3">Generates a score card based on player names and standard rules</li>
                            <li className="ml-3">Keeps track of turns</li>
                            <li className="ml-3">Calculates your score as you play</li>
                        </ul>
                        <p className="mt-5">Yahtzee Scorer <span className="font-semibold underline">does not:</span></p>
                        <ul className="lg:w-96 list-disc list-inside flex flex-col gap-1">
                            <li className="ml-3">Simulate rolls for you</li>
                            <li className="ml-3">Teach you to play</li>
                            <li className="ml-3">Track multiple games</li>
                            <li className="ml-3">Save scores between games</li>
                        </ul>
                    </Trail>
                </div>
            </div>
            <div className="lg:hidden w-full flex justify-center">
                    <Link to="../new">
                        <button className="p-5 rounded-3xl w-60 text-2xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-blue-700 dark:text-teal-100 dark:hover:bg-teal-100 transition-all dark:hover:text-blue-700">
                                New Game
                        </button>
                    </Link>
            </div>

        </section>
        // <section id="home" className=" container w-full h-full pt-5 md:pt-16">
        //     <Trail>
        //     <h1 className="font-bold text-5xl mb-10 text-teal-500 dark:text-teal-300">Yahtzee Scorer</h1>
        //     <div className="flex max-w-xl flex-col gap-3 my-5 text-start text-blue-900 dark:text-blue-300 text-lg px-2">
        //         <Trail>
        //             <p>Yahtzee Scorer is a dynamic Yahtzee score card.</p>
        //             <p>Yahtzee Scorer is designed for any occasion in which you have the players and the dice, but no score card.</p>
        //             <p className="mt-5">Yahtzee Scorer:</p>
        //             <ul className="list-disc list-inside">
        //                 <li className="ml-3">Generates a score card based on player names and standard rules</li>
        //                 <li className="ml-3">Keeps track of turns</li>
        //                 <li className="ml-3">Calculates your score as you play</li>
        //             </ul>
        //             <p className="mt-5">Yahtzee Scorer <span className="font-bold">does not:</span></p>
        //             <ul className="list-disc list-inside">
        //                 <li className="ml-3">Simulate rolls for you</li>
        //                 <li className="ml-3">Teach you to play</li>
        //                 <li className="ml-3">Track multiple games</li>
        //                 <li className="ml-3">Save scores between games</li>
        //             </ul>
        //         </Trail>
        //     </div>
        //     <Link to="../new">
        //         <button className="p-5 rounded-md w-full md:w-3/4 text-xl bg-teal-300 text-teal-900 font-bold my-5 dark:bg-teal-700 dark:text-teal-100">
        //             New Game
        //         </button>
        //     </Link>
        //     </Trail>
        // </section>
     );
}
 
export default Home;