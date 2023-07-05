import { Link } from "react-router-dom";

const Home = () => {
    return ( 

        <section id="home" className="w-full h-full">
            <h1 className="font-bold text-5xl">Yahtzee Scorer</h1>
            <Link to="../new">
                <button className="p-3 rounded-md bg-gray-300 my-5">
                    New Game
                </button>
            </Link>
        </section>
     );
}
 
export default Home;