import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from '../data/words.json';
import letters from '../data/letters.json';
import bodyParts from '../data/body-parts.json'; 
import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, pause: false, over: false, win: false };

const App = () => {

  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str: ""});
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const classNameS = bodyParts;


 



  const getNewWord = ()=>{
    const str= words[Math.floor(Math.random() * words.length)];
    const revealed = str.split("").map (char => char ="")
    setWord({...word, str, revealed});
  }

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    getNewWord();
  };

  const handlePause = () => {
    setGame({ ...game, pause: !game.pause });

  };

  const handleGuess = (ltr) =>{
    setUsedLetters ([...usedLetters, ltr]);

    let splitWord = word.str.split("");

    if(splitWord.includes(ltr)){
      splitWord.forEach((char, i) =>{
        if(char ===ltr){
          let newObj = {...word};
          newObj.revealed[i]=ltr;
          setWord(newObj);

        }
      })
    }else{
      setWrongGuesses([...wrongGuesses, ltr])
    }

    let isDone = word.revealed.every(char => char !== '')

    if((wrongGuesses.length < 10) && (isDone) ){
      handleEndGame(true);

    } else if(wrongGuesses.length ===10){

      handleEndGame(false);
    }
    
  }


  const handleReset =() =>{
    setGame({ ...game, started: game.started});
    getNewWord();
    setWrongGuesses([]);
    setUsedLetters([]);
  }

  const handleEndGame =(win) =>{
    setGame({...game, over: !game.over, win: win});
  }

  const handleReStart = () =>{
    window.location.reload()
  }

  return (

    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        { !game.started && (<Button onClickFunc ={handleStart} >Start</Button>)}


        { game.started && (<Button onClickFunc={handlePause}>{game.pause ? 'continue' : 'pause'}</Button>)}

        
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      
      {game.started && (
        <> 
          <Container>
          <Deadman classNameS={classNameS}/>
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses}/>
            <TheWord  word ={word} setWord={setWord} />
          </RightColumn>
          </Container>
          <Keyboard 
              word={word} setWord={setWord} 
              letters={letters} usedLetters={usedLetters} 
              handleGuess={handleGuess} handleEndGame={handleEndGame}/>
        </>

      )}

      {game.over && (
        <GameOverModal 
            word ={word} game={game}
            handleReStart={handleReStart}/>
      )
      
      }
        
    </Wrapper>
  );

};



const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
