import { useEffect, useState  } from "react";

const Score = ({ length, answers }) => {
    const scoreCalc = () => Math.round((answers.length / length)*100);
    const yourScore = scoreCalc();
    const [output, setOutput] = useState(0);
    // console.log('output', output, 'score', yourScore);
    
    useEffect(() => {
        const timer = setInterval(() => {
            if (output < yourScore){
                setOutput(output => (output + 1))
            }   
        }, 10);
        return () => clearInterval(timer);
    }, [output, yourScore])


    return ( 
        <>
            <p className='score-show'>Your score is: { output } %</p>
        </>
     );
}
 
export default Score;