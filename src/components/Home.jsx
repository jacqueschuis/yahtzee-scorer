import React from "react";
import { Link } from "react-router-dom";
import Trail from "./Trail";

const Home = () => {

    return ( 
        <section id="home" className="w-full h-full flex flex-col gap-10 items-center justify-center">
            <div className="container lg:columns-2 lg:flex justify-center items-center w-full" id="column-container">
                <div className="lg:w-1/2 px-5 break-inside-avoid flex-auto text-center lg:text-end mb-10" id="col-1">
                    <h1 className="tracking-wider leading-none font-bold md:text-9xl sm:text-7xl text-5xl text-teal-500 dark:text-blue-300">Yahtzee</h1>
                    <h2 className="font-semibold md:text-7xl tracking-[.2em] md:tracking-[.5em] text-teal-900 dark:text-blue-100">scorer</h2>
                </div>
                <div id="col-2" className="px-5 text-start break-inside-avoid flex-auto">
                    <p>Yahtzee Scorer is a dynamic Yahtzee score card.</p>
                        <p>Yahtzee Scorer is designed for any occasion in which you have the players and the dice, but no score card.</p>
                        <p className="mt-5">Yahtzee Scorer:</p>
                        <ul className="list-disc list-inside">
                            <li className="ml-3">Generates a score card based on player names and standard rules</li>
                            <li className="ml-3">Keeps track of turns</li>
                            <li className="ml-3">Calculates your score as you play</li>
                        </ul>
                        <p className="mt-5">Yahtzee Scorer <span className="font-semibold underline">does not:</span></p>
                        <ul className="list-disc list-inside">
                            <li className="ml-3">Simulate rolls for you</li>
                            <li className="ml-3">Teach you to play</li>
                            <li className="ml-3">Track multiple games</li>
                            <li className="ml-3">Save scores between games</li>
                        </ul>
                </div>
            </div>
            <div className="w-full flex justify-center">
                    <Link to="../new">
                        <button className="p-5 rounded-3xl text-3xl tracking-wider bg-teal-300 text-teal-900 hover:bg-teal-900 hover:text-teal-300 font-bold my-5 dark:bg-teal-700 dark:text-teal-100 dark:hover:bg-teal-300 transition-all dark:hover:text-teal-700">
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