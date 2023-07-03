import { Link } from "react-router-dom";

const StartForm = () => {
    return ( 
        <section>
            <h1 className="text-4xl">New Game</h1>
            <form>
                
                <Link to="../play">Start Game</Link>
            </form>
        </section>
     );
}
 
export default StartForm;