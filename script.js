class FlashCard {
  constructor (front, back, hint) {
    this.front = front
    this.back = back
    this.hint = hint
    this.score = 0
    this.display = document.querySelector('h2')
    this.input = document.querySelector('.input')
    this.hintText = document.querySelector('main p')
    this.result = document.querySelector('h3')
  }
  showBack () {
    // show the back of the card
    this.display.innerText = this.back
  }
  checkAnswer () {
    // compare the submission text to the answer and add one to the score
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
    this.clearAndPlaceNewCard()
  }

  clearAndPlaceNewCard () {
    // check if at end, clear the input, clear the result, and clear the hint
    this.checkIfAtEnd()
    this.currentCard.showFront()
    this.currentCard.input.value = ''
    this.currentCard.result.innerText = ''
    this.currentCard.hintText.innerHTML = ''
  }

  checkIfAtEnd () {
    // decide what to do at the end...
    if (this.index === this.cards.length) {
      this.shuffle()
      this.sortByScore()
      this.index = 0
      this.currentCard = this.cards[this.index]
    } else {
      console.log('more to go')
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
      this.clearAndPlaceNewCard()
    }
  }
}

const game = new Game()

// I feel like the event listeners aren't very readable. What would be a better way to do this?
// how to more easily add all the cards?

// dynamic javascript attributes
