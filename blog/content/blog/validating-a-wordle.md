---
title: Validating A Wordle
date: 2022-02-07T04:07:36.666Z
tags:
  - wordle
  - react
description: Creating a Wordle Clone, Part 3
---
This post is part of a series I'm writing to analyze how Wordle works and to construct a clone. View the other parts here:

1. [Understanding How Wordle Works](https://alexmj212.dev/blog/understanding-how-wordle-works/)
2. [Building The Wordle Game Loop](https://alexmj212.dev/blog/understanding-how-wordle-works/)

When a player submits a guess to Word Guess, the game performs some string manipulation to verify the word against the solution. Each letter of the guessed word is tracked separately in addition to the full word. This is to verify the hints that should be set or if the guess is correct entirely.

![Word Guess validation message example](/blog/img/screenshot-2022-02-07-013532.png "Word Guess validation message example")

## Representing Letter Hints

Much of this logic is dependent on the object structure I chose to represent the game state and how I'm tracking each letter in the guess grid. First, we start with the `LetterState`. Each letter within the guess map and the keyboard is presented as this object.

```typescript
export type LetterState = {
  letter: string;
  containMatch: boolean;
  positionMatch: boolean;
  noMatch: boolean;
};
```

Each letter has several properties that are used to track and display hints. Each of the hint types is represented here as a property with the `boolean` type. For example, when a letter is verified to be within the word but in the wrong position, I set the `containMatch` to `true`. If a letter is a position match, the `containMatch` and the `positionMatch` will be set to true; a letter in the correct position always means that the letter is contained in the solution as well. However, this slightly differs for each representation of the hints for the player.

```typescript
const [guessMap, setGuessMap] = useState<LetterState[][]>([]);
const [letterOptions, setLetterOptions] = useState<LetterState[]>([]);
```

I have two separate React states that represent each component of the game. The `guessMap` is a two-dimensional array of `LetterState`. The first dimension represents the row of the guess, and the second dimension represents each letter of the guess.

The `letterOptions` is a single-dimension array of `LetterState`. This tracks the keyboard display which allows displays the highest value hint to the player. More on hint value below.

I can construct the guessed word by taking the `guessMap` in combination with the `mapPointer` and map the `LetterState` to a flat array of strings and then join them.

```typescript
const guessedWord = guessMap[mapPointer[0]].map((letter) => letter.letter).join("");
// Step 1: Take the current guess row and map each letter to a flat array
//    [{ letter: "G", ...}, { letter: "U", ...}, ... ] => ["G", "U", "E", "S", "S]
// Step 2: Join all the letters to form a single string:
//    ["G", "U", "E", "S", "S] => "GUESS"
```

### Ranking the Value of Hints

Hints are displayed in two ways. First, hints are displayed in the guess map representing the accuracy of each letter from the guess. Second, hints are shown on the keyboard as the highest value hint for that unique letter. The hints for the guess map and the keyboard are tracked separately to provide a variety of information that helps the player make more informed guessed.

The value of each hint is the usefulness of that hint to the player working towards the solution. Below is all possible hint states ordered from lowest value to highest value and their `LetterState` representation. 

**Unselected** - the letter hasn't been used in a guess.

```typescript
const unselectedLetter: LetterState = {
  letter: "A";
  containMatch: false;
  positionMatch: false;
  noMatch: false;
};
```

**No Match** - the letter isn't in the solution word.

```typescript
const noMatchLetter: LetterState = {
  letter: "A";
  containMatch: false;
  positionMatch: false;
  noMatch: true;
};
```

**Contains Match** - the letter is contained in the solution.

```typescript
const containMatchLetter: LetterState = {
  letter: "A";
  containMatch: true;
  positionMatch: false;
  noMatch: false;
};
```

**Position Match** - the letter is a position match to the solution.

```typescript
const positionMatchLetter: LetterState = {
  letter: "A";
  containMatch: true;
  positionMatch: true;
  noMatch: false;
};
```

The position match is the most valuable hint because it is a direct reveal to the solution. Without the position match, the contain match doesn't immediately eliminate the uncertainty of that letter's position. No match is a hint from the opposite direction, avoid this letter entirely in future guesses because it is not part of the solution. Unselected represents the remaining pool from which you can construct guesses, they may or may not be in the solution.

## Validate A Guess

Once the player has entered five letters, I perform checks to verify the accuracy of their guess. The first check is simply a validation against an approved word list. In previous posts, I mentioned that Wordle actually has two word lists from which it validates guesses, a list of all valid 5-letter words, and list of words to use as puzzles. As part of the validation, I check that the guess word exists in either of the lists before proceeding. I provide to the player that the word they attempted to submit is not a valid guess. This mostly filters out junk guesses like "AAAAA" or "ABCDE".

The second validation I perform is a check to prevent duplicate words. The player can actually hurt their chances of finding the solution if they waste an attempt guessing the same word again. I provide a warning and stop validation if the word is already guessed.

Those validations look like this:

```typescript
if (guessWords.includes(guessedWord) || validWords.includes(guessedWord)) {
  // Ensure the word is contained within all the possible words
  if (previousGuesses.includes(guessedWord)) {
    // Check if word has already been tried
    toast.warn(`You already tried ${guessedWord}.`);
  } else {
    // Valid guess, proceed to generate hints
    validateWord(guessedWord);
  }
} else {
  // Not a valid word
  toast.warn(`${guessedWord} is not a word!`);
}
```

If the guessed word passes these checks, then I begin compiling the hints for each letter.

For each letter in the guess, I perform a serious of checks to set the `containMatch`, `positionMatch`, or `noMatch` appropriately. As mentioned above, we must track the hints for each letter in the guess map and the keyboard separately. First, I grab the current state of the letter we're verifying from each.

```typescript
// Loop over array of letter from the guessed word
guess.forEach((letter, index) => {
  // Search method for finding keyboard letter to be updated
  const keyboardLetter = letterOptions.find((letterOption: LetterState) => letterOption.letter === letter);
  const guessMapLetter = guessMap[mapPointer[0]][index];
  ...
})
```

Then, after retrieving the current states, I check if this letter is contained within the solution at all and set the `containMatch` to `true`. If the letter isn't contained in the solution at all, I set the `noMatch` to `true`.

```typescript
guess.forEach((letter, index) => {
  ...
  // Check if letter is contained in goal word
  if (solution.indexOf(letter) >= 0) {
    guessMapLetter.noMatch = false;
    guessMapLetter.containMatch = true;
    keyboardLetter.containMatch = true;
    ...
  } else {
    // Gray out letter from keyboard if no match is found for the letter
    guessMapLetter.noMatch = true;
    keyboardLetter.noMatch = true;
  }
  ...
})
```

If the letter is contained in the word, I must then check if it's in the correct position. I split the solution word into each individual letter and check if the current letter's index matches the solution letter's index. If there is a match, I set `positionMatch` to `true`.

```typescript
 guess.forEach((letter, index) => {
  ...
  // Check if letter is contained in goal word
  if (solution.indexOf(letter) >= 0) {
    ...
    // Check if letter matches the position
    if (solution.split("")[index] === letter) {
      guessMapLetter.positionMatch = true;
      keyboardLetter.positionMatch = true;
    }
  }
  ...
})
```

And that's it for validation! This logic works great for the first guess from a fresh game. However, an issue comes up if I submit a second guess.

## Duplicate Letters and Hint Accuracy

How can you handle a letter hint that should display an increased value? For example, if the letter "A" was contain matched in the first guess, but positioned matched in the second guess, how do you display that to the player? Conversely, what if the first guess had the letter "A" positioned matched but the second guess was only a contain match? Additionally, we must also track the occurences of each letter to ensure we're not showing more of less hints per the number of duplicate letters.

In this example, you can see the "D" in the first guess shows a contain match. Then in the second guess, the "D" is used twice. However, the hints accurately display that the first D doesn't show a contain match because the second one is a position match. We need to handle these hint situations accurately, otherwise the player may be misled in the occurences of specific letters.

![Word Guess hints for multiple letters example](/blog/img/screenshot-2022-02-07-012424.png "Word Guess hints for multiple letters example")

I need to ensure that a letter in the guessed word is accurately accounting for the contain match, position match, and the number of occurrences of each letter. This is important in the guess map but not important for the keyboard. The keyboard always displays the highest value hint achieved by the player. It doesn't need to track duplicate letters or the position of the letter.

First, I want to count the number of duplicate letters in the guessed word and the solution. Then I can compare them to see if I need to perform additional checks. I chose to use a regular expression for counting the number of matching letters. I defined a simple regular expression for the current letter I'm examining. I then used that regular expression match against the guessed word and the solution.

```typescript
// regex for finding occurrences of the current letter
const dupeLetterMatch = new RegExp(letter, "g");
// count occurrences of letter in guess word, 0 if none
const guessOccurenceCount = guess.match(dupeLetterMatch)?.length ?? 0;
// count occurrences of letter in goal word, 0 if none
const solutionOccurenceCount = solution.match(dupeLetterMatch)?.length ?? 0;
```

Then, if the user guessed multiple identical letters, but the solution contains less duplicates, the hint should accurately reflect that for each letter's hint in the guessed word. To reflect this hint accurately, I set the `containMatch` to `false`. I only perform this however, if this not the first occurence of this letter in the guess word.

Effectively, I am retroactively turning off hints in the guess map for multiples of the same letter to ensure the hints are counted accurately in addition to being displayed accurately.

```typescript
// If the guess contains more occurrences than the goal and it's not the first time the letter was guessed, remove hint
if (guessOccurenceCount > goalOccurenceCount && guess.indexOf(letter) < index) {
  guessMap[mapPointer[0]]
    // retrieve previous duplicate letters that come before this index
    .filter((guessLetter, filterIndex) => letter === guessLetter.letter && filterIndex < index)
    // disable their hint
    .forEach((guessLetter) => (guessLetter.containMatch = false));
}
```

Then, I want to ensure that if the position matches on a duplicate letter that I don't show hints on the other duplicates. Especially if the solution only contains one copy of the letter.

I use the [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method here which returns true if some of the values match the condition I provide. The condition I'm looking for is if the letter is in the guess and if the letter's `positionMatch` is `true`. I set the `containMatch` to `false`. This ensures that a contain match is removed if the player found the position match later on.

```typescript
// If the guess already has a position match, hide hints for duplicate letter after
if (guessMap[mapPointer[0]].some((guessLetter) => letter === guessLetter.letter && guessLetter.positionMatch)) {
  guessMapLetter.containMatch = false;
}
```

That completes all the validation and hint display. We are now accurately displaying hints for the `containMatch`, `positionMatch`, and `noMatch` states while also taking multiple identical letters into account.

## Showing the Player Their Hints

With the hint states fully constructed, we can now display them to the player.

Up until this point, we haven't just done a simple check to see if the guessed word matches the solution. We could check this before we perform any validation. Why don't we skip the checks if the player's guess was correct?

I still want to show the fully position matched guess to the user. The checks are necessary for that positive feedback to tell the player they made an accurate guess. Additionally, Wordle generates an emoji grid for the player to share, if the last line of the emoji grid does not contain 5 green squares, it's clear if the player finished the puzzle.

```typescript
// Success
if (guess === solution) {
  setShowSuccess(true);
  clearError();
  return;
}
```

If the player didn't manage to guess the word correctly and they still have guesses available, we just move them to the next line and continue playing.

```typescript
// No success, next line
if (mapPointer[0] < guessMap.length) {
  setMapPointer([mapPointer[0] + 1, 0]);
  clearError();
}
```

And if the player is out of guesses, we end the game and reveal the word.

```typescript
// Out of guesses
if (mapPointer[0] === guessMap.length - 1) {
  setShowFail(true);
  clearError();
  return;
}
```

Last but not least, I set the keyboard and guess map to the updated values to show the player an accurate game state.

```typescript
// Update keyboard
setLetterOptions([...letterOptions]);
// Update guess map
setGuessMap([...guessMap]);
```

In the next part, I will go over additional features I added to my version of the game that aren't present in the original version of Wordle.