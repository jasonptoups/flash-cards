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
    this.cardDiv = document.querySelector('.card')
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
    } else {}
  }
  showHint () {
    // make the hint visible
    this.hintText.innerHTML = this.hint
  }
  showFront () {
    // show the front of the card instead of the back of the card
    this.display.innerText = this.front
    this.cardDiv.style.backgroundColor = 'white'
    this.display.classList.remove('handwritten')
    this.display.style.fontSize = '100px'
  }
  clear () {
    // clear the hint, input, and result areas
    this.input.value = ''
    this.result.style.display = 'none'
    this.hintText.innerHTML = ''
  }
}

class Game {
  constructor () {
    this.cards = []
    this.cards = hiraganaArray.map(item => new FlashCard(item[0], item[1], item[2]))
    console.log(this.cards)
    this.index = 0
    this.currentCard = this.cards[this.index]
    this.highestScore = 0
    this.scoreRange = []
    this.cardDiv = document.querySelector('.card')
  }
  flip () {
    this.currentCard.checkAnswer()
    this.currentCard.showBack()
    this.cardDiv.classList.add('shadow')
    this.currentCard.display.classList.add('handwritten')
    this.currentCard.display.style.fontSize = '140px'
    this.checkHighScore()
    this.addScoreHeaders()
    this.arrangeScores()
  }
  next () {
    // increase the index by one and then clear and place new card
    this.index = this.index + 1
    this.currentCard = this.cards[this.index]
    this.checkIfAtEnd()
    this.currentCard.clear()
    // this.cardDiv.style.background = ''
    // this.cardDiv.style.backgroundColor = 'white'
    this.cardDiv.classList.remove('shadow')
    this.currentCard.showFront()
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
      this.currentCard.clear()
      this.currentCard.showFront()
    }
  }
  checkHighScore () {
    if (this.highestScore < Math.max(...this.cards.map((i) => i.score))) {
      this.highestScore = Math.max(...this.cards.map((i) => i.score))
      this.scoreRange = []
      for (let i = this.highestScore; i > -1; i--) {
        this.scoreRange.push(i)
      }
    } else {}
  }
  addScoreHeaders () {
    let scoreDiv = document.querySelector('aside div')
    scoreDiv.innerHTML = ''
    this.scoreRange.forEach((score) => {
      let scoreHeader = document.createElement('h3')
      scoreHeader.innerHTML = `${score} time(s) correct:`
      scoreHeader.setAttribute('data-score', score)
      scoreDiv.appendChild(scoreHeader)
    })
  }
  arrangeScores () {
    this.scoreRange.forEach((score) => {
      let cardsWithSameScore = this.cards.filter((card) => card.score === score)
      let frontsWithSameScore = []
      cardsWithSameScore.forEach((card) => { frontsWithSameScore.push(card.front) })
      let spanScores = document.createElement('ul')
      spanScores.innerHTML = frontsWithSameScore
      document.querySelector(`h3[data-score*="${score}"]`).appendChild(spanScores)
    })
  }
}

class Display {
  constructor () {
    this.game = new Game()
    this.asides = document.querySelectorAll('aside')
    this.asides.forEach((aside) => {
      // create hover effect on left side bar
      aside.addEventListener('mouseover', () => {
        aside.classList.add('show')
        aside.lastElementChild.classList.add('show')
        // add setTimeOut. Function which runs the above. Second argument is 300 or something. 
      })
      aside.addEventListener('mouseout', () => {
        aside.classList.remove('show')
        aside.lastElementChild.classList.remove('show')
      })
    })
    this.keyPressed = null
    this.cursorLocation = null
    window.addEventListener('keyup', (event) => {
      // Add listener for ArrowLeft, ArrowRight, h, and Enter to execute various functions
      this.keyPressed = event
      this.cursorLocation = event.path[0].classList[0]
      if (this.keyPressed.key === 'ArrowLeft' && this.cursorLocation !== 'input') {
        this.game.goToPrevious()
      } else if (this.keyPressed.key === 'ArrowRight' && this.cursorLocation !== 'input') {
        this.game.next()
      } else if (this.keyPressed.key === 'h' && this.cursorLocation !== 'input') {
        this.game.currentCard.showHint()
      } else if (this.keyPressed.key === 'Enter') {
        this.game.flip()
      }
    })
    this.hintButton = document.querySelector('.hint')
    this.hintButton.addEventListener('click', () => this.game.currentCard.showHint())

    this.flipButton = document.querySelector('.flip')
    this.flipButton.addEventListener('click', () => this.game.flip())

    this.nextButton = document.querySelector('.right')
    this.nextButton.addEventListener('click', () => this.game.next())

    this.prevButton = document.querySelector('.left')
    this.prevButton.addEventListener('click', () => this.game.goToPrevious())
  }
}

const display = new Display()

// add listeners to create hover with on keyboard shortcuts and
// Add media queries to be mobile friendly

// Figure out a way for the hint text to render as Bold and Red...
// test CSS, HTML, and JS in a code review thing
// write the README
// If you have time, start working on a media query:
// // Eliminate the shortcuts bar
// // Resize the Instructions div and move it to the top of the page
// // Resize the Score div and move it to the bottom of the page
// // Change both animations and listeners for the above
// // Resize the main boxes
// // Use smaller font sizes on everything
