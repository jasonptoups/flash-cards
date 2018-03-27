const display = document.querySelector('main div h2')
const input = document.querySelector('.input')
const hintButton = document.querySelector('.hint')
const flipButton = document.querySelector('.flip')
const nextButton = document.querySelector('.next')

class FlashCard {
  constructor (front, back, hint) {
    this.front = front
    this.back = back
    this.hint = hint
    this.score = 0
  }
  flip () {
    // replace front text with back text.
    display.innerText = this.back // need to figure out how to pass each card into the this...
  }
  check () {
    // compare the submission text to the answer and add one to the score
    if (display.innerText === this.front) {
      let result = document.querySelector('h3')
      if (input.value === this.back) {
        this.score++
        result.innerText = 'Correct!'
      } else {
        result.innerText = 'Close, but not quite'
      }
    } else {
      console.log('display and front of card dont match')
    }
  }
  showHint () {
    const hintP = document.querySelector('main p')
    hintP.innerHTML = this.hint
  }
  next () {
    // go to next item in array
  }
  previous () {
    // replace the front text with the previous card's front text
    // replace the back text with the next card's back text
  }
  end () {
    // check if the deck of cards is done
    // if done, display the results
  }
}


class Game {
  constructor () {
    this.cards = [
      new FlashCard('あ', 'a', 'looks like an Apple with a stem'),
      new FlashCard('い', 'i', 'looks like two i\'s side by side'),
      new FlashCard('う', 'u', 'looks like a man kicked in the stomach and flying sideways while saying \'Uuf\''),
      new FlashCard('え', 'e', 'looks like an Energetic ninja running aw\'eh\''),
      new FlashCard('お', 'o', 'looks like a UFO with an antenna')
    ]
    this.index = 0
  }
}

// game class
// have an attribute which is current index
// also store the cards in that game class

game class
// this.cards = [
//   new card ()
//   new card ()
// ]
// this.index = 0

// this.cards[this.index].name => the name of the first card



// let checkForNext = function () {
//   document.addEventListener('click', (event) => {
//     event.preventDefault()
//     return event.target.classList[1] === 'next'
//   })
// }
