/*function createBoardDOM() {
	const gameBoard = document.getElementById("game-board");
	let toggle = 0;

	for (let i = 7; i >= 0; i--) {
		const row = document.createElement('div');
		row.classList.add('row');
		setColor();

		for (let j = 0; j < 8; j++) {
			row.append(createCellDOM(j, i));
		}

		gameBoard.append(row);
	}

	function setColor() {
		toggle = !toggle;
		return (toggle == 0) ? 'white' : 'darkgray';
	}

	function createCellDOM(x, y) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.classList.add(setColor());
		cell.innerText = `(${x}, ${y})`;

		cell.dataset.x = x;
		cell.dataset.y = y;
	
		cell.addEventListener('click', () => {
			console.log(`(${cell.dataset.x}, ${cell.dataset.y})`);
		})


		cell.addEventListener('mouseover', (e) => {
			displayMovesDOM(e.target);
		})

		cell.addEventListener('mouseout', (e) => {
			clearMovesDOM(e.target);
		})
		
		return cell;
	}

}


function displayMovesDOM(cell) {
	const currentPosition = cell;
	currentPosition.classList.add('selected');

	const possibleMoves = calculatePossibleMoves(cell.dataset.x, cell.dataset.y);

	currentPosition.addEventListener('click', () => {
		displayPossibleMovesDOM(possibleMoves);
	})

}

function clearMovesDOM(cell) {
	const currentPosition = cell;
	currentPosition.classList.remove('selected');

	const possibleMoves = calculatePossibleMoves(cell.dataset.x, cell.dataset.y);

	clearPossibleMovesDOM(possibleMoves);
}

function displayPossibleMovesDOM(cells) {
	const possibleMoves = cells;
	possibleMoves.forEach(move => {
		const x = move[0];
		const y = move[1];

		const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

		cell.classList.add("possible");
	})
}

function clearPossibleMovesDOM(cells) {
	const possibleMoves = cells;
	possibleMoves.forEach(move => {
		const x = move[0];
		const y = move[1];

		const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

		cell.classList.remove("possible");
	})
}


/////////////////
/////////////////
/////////////////
/////////////////
/////////////////
/////////////////
/////////////////
/////////////////






function calculatePossibleMoves(startPos, endPos) {

	let allMoves = [
		Move([-1, 2]), Move([1, 2]),
		Move([2, 1]), Move([2, -1]),
		Move([-1, -2]), Move([1, -2]),
		Move([-2, 1]), Move([-2, -1])
	];

	return possibleMoves = allMoves
	.map(move => {
		move.xPos += startPos.xPos;
		move.yPos += startPos.yPos;
		return move;
	})
	.filter(move => {
		return move.xPos < 8 && move.xPos >= 0 && move.yPos >= 0 && move.yPos < 8;
	});

}

const Knight = (start) => {
	const possibleMoves = calculatePossibleMoves(start);
	return {start, possibleMoves};
};

const Move = ((start, previous) => {
	const previousPos = previous;
	const xPos = start[0];
	const yPos = start[1];

	return {previousPos, xPos, yPos};
});

function knightMoves(startPos, endPos) {
	const start = Move(startPos, null);
	const end = Move(endPos, null);

	const newKnight = Knight(start);



	console.log(newKnight.possibleMoves.filter(move => move.xPos == end.xPos && move.yPos == end.yPos));

	

	// Send in starting position to calculate possible moves, 
	// If none of the possible moves are equal to end position, 
	// Send in each child element into function to calculate children's possible moves
	// Repeat until endPos is found, and figure out search function to find it

}

knightMoves([3,3],[1,2]);


*/


