import "./App.css";
import { About } from "./components/About";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import NoteState from "./contexts/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
        <Switch>
        <Route exact path="/">
                <Login />
              </Route>
        <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
          
          <div>
          <Navbar />
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              
           
          </div>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
