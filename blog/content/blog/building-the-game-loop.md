---
title: Building The Wordle Game Loop
date: 2022-01-23T19:21:51.497Z
tags:
  - wordle
  - react
description: Creating a Wordle Clone, Part 2
---
Wordle has a simple game play loop. It can be broken down into several steps.

1. Guess a 5-letter word
2. Check guess against the solution

The logic for checking the guess against the solution is as follows:

1. If the guess is correct, end the game.
2. If the player is out of guesses, end the game.
3. If the game isn't over, show hints toward the solution.

The game loop is executed upon specific actions from the player. Meaning the game is entirely event based. There isn't any requirement that forces us to constantly update the game state besides when the player takes actions. This means we can easily translate this logic to an event based language or framework.

![Word Guess](/blog/img/screenshot-2022-01-23-174021.png "Word Guess")

This post is part 2 of a series in which I'm creating a Wordle clone from scratch. [View Part 1 here.](/blog/understanding-how-wordle-works/)

## Choosing a Framework

I chose [React](https://reactjs.org/) as the framework for this implementation as it makes it easy to maintain a state and update the state upon events from users. React provides the tools to build a small client-side application easily with minimal overhead. In addition, I wanted to include TypeScript as a first class citizen within the app. This gives us some good safeguards to ensure we're keeping strong typing in the implementation and guard rails against potential bugs. To style the application, I chose [TailwindCSS](https://tailwindcss.com/) which also gives us some easy tools and provides some nice features out of the box.

I grabbed the [TypeScript template of Create React App](https://create-react-app.dev/docs/adding-typescript/) and then [added Tailwind](https://tailwindcss.com/docs/guides/create-react-app) (I also added [Headless UI](https://headlessui.dev/) and [Hero Icons](https://heroicons.com/) for some flare). This established a solid baseline to get started.

**Note:** In many of the code examples I show below, I have stripped some parts of the code to simplify the display. This includes removing styling classes and other features I've included in the deployed game. The goal with my code below is to display the most concise parts that are critical to the functions of the game. 

## Representing the Game State

The core components of Wordle are the guess spaces and the keyboard. To construct the guess spaces, we need to construct a grid to manage the guessed letters as well as the hints for each space. We know that each letter in the guess spaces will have 4 hint states.

1. Default State (letter hasn't been guessed yet)
2. Contained in Solution (the yellow color hint)
3. Position Match in Solution (the green color hint)
4. No Match in Solution (the grayed out hint)

I chose to represent four states as flags. I established a type to define these flags.

```typescript
export type LetterState = {
  letter: string;
  containMatch: boolean;
  positionMatch: boolean;
  noMatch: boolean;
};
```

I represented the rows and columns with a two-dimensional array. Using the state management methods from React, I established it like so:

```typescript
const [guessMap, setGuessMap] = useState<LetterState[][]>([]);
```

In order to track the space the player intends to fill in, we can create a simple pointer that represents the coordinates of the space the letter should be placed. I default the pointer to (0,0) so it always points to the first position on initialization. When a letter is entered, I update the pointer to the next position. I will also update the pointer when a guess is submitted to the next row.

```typescript
const [mapPointer, setMapPointer] = useState<[number, number]>([0, 0]);
```

One crucial piece of the game is the keyboard display. I represent this in code as an array of letters. The keyboard also displays hints in the same way the guess grid does. I will reuse the `LetterState` type created earlier.

```typescript
const [letterOptions, setLetterOptions] = useState<LetterState[]>([]);
```

Finally, I added a state to track the solution. I will set this to an actual word when the app initializes.

```typescript
const [solution, setSolution] = useState<string>("");
```

I now have the states required to run the game. From here, it's a matter of initializing the app, processing user input, and giving the user feedback.

## Initializing the Game

First, we need to generate the guess grid and the keyboard. I created several defaults that I will use to initialize the game as well as use to perform resets of the game state. The first one is the default letter state created like so:

```typescript
export const DefaultLetter: LetterState = {
  letter: "",
  containMatch: false,
  positionMatch: false,
  noMatch: false,
};
```

I decided the simplest way to generate a keyboard would be to create an array of letters in alphabetical order and map over it to create a `LetterState` array. First, I established a default letter state. I also decided to store the generated array as a `const` object to let me use it again later for resetting the game.

```typescript
const alphabet = ["A", "B", "C", "D", ... , "Z"];
                  
const DefaultLetterOptions = alphabet.map((letter) => {
  return {
    ...DefaultLetter,
    letter: letter,
  };
});

setLetterOptions(DefaultLetterOptions);
```

I'm using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to copy all the properties from `DefaultLetter`, and then setting the letter from each iteration of the map.

Then, to establish the guess grid, I initialized 6 rows with 5 default letters each. 

```typescript
const DefaultGuessMap = [...Array(6).keys()].map(() => {
  return [
    DefaultLetter, 
    DefaultLetter, 
    DefaultLetter, 
    DefaultLetter, 
    DefaultLetter
  ];
});

setGuessMap(DefaultGuessMap);
```

`[...Array(6).keys()]` allows me to generate an array with six indexes and then I iterate over them to set them with an array of 5 default letters.

The final component is choosing the solution the player must guess. I noted in the first part of this series, Wordle has an array of possible solutions it chooses from hard coded when the game initializes. So, choosing a solution at random is as easy as selecting a random index from the array of possible solutions.

```typescript
export const validWords = ["cigar", "rebut", "sissy", "humph", ... ];
                           
const randomWord = validWords[Math.floor(Math.random() * validWords.length)];

setSolution(randomWord.toLocaleUpperCase());
```

First, I perform some math operations to ensure we generate a random number within the range of `validWords`. Then set the solution. I convert the solution to uppercase to make our matching logic consistent.

## Displaying the Game State

Now that we have the defaults initialized, I use Reacts templating to display the game state. As the game state updates, React will automatically update the display.

First, we can represent the guess grid as a nested loop.

```jsx
{guessMap.map((guessRow, row) => (
  <div key={row}>
    {guessRow.map((letterState: LetterState, index) => (
      <div key={row + "-" + index}>
          {letterState.letter}
      </div>
    ))}
  </div>
))}
```

Then we can use the `LetterOptions` to generate the keyboard the player will use to spell words. I also include two additional buttons for deleting a letter and submitting a guess.

```jsx
{letterOptions.map((letterState: LetterState, index) => (
  <button key={index} onClick={() => onSelect(letterState.letter)}>
    {letterState.letter}
  </button>
))}
<div>
  <button title="Backspace" onClick={onBackspace}>
    <BackspaceIcon className="h-10 w-10" />
  </button>
  <button title="Guess Word" onClick={onSubmit}>
    Guess Word
  </button>
</div>
```

The primary elements of the game state are now displayed. From this point, I can take input from the player. There are two possible input types that we can handle that will affect the game state.

* We can accept letters via the method `onSelect`. This will update the guess map with the selected letter.
* We can delete letters from the guess via the method `onBackspace`. This will delete the last letter from the guess array.
* We can submit guesses via the method `onSubmit`. This will process the current guess map row to see if the player guess is correct. From this method, we will generate the hints that are displayed on the letter.

In the next post, I will cover processing the input and displaying hints to the player.