const UI = () => {
    return ( 
        <section className="flex gap-5 w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <div className="w-8 h-8 bg-blue-100"></div>
                <div className="w-8 h-8 bg-blue-300"></div>
                <div className="w-8 h-8 bg-blue-500"></div>
                <div className="w-8 h-8 bg-blue-700"></div>
                <div className="w-8 h-8 bg-blue-900"></div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="w-8 h-8 bg-teal-100"></div>
                <div className="w-8 h-8 bg-teal-300"></div>
                <div className="w-8 h-8 bg-teal-500"></div>
                <div className="w-8 h-8 bg-teal-700"></div>
                <div className="w-8 h-8 bg-teal-900"></div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="w-8 h-8 bg-orange-100"></div>
                <div className="w-8 h-8 bg-orange-300"></div>
                <div className="w-8 h-8 bg-orange-500"></div>
                <div className="w-8 h-8 bg-orange-700"></div>
                <div className="w-8 h-8 bg-orange-900"></div>
            </div>
        </section>
     );
}
 
export default UI;