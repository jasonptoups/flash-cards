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
    }
  }

  showHint () {
    // make the hint visible
    this.hintText.innerHTML = this.hint
    this.gameEnd.style.display = 'none'
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
    this.index = 0
    this.currentCard = this.cards[this.index]
    this.highestScore = 0
    this.scoreRange = []
    this.cardDiv = document.querySelector('.card')
  }
  flip () {
    // flip card and check answer
    this.currentCard.checkAnswer()
    this.currentCard.showBack()
    this.cardDiv.classList.add('shadow')
    this.currentCard.display.classList.add('handwritten')
    this.currentCard.display.style.fontSize = '140px'
    this.currentCard.gameEnd.style.display = 'none'
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
    this.cardDiv.classList.remove('shadow')
    this.currentCard.showFront()
  }
  checkIfAtEnd () {
    // shuffle and sort by score if at end. Otherwise, remove end-game text
    if (this.index === this.cards.length) {
      this.shuffleAndSort()
    } else {
      this.currentCard.gameEnd.style.display = 'none'
    }
  }
  shuffleAndSort () {
    // shuffle cards randomly then order by score
    this.cards.sort((a, b) => 0.5 - Math.random())
    this.cards.sort((a, b) => a.score - b.score)
    this.index = 0
    this.currentCard = this.cards[this.index]
    this.currentCard.gameEnd.style.display = 'block'
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
    // grab the highest score of all the cards and set the score range from 0 to highest score
    if (this.highestScore < Math.max(...this.cards.map((i) => i.score))) {
      this.highestScore = Math.max(...this.cards.map((i) => i.score))
      this.scoreRange = []
      for (let i = this.highestScore; i > -1; i--) {
        this.scoreRange.push(i)
      }
    } else {}
  }
  addScoreHeaders () {
    // for each score possible (0 to highest score), create a header in the scores box
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
    // place all the hiragana characters with each score under their appropriate header
    this.scoreRange.forEach((score) => {
      let cardsWithSameScore = this.cards.filter((card) => card.score === score)

      let frontsWithSameScore = []
      cardsWithSameScore.forEach((card) => { frontsWithSameScore.push(card.front) })
      // // the above can be expressed in one line, also
      // let frontsWithSameScore = cardsWithSameScore.map(card => card.front)

      let spanScores = document.createElement('ul')
      spanScores.innerHTML = frontsWithSameScore
      document.querySelector(`h3[data-score*="${score}"]`).appendChild(spanScores)
    })
  }
}

class Display {
  // You could move this class into another file to reduce the number of lines of code in this file.

  // If you wanted them to be more independent of one another, you could then add a parameter to this class' constructor that would take a Game instance as an input, so you wouldn't have to create a new instance of a Game in this class' constructor

  // Another approach involves inheriting from Game, calling super() and then changing all of your references to this.game.methodName() to this.methodName()
  constructor () {
    this.game = new Game()
    this.asides = document.querySelectorAll('aside')
    this.asides.forEach((aside) => {
      // create hover effect on left side bar
      aside.addEventListener('mouseover', () => {
        aside.classList.add('show')
        aside.lastElementChild.classList.add('show')
      })
      aside.addEventListener('mouseout', () => {
        aside.classList.remove('show')
        aside.lastElementChild.classList.remove('show')
      })
    })
    this.keyPressed = null
    this.cursorLocation = null

    // You could move the callback function to .addEventListener into a instance method defined on the class, like this.handleKeyUp, and then reference it like

    // window.addEventListener('keyup', this.handleKeyUp)
    // handleKeyUp (event) {
    //   this.keyPressed = event.key
    //   this.cursorLocation = event.path[0].classList[0]
    //   if (this.keyPressed === 'ArrowLeft' && this.cursorLocation !== 'input') {
    //     this.game.goToPrevious()
    //   } else if (this.keyPressed === 'ArrowRight' && this.cursorLocation !== 'input') {
    //     this.game.next()
    //   } else if (this.keyPressed === 'h' && this.cursorLocation !== 'input') {
    //     this.game.currentCard.showHint()
    //   } else if (this.keyPressed === 'Enter') {
    //     this.game.flip()
    //   }
    // }

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

    // For this refactor approach below, you could change classNames to match method names. Hint is a little less descriptive of a method name though, additionally, you'd have to change the prevButton property to backButton for this to work
    // You'd also have to refactor showHint to be in the gameClass, which possibly undermines the way you were thinking about what is handled by which class

    // let methods = [ 'hint', 'flip', 'next', 'back']
    // methods.forEach(method => this.game[`${method}Button`].addEventListener('click', this.game[method]))

    // This is possibly less readable than your approach here, and you may feel it would not be worth it

    this.hintButton = document.querySelector('.hint')
    this.hintButton.addEventListener('click', () => this.game.currentCard.showHint())

    this.flipButton = document.querySelector('.flip')
    this.flipButton.addEventListener('click', () => this.game.flip())

    this.nextButton = document.querySelector('.right')
    this.nextButton.addEventListener('click', () => this.game.next())

    this.prevButton = document.querySelector('.left')
    this.prevButton.addEventListener('click', () => this.game.goToPrevious())

    this.shuffleButton = document.querySelector('.shuffle')
    this.shuffleButton.addEventListener('click', () => {
      this.game.shuffleAndSort()
      this.game.next()
      this.game.currentCard.gameEnd.style.display = 'block'
    })
  }
}

const display = new Display()
