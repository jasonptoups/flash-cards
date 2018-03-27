# flash-cards

## User Stories
### MVP
* User should encounter a website with preloaded flashcards for learning hiragana
* User should see characters and type in their guess for the sound
* The program should tell the user if they were right or wrong 
* User should be able to go to the next card or review the last one
* At the end, the program should tell the user which ones they know well and which they need to practice
* Each character should have a hint to help learn it. Using the hint counts as getting the sound wrong. 

### Extra Features
* Have a pretty landing page
* Color it in a japanese themed way
* Next time the user plays, the program should order the cards from most mistaken to least mistaken
* The program should somehow store score over time from the user. Not sure how to do that...
* The user should be able to go the other way: drawing the character based on the sound. The user should self grade themselves in this case. 

## Psuedocode
<!-- Landing page
  html 
    header: practice hiragana
    body: click to start

Instructions
  javascript
    event listener for enter. Display instruction text and hide the Enter
  CSS
    class for hidden
    class for visible -->

Flashcard
  javascript
    Classes:
      FlashCards
        name: text
        front: text/image
        back: text
        hint: text
        score: count of number correct
        Event listeners for submit, flip, previous, hint, and next card. 
        METHODS:
          flip.Flashcards (flip the flashcard)
          check.FlashCards (check if it's correct and change score)
          <!-- sort.FlashCards (resort based on order of score) -->
          next.Flashcards (go to next flashcard)
          previous.Flashcards (go to front)
          end.flipcards (check if the deck is done and show final score)
    Instances
      Create all the instances of the hiragana cards. Not sure how to do this efficiently. Probably just manual...

Steps:
1. write the html for the landing page
2. Write the CSS for the basic page
3. Write html and CSS for the instructions. 
    Take out the HTML and put it into a DOM innerText
    Keep the CSS, give it a unique class, and apply class hidden 
    Invoke the CSS classes when the event listener is trigered
4. Write the html and CSS for a basic flash card to make sure it works
    Do same as above
5.  Add listeners to the Enter and Next buttons
    Manipulate DOM to show instructions and then first flashcard (Tuesday)
5. Define the FlashCards class
    create constructor with variables and event listeners
    create methods to fire on events.  (Wednesday)
6. Create the Hiragana instance of the cards class
    Add each hiragana object to an array, I guess. (Thursday)
7. Refactor (Friday) 

Monday Steps:
1. Fix CSS to make prettier
2. Fix HTMl to make prettier
3. Ask about refactoring some of the text
4. Think about how to do the end...