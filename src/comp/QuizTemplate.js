import { useContext, useState } from 'react';
import { Context } from '../context/globalState';
import useFetch from '../hooks/useFetch';
import Question from "./Question";
import Score from "./Score";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const QuizTemplate = () => {
    const context = useContext(Context);
    const url = context[0];
    const { data, isPending, error } = useFetch(url);
    const [solved, setSolved] = useState(false);
    const [answers, setAnswers] = useState([]);
    const  [showWrong, setShowWrong] = useState(false);
    
    const handleSubmit = (e) => {
        setSolved(true)
        window.scrollTo(0, 0);
    }

    const handleWrong = (e) => {
        setShowWrong(true);
    }

    // Check that the response that we get has questions in it
    if(data){
        if(data.response_code !== 0){
            return(
                <>
                    <p>Sorry we could not find enough questions for your query</p>
                    <Link to='/'>Please try another query</Link>
                </>
            )
        }
    }

    return ( 
        <div className='quiz-template'>
            { error && <div> { error }</div>}
            {isPending && <Loader />}
            { data && 
                <>
                    <h1>{ decodeURIComponent(data.results[0].category) }</h1>
                    {solved && 
                        <div className='quiz-container'>
                            <Score length={ data.results.length } answers= { answers }/>
                            <button 
                                onClick={ e => handleWrong(e) }
                                disabled = { showWrong ? 'disabled' : '' }
                                >
                                    See Wrong Answers
                            </button>
                            <Link to='/'>
                                <button>Choose Another Quiz</button>
                            </Link>
                        </div>
                    }
                    <div className='quiz-container'>
                        {data.results.map((question, idx) => 
                            <Question key={idx} 
                                    question={ question } 
                                    idx = { idx } 
                                    answers={ answers } 
                                    setAnswers={ setAnswers } 
                                    solved={ solved }
                                    showWrong={ showWrong }
                                    setShowWrong={ setShowWrong }
                                    />)}
                        <button 
                            onClick={ e => handleSubmit(e) }
                            disabled = { showWrong ? 'disabled' : '' }
                            >
                                Submit Answers
                        </button>
                    </div>
                </>
            }
        </div>
     );
}
 
export default QuizTemplate;