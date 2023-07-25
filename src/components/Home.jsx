import React from "react";
import { Link } from "react-router-dom";
import Trail from "./Trail";

const Home = () => {

    return ( 

        <section id="home" className="w-fit h-full pt-5 md:pt-16">
            <Trail>
            <h1 className="font-bold text-5xl mb-10 text-teal-500 dark:text-teal-300">Yahtzee Scorer</h1>
            <div className="flex max-w-xl flex-col gap-3 my-5 text-start text-blue-900 text-lg px-2">
                <p>Yahtzee Scorer is a dynamic Yahtzee score card.</p>
                <p>Yahtzee Scorer is designed for any occasion in which you have the players and the dice, but no score card.</p>
                <p className="mt-5">Yahtzee Scorer:</p>
                <ul className="list-disc list-inside">
                    <li className="ml-3">Generates a score card based on player names and standard rules</li>
                    <li className="ml-3">Keeps track of turns</li>
                    <li className="ml-3">Calculates your score as you play</li>
                </ul>
                <p className="mt-5">Yahtzee Scorer <span className="font-bold">does not:</span></p>
                <ul className="list-disc list-inside">
                    <li className="ml-3">Simulate rolls for you</li>
                    <li className="ml-3">Teach you to play</li>
                    <li className="ml-3">Track multiple games</li>
                    <li className="ml-3">Save scores between games</li>
                </ul>
            </div>
            <Link to="../new">
                <button className="p-5 rounded-md w-3/4 text-xl bg-teal-300 text-teal-900 font-bold my-5 dark:bg-teal-700 dark:text-teal-300">
                    New Game
                </button>
            </Link>
            </Trail>
        </section>
     );
}
 
export default Home;