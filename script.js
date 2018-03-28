class FlashCard {
  constructor (front, back, hint) {
    this.front = front
    this.back = back
    this.hint = hint
    this.score = 0
    this.display = document.querySelector('.display')
    this.input = document.querySelector('.input')
    this.hintText = document.querySelector('.hint-text')
    this.result = document.querySelector('.result')
    this.gameEnd = document.querySelector('.game-end')
  }
  showBack () {
    // show the back of the card and remove cursor from input box
    this.display.innerText = this.back
    this.input.blur()
  }
  checkAnswer () {
    // compare the submission text to the answer and add one to the score
    this.result.style.display = 'block'
    if (this.display.innerText === this.front) {
      if (this.input.value === this.back) {
        this.score++
        this.result.innerText = 'Correct!'
      } else {
        this.result.innerText = 'Close, but not quite'
      }
    } else {
      console.log('display and front of card dont match')
    }
  }
  showHint () {
    // make the hint visible
    this.hintText.innerHTML = this.hint
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
      new FlashCard('い', 'i', 'looks like two I\'s side by side'),
      new FlashCard('う', 'u', 'looks like a man kicked in the stomach and flying sideways while saying \'Uuf\''),
      new FlashCard('え', 'e', 'looks like an Energetic ninja running away'),
      new FlashCard('お', 'o', 'looks like a UFO with an antenna')
    ]
    this.index = 0
    this.currentCard = this.cards[this.index]

    this.hintButton = document.querySelector('.hint')
    this.hintButton.addEventListener('click', () => {
      this.currentCard.showHint()
    })

    this.flipButton = document.querySelector('.flip')
    this.flipButton.addEventListener('click', () => {
      this.currentCard.checkAnswer()
      this.currentCard.showBack()
    })

    this.nextButton = document.querySelector('.right')
    this.nextButton.addEventListener('click', () => {
      this.next()
    })

    this.prevButton = document.querySelector('.left')
    this.prevButton.addEventListener('click', () => {
      this.goToPrevious()
    })
  }

  next () {
    // increase the index by one and then clear and place new card
    this.index = this.index + 1
    this.currentCard = this.cards[this.index]
    this.checkIfAtEnd()
    this.clear()
    this.currentCard.showFront()
  }

  clear () {
    // clear the hint, input, and result areas
    this.currentCard.input.value = ''
    this.currentCard.result.style.display = 'none'
    this.currentCard.hintText.innerHTML = ''
  }

  checkIfAtEnd () {
    // shuffle and sort by score if at end. Otherwise, remove end-game text
    if (this.index === this.cards.length) {
      this.shuffle()
      this.sortByScore()
      this.index = 0
      this.currentCard = this.cards[this.index]
      this.currentCard.gameEnd.style.display = 'block'
    } else {
      this.currentCard.gameEnd.style.display = 'none'
    }
  }

  shuffle () {
    // shuffle the cards in a random order
    this.cards.sort(function (a, b) {
      return 0.5 - Math.random()
    })
    console.log(this.cards)
  }

  sortByScore () {
    // sort the cards in order of lowest to highest score, putting incorrect cards at the front
    this.cards.sort(function (a, b) {
      return a.score - b.score
    })
    console.log(this.cards)
  }

  goToPrevious () {
    // if on back of card, flip over to front. If on front of card, go to previous card front
    if (this.currentCard.display.innerText === this.currentCard.back) {
      this.currentCard.showFront()
    } else {
      this.index = this.index - 1
      this.currentCard = this.cards[this.index]
      this.clear()
      this.currentCard.showFront()
    }
  }
}

class Display {
  constructor () {
    this.game = new Game()
    this.keyPressed = null
    this.keyLocation = null
    window.addEventListener('keyup', (event) => {
      this.keyPressed = event
      this.keyLocation = event.path[0].classList[0]
      if (this.keyPressed.key === 'ArrowLeft' && this.keyLocation !== 'input') {
        this.arrowLeft()
      } else if (this.keyPressed.key === 'ArrowRight' && this.keyLocation !== 'input') {
        this.arrowRight()
      } else if (this.keyPressed.key === 'h' && this.keyLocation !== 'input') {
        this.h()
      } else if (this.keyPressed.key === 'Enter') {
        this.enter()
      }
    })
  }
  arrowLeft () {
    this.game.goToPrevious()
  }

  arrowRight () {
    this.game.next()
  }

  h () {
    this.game.currentCard.showHint()
  }

  enter () {
    this.game.currentCard.checkAnswer()
    this.game.currentCard.showBack()
  }
}

const display = new Display()

// add listeners to create hover with on keyboard shortcuts and 
