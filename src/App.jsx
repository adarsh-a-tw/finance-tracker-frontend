import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RecordBooks from "./components/RecordBooks";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        {loggedIn && <Navbar onLogout={() => { }} />}
        <Routes>
          {loggedIn ? (
            <Route path="/" element={<RecordBooks />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
