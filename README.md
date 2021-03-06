# Star Wars RPG Game

### Overview
This star wars fight is a fun and interactive game where the hero fights the enemies. He wins when he defeats all enemies. He loses when he gets defeated by an enemy.

### Demo
[Click to watch the demo](https://guarded-woodland-81367.herokuapp.com).

### Technologies used
* HTML
* CSS
* Javascript
* Jquery

### Challenged faced
* How to pick hero and defender put them in the fighter arena?
* How to put together the logic for winning and losing?

### Solutions found
* Understanding how event listeners work and how DOM can be manipulated using JQuery helped solve the problem.
* Breaking down the code into functions helped put together the logic. 

### How it works

1. When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

	* The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

	* The player chooses an opponent by clicking on an enemy's picture.

	* Once the player selects an opponent, that enemy is moved to a `Fighting arena`.

	* The player will now be able to click the `attack` button.
		* Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
		* The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

2. The player will keep hitting the attack button in an effort to defeat their opponent.
	* When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

3. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

4. After the player wins or losess, he has the option to restart by clicking restart button.

#### Developed by Bhagya
