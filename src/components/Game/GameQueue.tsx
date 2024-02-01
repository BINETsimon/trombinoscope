import { useEffect, useState } from 'react';
import { GameState } from '../../store/interfaces/gameState';

interface MyComponentProps {
    gameProp: GameState[]; // Utilisez le type approprié ici
    setGameProp: React.Dispatch<React.SetStateAction<GameState[]>>;
  }
  
function GameQueue({ gameProp, setGameProp }: MyComponentProps) {
  // Utilisez myProp comme vous le souhaitez dans le composant
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameState>(gameProp[0]);
  const [questionIndex, setQuestionIndex] = useState<number>(1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const button = e.target as HTMLButtonElement;
    const file = currentQuestion.file;

    if (button.name === `${file.first_name} ${file.last_name}`){
      setScore(score + 1);
    }
    
    setCurrentQuestion(gameProp[questionIndex]);
    setQuestionIndex(questionIndex+1);
  };

  useEffect(() => {
    
  }, []);
  
  return (
    <div className='game'>
      { questionIndex <= gameProp.length ? 
        (
          <div className='question-container'>
            <img src={currentQuestion.file.local_url!} alt={currentQuestion.file.first_name} />
            <div> réponse : {currentQuestion.file.first_name}</div>
            <div className="proposition-container">
              {currentQuestion.possibilities.map((possibility, indexP) => (
                <button onClick={handleClick} key={indexP} name={possibility}>{possibility}</button>
              ))}
            </div>
          </div>
        ):(
          <div className="question-container">
            <h2>BRAVO !</h2>
            <p>Vous avez réalisé un score de : {score} / {gameProp.length}</p>
          </div>
        )}
    </div>
  );
}

export default GameQueue;