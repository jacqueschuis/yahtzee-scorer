import { Link } from "react-router-dom";

const Win = () => {
    return ( 

        <section>
            <h1>Winner!</h1>
            <Link to="../new">
                <button className="p-3 rounded-md bg-gray-300 my-5">
                    New Players
                </button>
            </Link>
            <Link to="../new">
                <button className="p-3 rounded-md bg-gray-300 my-5">
                    Same Players
                </button>
            </Link>
        </section>
     );
}
 
export default Win;