const Board = (() => {
	const array = [];
	// Create array, fill 8 rows with 8 columns of Squares, alternating colors

	const populateBoard = (start, path) => {
		let toggle = 0;
		let startingPosition = start;

		const setColor = () => {
			toggle = !toggle;
			return (toggle == 0) ? '□' : '■';
		};

		for (let i = 7; i >= 0; i--) {
			const row = [];
			setColor();

			for (let j = 0; j < 8; j++) {
				// If i and j match any of possible moves, set color to that color

				let col;

				if (j == startingPosition[0] && i == startingPosition[1]) {
					col = Square(j, i, "▣"); //▥
					setColor();
				} else if ([j, i].every(coord => path.includes([coord]))) {
					console.log('yep');
					col = Square(j, i, "▥");
					setColor();
				} else {
					col = Square(j, i, setColor());
				}

				row.push(col);

			}

			array.push(row);
		}
		
	}

	const displayBoard = (start, possible) => {
		populateBoard(start, possible);
		for (let i = 0; i < 8; i++) {
			let row = "";
			for (let j = 0; j < 8; j++) {
				// If i and j are equal to knight's position, use this ascii: ▣ to place knight on board
				row += "   "+array[i][j].color;
			}
			row += "";
			console.log(row);
		}
	}

	return { displayBoard };

})();

const Square = (x, y, color) => {
	// Include x and y attributes, as well as color (black or white);
	return {x, y, color};
};

const Move = (x, y, parent) => {
	return {x, y, parent};
}

const Knight = (move) => {
	const root = move;

	const possibleMoves = (x, y) => {
		// Calculate possibleMoves based on starting x and y positions;
		let moves = [];

		const allMoves = [
			[2, 1], [2, -1],
			[-2, 1], [-2, -1],
			[1, 2], [-1, 2],
			[-1, 2], [-1, -2]
		]
		moves.push(...allMoves);

		moves.forEach(move => {
			move[0] += x;
			move[1] += y;
		})

		let result = moves.filter(move =>
			((move[0] < 8 && move[0] > -1) && (move[1] > -1 && move[1] < 8))
		);

		return result;
	};

	const createMove = (x, y, parent) => {
		return Move(x, y, parent);
	}

	return { root, possibleMoves, createMove };
}

function knightMoves(start, end) {
	// Check if start position and end position are already equal and return appropriately
	const startX = start[0];
	const startY = start[1];
	const endX = end[0];
	const endY = end[1];

	if (startX == endX && startY == endY) return console.log("No moves necessary");

	// Else, create a knight and root of knight
	const knight = Knight(Move(startX, startY, null));

	// Create empty queue to put children into and fill with starting possible moves
	const possibleMovesQueue = [];

	// Add initial possible move objects to queue;
	knight.possibleMoves(startX, startY)
	.forEach(move => {
		const moveObj = knight.createMove(move[0], move[1], knight.root);
		possibleMovesQueue.push(moveObj);
	});

	// while queue is populated, loop through each element and compare to end result

	while (possibleMovesQueue.length > 0) {
		const currentX = possibleMovesQueue[0].x;
		const currentY = possibleMovesQueue[0].y;

		// if current move is equal to end move, 
		if (currentX == endX && currentY == endY) {
			let end = possibleMovesQueue[0];
			let count = 0;

			// When move is found, need to make a stack of parents and console log them to the top and find the amount of moves it took to find the closest move;
			let movesStack = [];

			movesStack.push([end.x, end.y]);

			while (end.parent !== null) {
				movesStack.push([end.parent.x, end.parent.y]);
				end = end.parent;
				count++;
			}

			console.log('=> You made it in ' + count + (count == 1 ? " move! " : " moves! ") + "Here's your path:");
			for (let i = movesStack.length-1; i >= 0; i--) {
				console.log(movesStack[i]);
			}

			return;
		}

		// add current move's children to queue and pop current move off queue

		knight.possibleMoves(currentX, currentY)
		.forEach(move => {
			possibleMovesQueue.push(knight.createMove(move[0], move[1], possibleMovesQueue[0]));
		});

		possibleMovesQueue.shift();
	}

}

knightMoves([0,0], [7,7]);