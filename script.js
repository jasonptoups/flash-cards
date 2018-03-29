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
    this.cardDiv.style.backgroundColor = 'white'
    this.display.classList.remove('handwritten')
    this.display.style.fontSize = '100px'
  }
}

class Game {
  constructor () {
    this.cards = [
      new FlashCard('あ', 'a', 'an Apple with a stem'),
      new FlashCard('い', 'i', 'two I\'s side by side'),
      new FlashCard('う', 'u', 'man kicked in the stomach and flying sideways while saying \'Uuf\''),
      new FlashCard('え', 'e', 'Energetic ninja running away'),
      new FlashCard('お', 'o', 'ufO with an antenna'),
      new FlashCard('か', 'ka', 'KAr driving off a cliff'),
      new FlashCard('き', 'ki', 'old fashioned KEY'),
      new FlashCard('く', 'ku', 'beak of a KUku bird'),
      new FlashCard('け', 'ke', 'shape of a KEg'),
      new FlashCard('こ', 'ko', 'KOi fish swimming around each other'),
      new FlashCard('さ', 'sa', 'SAd face looking back at you'),
      new FlashCard('し', 'shi', 'SHIp\'s anchor'),
      new FlashCard('す', 'su', 'pregnant woman SOOn expecting'),
      new FlashCard('せ', 'se', 'two SAIling ships passing each other'),
      new FlashCard('そ', 'so', 'SEWing stitch'),
      new FlashCard('た', 'ta', 'looks literally like TA'),
      new FlashCard('ち', 'chi', 'CHEERleader mad at sa for being similar'),
      new FlashCard('つ', 'tsu', 'tsunami wave'),
      new FlashCard('て', 'te', 'dog\'s TAIl'),
      new FlashCard('と', 'to', 'TOe with a hangnail'),
      new FlashCard('な', 'na', 'someone frying tuNA'),
      new FlashCard('に', 'ni', 'looks like a KNEE'),
      new FlashCard('ぬ', 'nu', 'NOOdles with two chopsticks'),
      new FlashCard('ね', 'ne', 'sNAIl hiding behind a NAIl'),
      new FlashCard('の', 'no', 'NO entry sign'),
      new FlashCard('は', 'ha/wa', 'capital H with a lowercase A under it = HA'),
      new FlashCard('ひ', 'hi', 'smiling mouth saying hi hi hi'),
      new FlashCard('ふ', 'fu', 'nose smelling some FUmes'),
      new FlashCard('へ', 'he', 'pointing to HEaven'),
      new FlashCard('ほ', 'ho', 'HO spelled on its side and a line underneath'),
      new FlashCard('ま', 'ma', 'MAn wearing a MAsk'),
      new FlashCard('み', 'mi', 'like a musical note MI'),
      new FlashCard('む', 'mu', 'a pierced cow\'s nose that says MUUUU'),
      new FlashCard('め', 'me', 'same as nu but dropped some noodles and made a MEss'),
      new FlashCard('も', 'mo', 'koMOdo dragon with a long tail'),
      new FlashCard('や', 'ya', 'birds on a wiYA outside your YArd'),
      new FlashCard('ゆ', 'yu', 'Jesus fish but spelled in Greek YUsus'),
      new FlashCard('よ', 'yo', 'YO-YO dangling from a finger'),
      new FlashCard('ら', 'ra', 'RAbbit bouncing away'),
      new FlashCard('り', 'ri', 'looks like a RIver. Longer right stroke. '),
      new FlashCard('る', 'ru', 'RUdder of a ship turning leaving a wake'),
      new FlashCard('れ', 're', 'snake on the cross to REvive patients'),
      new FlashCard('ろ', 'ro', 'rear with a ship with less wake because it\'s being ROwed'),
      new FlashCard('わ', 'wa', ''),
      new FlashCard('を', 'wo', 'WOman walking across a street'),
      new FlashCard('ん', 'n', 'looks like a letter N')
      // second javascript file that has a traditional javascript object. Array of objects
      // Loop through the array of objects and create an instance of each object as a 
      // this.cards = myarray.map(item => new Flashcard (item.name, item.front) )
    ]
    this.index = 0
    this.currentCard = this.cards[this.index]
    this.cardDiv = document.querySelector('.card')

    this.hintButton = document.querySelector('.hint')
    this.hintButton.addEventListener('click', () => {
      this.currentCard.showHint()
    })

    this.flipButton = document.querySelector('.flip')
    this.flipButton.addEventListener('click', () => {
      this.flip()
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

  flip () {
    this.currentCard.checkAnswer()
    this.currentCard.showBack()
    this.cardDiv.style.background = "url('images/index-card.png')"
    this.cardDiv.style.backgroundSize = 'cover'
    this.currentCard.display.classList.add('handwritten')
    this.currentCard.display.style.fontSize = '140px'
  }

  next () {
    // increase the index by one and then clear and place new card
    this.index = this.index + 1
    this.currentCard = this.cards[this.index]
    this.checkIfAtEnd()
    this.clear()
    this.cardDiv.style.background = ''
    this.cardDiv.style.backgroundColor = 'white'
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
    this.asides = document.querySelectorAll('aside')
    this.asides.forEach((aside) => {
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
    this.game.flip()
  }
}

const display = new Display()

// add listeners to create hover with on keyboard shortcuts and 
// Add media queries to be mobile friendly
