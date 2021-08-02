const Score = ({ length, answers }) => {
    const scoreCalc = () => (answers.length / length)*100;
    return ( 
        <>
        <p>Score total questions: { length } correct answers { answers.length }</p>
        <p>Your total score is: { scoreCalc() } %</p>
        </>
     );
}
 
export default Score;