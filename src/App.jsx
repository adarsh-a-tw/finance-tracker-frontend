import { ThemeProvider, Snackbar, Alert } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RecordBooks from "./components/RecordBooks";
import alertStore from "./store/alertStore";
import authStore from "./store/authStore";
import theme from "./theme";

function App() {

  const { loggedIn } = authStore();
  const { clearAlert, shouldAlertOpen, message, type } = alertStore();
  const { logout } = authStore();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }} open={shouldAlertOpen} autoHideDuration={6000} onClose={clearAlert}>
          <Alert onClose={clearAlert} severity={type} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <BrowserRouter>
          {loggedIn && <Navbar logout={logout} />}
          <Routes>
            {loggedIn ? (
              <Route path="/" element={<RecordBooks />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
