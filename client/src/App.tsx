import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SocketProvider } from "./context/SocketProvider";

const Lobby = lazy(() => import("./pages/Lobby"));
const Room = lazy(() => import("./pages/Room"));

function App() {
  return (
    <Router>
      <SocketProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </Suspense>
      </SocketProvider>
    </Router>
  );
}

export default App;
