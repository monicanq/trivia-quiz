import { useContext, useState } from 'react';
import { Context } from '../context/globalState';
import useFetch from '../hooks/useFetch';
import Question from "./Question";
import Score from "./Score";
import Loader from "./Loader";


const QuizTemplate = () => {
    const context = useContext(Context);
    const url = context[0];
    const { data, isPending, error } = useFetch(url);
    const [solved, setSolved] = useState(false);
    const [answers, setAnswers] = useState([]);
    
    const handleSubmit = (e) => {
        setSolved(true)
        window.scrollTo(0, 0);
    }

    const handleWrong = (e) => {
        console.log('handling wrong')
        
    }
    
    const handleAgain = (e) => {
        console.log('handling again')
    }

    return ( 
        <div className='quiz-template'>
            {error && <p>Sorry we could not fetch the data requested</p>}
            {isPending && <Loader />}
            {data && 
                <>
                    <h1>{ decodeURIComponent(data.results[0].category) }</h1>
                    {solved && <Score length={ data.results.length } answers= { answers }/>}
                    {data.results.map((question, idx) => <Question key={idx} question={ question } idx = { idx } answers={ answers } setAnswers={ setAnswers } solved={ solved } />)}
                    <button onClick={ e => handleSubmit(e) }>Submit Answers</button>
                    <button onClick={ e => handleWrong(e) }>See Wrong Answers</button>
                    <button onClick={ e => handleAgain(e) }>Submit Answers</button>
                </>
            }
        </div>
     );
}
 
export default QuizTemplate;