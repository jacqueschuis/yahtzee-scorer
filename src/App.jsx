import { useState } from "react";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StartForm from "./components/StartForm";
import Game from "./components/Game";
import Home from "./components/Home";

function App() {
  const [players, setPlayers] = useState([]);

  const handleStartOver = () => setPlayers([]);

  const router = createBrowserRouter([
    {
      path: "/new",
      element: <StartForm players={players} onUpdatePlayers={setPlayers} />,
    },
    {
      path: "/play",
      element: (
        <Game
          players={players}
          onUpdatePlayers={setPlayers}
          onStartOver={handleStartOver}
        />
      ),
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);

  return (
    <>
      <main className="w-full min-h-screen h-full py-10 md:flex-col bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-sans flex justify-center leading-none font-normal">
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
