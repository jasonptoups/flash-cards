class FlashCard {
  constructor (front, back, hint) {
    this.front = front
    this.back = back
    this.hint = hint
    this.score = 0
    this.display = document.querySelector('h2')
    this.input = document.querySelector('.input')
  }
  showBack () {
    // show the back of the card
    this.display.innerText = this.back 
  }
  check () {
    // compare the submission text to the answer and add one to the score
    if (this.display.innerText === this.front) {
      let result = document.querySelector('h3')
      if (this.input.value === this.back) {
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
  showFront () {
    // show the front of the card instead of the back of the card
    this.display.innerText = this.front
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
    this.hintButton = document.querySelector('.hint')
    this.hintButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.cards[this.index].showHint()
    })
    this.flipButton = document.querySelector('.flip')
    this.flipButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.cards[this.index].check()
      this.cards[this.index].showBack()
    })
    this.nextButton = document.querySelector('.next')
    this.nextButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.index = this.index + 1
      this.cards[this.index].showFront()
    })
  }
}

const game = new Game()
