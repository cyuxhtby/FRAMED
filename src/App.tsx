/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";

// import InGameScreen from "./screens/in-game";
import { useState, useEffect } from "react";
import { init, getInstance } from "./lib/fhevm";
import { Button } from "./components/ui/button";
import WaitingRoom from "./screens/waiting-room";
import { usePrivy } from "@privy-io/react-auth";
import { Connect } from "./components/ui/connect";

function App() {
  const { login, authenticated, ready } = usePrivy();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  if (!ready) return <p>loading...</p>;
  return (
    <main>
      <Connect>
        {(account, provider) => (
          <div>
            {/* <h1>Based Account Abstraction</h1> */}
            {/* <h2>Connect and Mint your AA powered NFT now</h2> */}
            {!authenticated && <Button onClick={login}>JOIN GAME</Button>}
            {/* {loading && <p>Loading Smart Account...</p>} */}
            {authenticated && <WaitingRoom />}
          </div>
        )}
      </Connect>
    </main>
  );
}

export default App;
