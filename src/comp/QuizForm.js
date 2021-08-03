import  { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../context/globalState';
import { categories } from '../data/categories';


const QuizForm = () => {
    let history = useHistory();
    const [category, setCategory] = useState('history');
    const [catCode, setCatCode] = useState(23);
    const [difficulty, setDifficulty] = useState('easy');
    const [amount, setAmount] = useState(10);
    const [url, setUrl] = useContext(Context);
    console.log(url)
    let urli = `https://opentdb.com/api.php?amount=${amount}&category=${catCode}&difficulty=${difficulty}&type=multiple&encode=url3986`;
    
    const handleCategory = (e, id, code) => {
        setCategory(id);
        setCatCode(code);
    }
    const handleLevel = (e, level) => {
        setDifficulty(level);
    }
    const handleAmount = (e, questions) => {
        setAmount(questions);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(urli);
        history.push('/quiz')
    }
    
    const levelArr = ['hard', 'medium', 'easy'];

    const numberOfQuestions = [ 10, 20, 30];

    return ( 
        <div className="form-container">
            <form >
                <div className="categories">
                    <h2>CATEGORIES</h2>
                    <div className="container-flex">
                        {categories.map(cat => {
                            return(
                                <div className={(category === cat.name) ? 'cat active' : 'cat'} 
                                id={cat.name} 
                                key={cat.name}
                                onClick={(e) => handleCategory(e, cat.name, cat.cat_code)}>
                                <img src= {cat.icon} alt={cat.category} />
                                <h2>{cat.category}</h2>
                        </div>
                            )
                        })}
                    </div>

                </div>
                <div className="difficulty">
                    <h2>LEVEL OF DIFFICULTY</h2>
                    <div className="container-flex">
                        {levelArr.map(level => {
                            return(
                                <div className={(difficulty === level) ? 'level active' : 'level'} 
                                id={level} 
                                key={level}
                                onClick={(e) => handleLevel(e, level)}>
                                <h2>{level}</h2>
                        </div>
                            )
                        })}
                    </div>
                </div>
                <div className="questions">
                    <h2>NUMBER OF QUESTIONS</h2>
                    <div className="container-flex">
                        {numberOfQuestions.map(nQuestions => {
                            return(
                                <div className={(amount === nQuestions) ? 'number-questions active' : 'number-questions'} 
                                id={nQuestions} 
                                key={nQuestions}
                                onClick={(e) => handleAmount(e, nQuestions)}>
                                <h2>{nQuestions}</h2>
                        </div>
                            )
                        })}
                    </div>
                </div>
                <button onClick={(e) => {handleSubmit(e)}}>Generate Quiz</button>
            </form>
        </div>

     );
}
 
export default QuizForm;