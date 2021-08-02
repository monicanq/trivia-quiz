import { useEffect, useState } from 'react';


const Question = ({question, idx, answers, setAnswers}) => {
    const [shuffledAnswers, setShuffledAnswers] = useState ([]);


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

    // Set answer input by user
    const handleChange = (e, questionNum, i) => {
        if (e.target.value === 'correct'){
            setAnswers([...answers, questionNum]);
        } else if (answers.indexOf(questionNum) >= 0){
            const updateAnswers = [...answers];
            updateAnswers.splice(answers.indexOf(questionNum), 1);
            setAnswers(updateAnswers);
        }
    }

    return ( 
        <>  
            <p className='question'>{ idx + 1} - { decodeURIComponent(question.question) }</p>
            {shuffledAnswers.map((ans, i) => {
                return(
                    <div key={ i }>
                    <label key={ i } className='answers'>
                        <input
                        name={`q${ idx }`}
                        type="radio"
                        value={ ans.correct ? 'correct' :  'wrong' }
                        onChange={ (e) => { handleChange(e, `q${ idx + 1}`, idx ) } }
                        />
                        { decodeURIComponent(ans.question) }
                        { ans.correct ? ' correct' :  ' wrong'  }
                    </label>
                </div>
                )
            })}
        </>
     );
}
 
export default Question;