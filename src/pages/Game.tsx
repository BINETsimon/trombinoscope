/*
Premier Jeu
- faire un jeu a base de photos au hasard pour trouver le nom 🚧

- selectionner la classe souhaité ❓
*/

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import { GameState } from '../store/interfaces/gameState';
import GameQueue from '../components/Game/GameQueue';

function Game() {
  const trombi = useSelector((state: RootState) => state.trombi);

  const [game, setGame] = useState<GameState[]>([]);

  const [range, setRange] = useState<number>(10);
  const [labelInput, setLabelInput] = useState<Set<string>>(new Set());
  

  const toggleCheckbox = (e: { target: { name: string; }; }): void => {
    const label = e.target.name;

    const labelAvailable = new Set(trombi.files.map(file => file.label));

    if (label === 'all'){
      labelAvailable.size <= labelInput.size ? setLabelInput(new Set()) : setLabelInput(labelAvailable);
    }else{
      if (labelInput.has(label)) {
        labelInput.delete(label);
        setLabelInput(new Set(labelInput));
      } else {
        labelInput.add(label);
        setLabelInput(new Set(labelInput));
      }
    }
  };

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newGame: GameState[] = [];
    let trombiFilteredBuffer = trombi.files.filter(file => labelInput.has(file.label));

    const trombiLength = trombiFilteredBuffer.length; 
    for (let i = 0; i < range && i < trombiLength; i++) {

      const rdm = getRandomInt(trombiFilteredBuffer.length);

      let trombiNameBuffer = trombi.files.filter(file => file.id !== trombiFilteredBuffer[rdm].id);
      const possibilities = [];
      for (let j=0; j < 3; j++){
        const selectionFile = trombiNameBuffer[getRandomInt(trombiNameBuffer.length)];
        possibilities.push(`${selectionFile.first_name} ${selectionFile.last_name}`);
        trombiNameBuffer = trombiNameBuffer.filter(file => file.id !== selectionFile.id);
      }
      possibilities.push(`${trombiFilteredBuffer[rdm].first_name} ${trombiFilteredBuffer[rdm].last_name}`);

      const gameOption: GameState = {
        file: trombiFilteredBuffer[rdm],
        possibilities: shuffleArray(possibilities),
        score: 0
      };

      trombiFilteredBuffer = trombiFilteredBuffer.filter(file => file.id !== gameOption.file.id);

      newGame.push(gameOption);
    }

    setGame(newGame);
  };

  return (
    <> 
      {
        game.length === 0 ? 
          (
            <div className="main-container">
              <h1>Trouvez le bon nom</h1>
              <div className="display-container">
                <div className="inside-container">
                  <div>
                    <h2>Règles du jeu :</h2>
                    <p>Vous allez devoir retrouver le nom correspondant à l'image que vous voyez entre 4 proposition. Vous pouvez faire varier la taille de votre série ainsi que filtrer sur les labels que vous avez défini.</p>
                  </div>
                  <div>
                    <h2>Paramètres de la partie :</h2>
                    <form onSubmit={handleSubmit}>
                      <fieldset>
                        <legend>Filtre de la série :</legend>
                        <label className='checkbox-filter'>
                          <input type="checkbox" id="all" name="all" onChange={toggleCheckbox} checked={labelInput.size === new Set(trombi.files.map(file => file.label)).size}/>
                          Tous
                        </label>
                        {Array.from(new Set(trombi.files.map(file => file.label))).map(label => (
                          <label className='checkbox-filter' key={label}>
                            <input type="checkbox" id={label} name={label} onChange={toggleCheckbox} checked={labelInput.has(label)} />
                            {label}
                          </label>
                        ))}
                      </fieldset>
                      <fieldset>
                        <legend>Taille de votre Série :</legend>
                        <input type="range" min="5" max="20" step="5" value={range} onChange={(e) => setRange(parseInt(e.target.value))} />
                        {range}
                      </fieldset>
                      <button type="submit" className='start-btn'>Commencer</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {
                game.length >= 5 ? (
                  <GameQueue gameProp={game} setGameProp={setGame}></GameQueue>
                ):(
                  <div className='game'>
                    <p>Vous devez avoir un minimum de 5 images pour commencer</p>
                    <button onClick={() => setGame([])}>Retour</button>
                  </div>
                )
              }
            </>
          )
      }
    </>
  );
}
  
export default Game;