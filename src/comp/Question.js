import { useEffect, useState } from 'react';


const Question = ({question, idx, answers, setAnswers, solved, showWrong, setShowWrong}) => {
    const [shuffledAnswers, setShuffledAnswers] = useState ([]);
    const [activateWrong, setActivateWrong] = useState (false);
    const questionNumber = `q${ idx + 1 }`;



    // function to shuffle the answers array
    const shuffle = (array) => {
        let m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
    }

    // Shuffle the answers array and set it on component load
    useEffect(() => {
        const constructAnswers = () => {
            const answersArr = [];
            answersArr.push({'correct' : true, 'question' : question.correct_answer});
            question.incorrect_answers.map(iAnswer => answersArr.push({'correct' : false, 'question' : iAnswer}))
            const shuffledAnswers = shuffle(answersArr);
    
            return shuffledAnswers;
        }
        setShuffledAnswers(constructAnswers()) 

    }, [question.correct_answer, question.incorrect_answers])


    // Add correct answers to an array to calculate the score later
    const handleChange = (e, questionNum, i) => {
        if (e.target.value === 'correct' && answers.indexOf(questionNum) < 0){
            setAnswers([...answers, questionNum]);
        } else if (answers.indexOf(questionNum) >= 0){
            const updateAnswers = [...answers];
            updateAnswers.splice(answers.indexOf(questionNum), 1);
            setAnswers(updateAnswers);
        }
    }


    useEffect(() => {
        showWrong ? setActivateWrong(true) : setActivateWrong(false)
    }, [showWrong])

    return ( 
        <>  
            <p className={ (activateWrong && !answers.includes(questionNumber)) ? 'wrong question' : 'question' }>
                { idx + 1 } - { decodeURIComponent(question.question) }
            </p>

            {shuffledAnswers.map((ans, i) => {
                return(
                    <div key={ i }>
                        <label className='answers'>
                            <input
                            name={ questionNumber }
                            type="radio"
                            value={ ans.correct ? 'correct' :  'wrong' }
                            onChange={ (e) => { handleChange(e, questionNumber, idx ) }}
                            disabled = { showWrong ? 'disabled' : '' }    
                            />
                            { decodeURIComponent(ans.question) }
                        </label>
                    </div>
                )
            })}
        </>
     );
}
 
export default Question;