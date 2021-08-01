import Header from './comp/Header';
import Home from './comp/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route
    // Link
  } from "react-router-dom";
import QuizTemplate from './comp/QuizTemplate';


function App() {
  return (
    <div className="App">
        <Header />
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path='/quiz'>
                    <QuizTemplate />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
