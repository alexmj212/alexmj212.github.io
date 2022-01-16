---
title: Understanding How Wordle Works
date: 2022-01-16T18:10:38.086Z
tags:
  - wordle
  - react
description: Creating a Wordle Clone, Part 1
---
[Wordle](https://www.powerlanguage.co.uk/wordle/) is a simple word guessing game. The goal of the game is to attempt to guess a 5 letter word. The word is chosen at random from a dictionary. You have 6 attempts to guess the word. As you submit guesses, letters will highlight to hint at the goal word. You win the game by using the hints the game display based on the letters you chose.

The hints have three states:

* A letter you guessed is in the goal word but in the wrong position.
* A letter you guessed is in the goal word and in the correct position.
* A letter you guessed is not in the goal word at all.

![Wordle](/img/screenshot-2022-01-16-163037.png "Wordle")

## Creating a Wordle Clone

In this series of posts, I will dive into the mechanics of Wordle and understand specifically how it works and attempt to recreate it. In this analysis, I will cover the design, the user experience, and the implementation of Wordle. I will not directly copy the code used to create Wordle. Instead, I will walk through the steps I took to recreate the mechanics of the game. My version will differ from the original but nearly all of the aspects of the game will be implemented.

You can view my version here: <https://alexmj212.dev/word-guess/>

## What Makes Wordle Viral

Wordle gained popularity not because of it's complexity or uniqueness. The appeal of Wordle is the ability to share your results. As people posted their results to social media, the popularity took off. The results of your puzzle are generated a grid of emoji that mirrors your list of guesses. In this case, 211 is the puzzle number and the 5/6 represents the number of attempts.

```
Wordle 211 5/6

🟨⬛⬛⬛🟨
🟩⬛🟨⬛⬛
🟩🟨⬛🟨⬛
🟩🟩⬛🟨⬛
🟩🟩🟩🟩🟩
```

Part of what makes the sharing interesting is that it [tells a story](https://www.theverge.com/tldr/22881995/wordle-emoji-results-auto-generated-tell-a-story) about your struggle with guessing the word. Your emoji grid is personal to your path to solving the puzzle. In addition, sharing your emoji grid doesn't spoil the daily puzzle for others.

Sharing the puzzle results is not the entirety of why it took off. Because every user gets the same puzzle, users are able to compare their results to others in a competitive manner. Further, only one puzzle can be played per day. These means everyone is sharing the same experience and creates a scarcity and value in the specific puzzle for that day. If users could infinitely try puzzles, the value in that specific result decreases and makes the sharing of the results less appealing to others.

All these effects combined allowed this game to take off.

### You Can Lie About Your Success, But Would You?

The emoji grid is simply text that can be copied and pasted to any platform. There is no limitation to your modification of it. You can simply lie and post 6 green squares, a perfect score. Further, because your game data isn't validated with a remote server, it is easy to manipulate your results to make it appear as if you are optimally guessing every time.

What keeps players honest is that it's obvious when your results are manipulated and the stakes in solving the puzzle are low. You can create an emoji grid and make it appear as though you solved in two guesses. But lying about your guessing abilities doesn't actually get you anything. A perfect score doesn't increase your clout or move you up on the leader board. Because your accuracy isn't the primary goal of Wordle, it is your journey to the solution. 

## Wordle Mechanics

The rules of Wordle are very simple and presented in a dialog upon opening the game for the first time. I won't dive into the optimal strategies for solving your Wordle puzzle. Instead, I want to examine the implementation from a technical perspective.

![Wordle rules](/img/screenshot-2022-01-16-162217.png "Wordle rules")

### Game State

Wordle is primarily a client-side game. This means that the entire game takes place within the browser in a JavaScript application on the users device. It is not communicating with a server to determine the daily puzzle nor is it saving your results to the cloud for recall. This means that if you play Wordle in a private browser session, you will be able to attempt the daily puzzle again. The entire game state is preserved in memory at runtime or in local storage. 

![Wordle Puzzle #211](/img/screenshot-2022-01-16-145020.png "Wordle Puzzle #211")

```json
{
  "boardState": ["rents", "shred", "slurs", "soils", "solar", ""],
  "evaluations": [
    ["present", "absent", "absent", "absent", "present"],
    ["correct", "absent", "present", "absent", "absent"],
    ["correct", "present", "absent", "present", "absent"],
    ["correct", "correct", "absent", "present", "absent"],
    ["correct", "correct", "correct", "correct", "correct"],
    null
  ],
  "rowIndex": 5,
  "solution": "solar",
  "gameStatus": "WIN",
  "lastPlayedTs": 1642360854367,
  "lastCompletedTs": 1642360854363,
  "restoringFromLocalStorage": null,
  "hardMode": false
}
```

Upon every update of the game state, the local storage is updated as well. This ensures that if you step away from guessing the daily puzzle (i.e. close the browser), you can resume your game if you return to the page. The game also maintains data about your previous puzzles. This includes a win count, win streak, and a distribution of the number of attempts it took you to solve the puzzle.

![Wordle Statistics](/img/screenshot-2022-01-16-162606.png "Wordle Statistics")

```json
{
  "currentStreak": 1,
  "maxStreak": 1,
  "guesses": { "1": 0, "2": 0, "3": 1, "4": 0, "5": 1, "6": 0, "fail": 0 },
  "winPercentage": 100,
  "gamesPlayed": 2,
  "gamesWon": 2,
  "averageGuesses": 4
}
```

### Wordle Dictionaries

As you attempt guesses, the guess is validated against two separate dictionaries. The dictionary from which Wordle selects the daily puzzle contains 2316 words in random order. A puzzle is selected daily by simply counting the days since the game was initially released. This means that you could potentially predict the puzzle for the next day by looking at which word comes next in the dictionary.

```javascript
const dailyPuzzleWords = [
  "cigar",
  "rebut",
  "sissy",
  "humph",
  "awake",
  ...
]
```

When a user attempts a guess, there is a second dictionary of about 10,000 words that it checks against. This second dictionary acts as a validation for "real" words. This means that you can guesses must be a "real" words. This list is in alphabetical order. Because the validation dictionary contains many more words than the puzzle dictionary, it is possible that a guess could never be the one of the daily puzzles. It also ensures that guesses such as "AAAAA" are not allowed.

```javascript
const validWords = [
  "aahed",
  "aalii",
  "aargh",
  "aarti",
  "abaca",
  ...
]
```

Once your guess is determined to be in either dictionary, it then performs some string comparisons to determine if your letters are matched to the puzzle solution. Upon identifying an accurate letter, it shows a hint to the user how accurate that letter is in relation to the solution. There are four states that a letter can be in:

* A letter has not been guessed and defaults to a gray background.
* A letter has been guessed but isn't in the solution represented by a dark background.
* A letter is in the solution but it's in a different position from your guess indicated by a yellow background.
* A letter is in the exact position as the solution and is highlighted in green.

## Why Does Wordle Show a Keyboard?

When I examined the user experience of Wordle, my first question was why does it present an in-browser keyboard? If you're in a desktop environment, you likely already have a keyboard attached to your device. If you're playing in a mobile or tablet environment, there is a keyboard built into the operating system to allow for input. There are several important reasons why Wordle presents its own keyboard.

![Wordle Keyboard](/img/screenshot-2022-01-16-142239.png "Wordle Keyboard")

### Limiting Input

The Wordle keyboard actually helps simplify the game from a technical perspective. It limits the potential input options for the game. Wordle operates as simply as it does because its dictionaries only contain the standard 26-letter English alphabet. Limiting the input the options presented makes the character input easier to understand. Obviously a standard keyboard has more than 26 keys. By limiting the selection, you signal to the user the only available options while also reducing the complexity of word validation.

### Mobile Device Input

On a device with a physical keyboard, Wordle does accept keyboard input. Meaning, that you can type and submit guesses without the built-in keyboard. However, on a mobile device, the operating system keyboard does appear. Usually mobile device keyboards only appear when a prompted by an input field. So instead of having to manager the operating system keyboard appearance, the in-browser keyboard provided by Wordle suffices.

### Preserving Hints

The second reason is actually critical to playing the game. The word you guessed is highlighted with hints about letter position. Those hints are also displayed on the in-browser keyboard. Each letter on the keyboard also reflects the hints and preserves hints as you progress. This ensures that you can continue to make more accurate guesses because you have a way to track which letters you've already guessed.

## What's Next

Now that the game itself has been covered, we can dive into creating our own version.