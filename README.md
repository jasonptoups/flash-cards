# Practice Hiragana with Flashcards

## Japanese Language Overview
Japanese Language has three writing systems: *Kanji*, *Hiragana*, and *Katakana*.
### *Kanji*
The most complicated scrip is called Kanji, and it is made up of thousands of characters borrowed from Chinese. While some changes have happened over the years, many people who can read and write in Mandarin find they can read and write in Japanese.

*Kanji* is used for formal documents, proper names, and certain terms. *Kanji* has traditionally been used for almost all words, but over time, it has fallen in popularity. 

### Hiragana
The second script is called Hiragana. Hiragana is a syllabary. It is similar to an alphabet, but each character makes up a syllable or whole sound. There are 46 base characters which together make up the sounds of the Japanese language. 

Hiragana originated in the 600s CE as simplified Chinese characters that stood for sounds rather than whole words. It further developed as a script to be used by women, who were not permitted higher education. 

In modern times, Hiragana has grown in popularity due to its simplicity. Today, many signs and printed materials in Japan will include the Hiragana for a Kanji in small text above or beside it. 

### Katakana
The third script is called Katakana. Katakana is almost identical to Hiragana but appears slightly different. It helps to think of Katakana as the italicized version of Hiragana. Katakana is used to write foreign words and add emphasis. 

## Practice Hiragana 
### Intent
The intent of this web app is to provide a simple environment of flashcards to practice the 46 Hiragana characters. While this does not give the learner access to all of Japanese language, it is a sufficient place to start. 

### Gameplay
The 26 Hiragana characters are loaded in as the front of each flash card. The back shows the sound written in English characters (called Romanji in Japanese). The answer section allows the learner to write what sound the character makes. Clicking Flip will allow the use to see the back of the card and find out if their guess was correct.

If the learner does not recognize the character, they can press the Hint button to get a helpful mnemonic to remember the character.

At the end, the game will automaticlly reshuffle the cards and move the ones that the learner got wrong to the top of the deck. The learner can also have the deck shuffled at any time by clicking the Re-shuffle

### Keyboard Shortcuts
To make gameplay easier, I added keyboard shortcuts for most functions. They are listed below:
Enter: Flips the card
Right Arrow: Goes to the next card
Left Arrow: Goes to the front of the card (if looking at the back) or the previous card
H: Displays the hint

There is no keyboard shortcut for Shuffle, since that should only be done infrequently. 

### Scoring
Each time you get a Hiragana character correct, the score on that character goes up by 1. Hovering on the Score tab on the left displays your score for each character, grouped by score. This is a helpful way to see which characters you know well and which you need help with. 

## Programming Background
### Languages used
HTML and CSS are used for the structure and styling, while vanilla JavaScript was used for all the functionality. The entire app runs in a single page, with no need to reload. 

### JavaScript
The JavaScript is all encased in 3 classes. The first class defines the FlashCards themselves. It also includes methods to show the front of the card, show the back, show the hint, check the answer, and clear the results and hint.

The second class is called Game and it defines the remaining logic for the whole game. It creates an array of 46 FlashCards (referencing a second JS file). It also uses an index to track where the learner is in the list of cards. It includes methods for flipping, going to the next card, going to the previous card, shuffling the deck, and checking and updating the scores, 

The third class is called Display and adds all the event listeners needed to interact with the game. The constructor creates an instance of the Game class. It adds click listeners to each of the buttons and keyevent listeners for the shortcuts. It also adds a mouseevent listener for the tabs on the left side. This class has no original methods but rather invokes ones defined in the previous classes.

## Acknowledgements
Thank you to Ali and James for teaching me everything I know and guiding me at sticking points.

Thank you to Berlitz Language Schools and JapanesePod101 for ideas and inspiration on mnemonics for each character.

Thank you to Unsplash photographer @kazuend [kazuend.jp](kazuend.jp) for providing a beautiful and lively image of Sakura viewing.



