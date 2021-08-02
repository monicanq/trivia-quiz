import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Context } from './context/globalState';

import Header from './comp/Header';
import Home from './comp/Home';
import QuizTemplate from './comp/QuizTemplate';

function App() {
    const [url, setUrl] = useState('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple&encode=url3986');

    return (
        <div className="App">
            <Context.Provider value={[url, setUrl]}>
                <Router>
                <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path='/quiz'>
                            <QuizTemplate />
                        </Route>
                    </Switch>
                </Router>
            </Context.Provider>
        </div>
  );
}

export default App;
