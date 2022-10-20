# battleship
An application that lets you play the Battleship board game versus a rudimentary AI.

The goal of creating this project for The Odin Project curriculum was to learn to make complex webpack applications that included testing for individual modules. This was my first attempt at integrating and using the Jest testing framework on a project.

The application starts by collecting a username for the player to assign as the name in gameBoard object that tracks the board state.


![Battleship - Logon Gif](https://user-images.githubusercontent.com/96889143/196832463-beb2ea6a-a0a8-451b-9ac4-e331d58c7fa7.gif)


Once the game has started, the player is able to place down their ships on their board to the left.


![Battleship - Place Ships Gif](https://user-images.githubusercontent.com/96889143/196832718-fb7596dd-205a-4b2a-a0c6-52d2fd3c7036.gif)


A button at the top of the screen allows players to switch the orientation of their ship.


![Battleship - Orientation Gif](https://user-images.githubusercontent.com/96889143/196832975-bce69813-915b-433c-a072-f6efdfd5b221.gif)


After the ships have been placed, the player can procede with clicking on the computer's side of the board to attempt to hit their ships. A red peg indicates a hit, while a white peg a miss. The computer will respond immediately with an attack on your board, which you can see indicated. This continues until the player or computer sink all their enemies ships.


![Battleship - Attacking Gif](https://user-images.githubusercontent.com/96889143/196833425-6196b475-7360-4527-a564-cedbaed78d4b.gif)


After all ships have been sunk for either the player or computer, the opposing party declares victory. A modal pops up indicating who has won the game.


![Battleship - Victory Gif](https://user-images.githubusercontent.com/96889143/196833527-27955157-111d-45bd-90e5-30ae99104557.gif)


