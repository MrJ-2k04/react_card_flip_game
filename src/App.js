import './App.css';
import TopBoard from './components/TopBoard';
import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import Scoreboard from './components/Scoreboard';

const cardImages = [
  { src: "/assets/1.jpg" },
  { src: "/assets/2.jpg" },
  { src: "/assets/3.jpg" },
  { src: "/assets/4.png" },
  { src: "/assets/5.jpg" },
  { src: "/assets/6.jpg" },
  { src: "/assets/7.jpg" },
  { src: "/assets/8.jpg" },
  { src: "/assets/question.jpg" }
]
let timer;

function App() {
  const [isGameOver, setIsGameOver] = useState(false)
  const [ticking, setTicking] = useState(false)
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(1000)
  const [cards, setCards] = useState([])
  const [flipCount, setFlipCount] = useState(0)
  const [flippedList, setFlippedList] = useState([])
  const [revealedCards, setRevealedCards] = useState([])

  // Score Timer
  if (!isGameOver&&cards.length>0&&ticking) {
    setTimeout(() => {
      setScore(score-1)
    }, 100);
  }

  // React on every Flip
  useEffect(() => {

    // Check if game is Over
    if (revealedCards.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        setTicking(false)
      }, 200);
      setTimeout(() => {
        setIsGameOver(true)
      }, 1000);
    }

    if (flipCount >= 2) {

      // Check if same card is clicked
      let idArr = flippedList.map(card => card.id);
      let isSame = findDuplicates(idArr).length > 0

      // If same card exists Flip it Back
      if (isSame) {
        hideCard(flippedList[0].id)
        setTurns(turns + 1)
      }
      // Else Go Further
      else {
        flippedList.forEach(card => {

          let shouldHide = true
          // Check if already revealed
          if (revealedCards.length > 0) {
            let arr = revealedCards.filter(revCard => {
              return revCard.src === card.src
            })
            if (arr.length > 0) {
              shouldHide = false;
            }
          }
          // Check if they just got revealed
          let result = flippedList.filter(dcard => dcard.src === card.src)
          if (result.length > 1) {
            setRevealedCards([...revealedCards, ...result])
          }
          // Flip Back if they don't match
          else if (shouldHide) {
            setTimeout(() => {
              hideCard(card.id)
              setTurns(turns + 1)
            }, 500);
          }

        })
      }

      // Clear temporary fliplist as EITHER card is ->revealed<- OR card is ->Flipped Back<- into place
      setFlippedList([])
      setFlipCount(0)
    } else {

    }
  }, [flipCount])

  const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

  const showCard = (cardToFlip) => {
    let info = [...flippedList, { "src": cardToFlip.src, "id": cardToFlip.id }]
    setFlippedList(info)

    let cardBox = document.getElementById(cardToFlip.id)
    cardBox.classList.add("flipped")
    setFlipCount(flipCount + 1)
  }

  const hideCard = (id) => {
    let cardBox = document.getElementById(id)
    cardBox.classList.remove("flipped")
  }

  const shuffleCards = () => {
    let deck = [...cardImages, ...cardImages]
      .sort(() => (Math.random() - 0.5))
      .map((card) => (
        { src: card.src, id: Math.random() }
      )
      )

    setTurns(0)
    setCards(deck)
    setScore(1000)
    setFlipCount(0)
    setFlippedList([])
    setRevealedCards([])
    setIsGameOver(false)
    setTicking(true)
  }

  return (
    <div className="App">
      <TopBoard shuffleCards={shuffleCards} />
      <br />
      {score}
      {!isGameOver && <div className="grid">
        {cards && cards.map((card) => {
          return (
            <SingleCard flip={showCard} key={card.id} data={card} />
          )
        })}
      </div>}
      {isGameOver && <Scoreboard />}
      <h2>TURNS: {turns}</h2>
    </div>
  );
}

export default App;
