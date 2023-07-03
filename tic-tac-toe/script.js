var currentPlayer = 'x';
var grid = Array(9).fill('');
var hasEnded = false;

document.addEventListener('DOMContentLoaded', () => {
	let board = document.createElement('div');
	let message = document.createElement('h3');
	message.innerHTML = `Current player: ${currentPlayer}`;
	document.body.appendChild(message);
	board.classList.add('board');

	let button = document.createElement('button');
	button.onclick = () => {
		currentPlayer = 'x';
		grid = Array(9).fill('');
		hasEnded = false;
		resetBoard();
		message.innerHTML = `Current player: ${currentPlayer}`;
	};

	button.innerHTML = 'Reset';

	document.body.appendChild(board);
	document.body.appendChild(button);

	resetBoard();
});

const resetBoard = () => {
	const board = document.querySelector('.board');
	if (!board) return;
	board.innerHTML = '';
	for (let r = 0; r < 3; r++) {
		let row = document.createElement('div');
		row.classList.add('row');
		for (let c = 0; c < 3; c++) {
			let col = document.createElement('div');
			col.classList.add('col');
			const id = 3 * r + c;
			col.innerHTML = `<p id=${id}></p>`;

			col.addEventListener('click', () => takeTurn(id));

			row.appendChild(col);
		}
		board.appendChild(row);

		const button = document.querySelector('button');
		if (button) button.classList.add('hide');
	}

	return board;
};

const takeTurn = (index) => {
	let message = document.querySelector('h3');
	let el = document.querySelector(`[id="${index.toString()}"]`);
	if (grid[index] !== '' && !hasEnded) {
		if (message) message.innerHTML = 'Choose another element.';
	} else {
		grid[index] = currentPlayer;
		if (el && !hasEnded) {
			el.innerHTML = currentPlayer;
			checkWinner();
		}
		if (hasEnded) return;
		currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
		if (message) message.innerHTML = `Current player: ${currentPlayer}`;
	}
};

const checkWinner = () => {
	const perms = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let message = document.querySelector('h3');

	for (let i = 0; i < perms.length; i++) {
		const row = perms[i];

		if (
			grid[row[0]] !== '' &&
			grid[row[1]] === grid[row[0]] &&
			grid[row[2]] === grid[row[0]]
		) {
			if (message) message.innerHTML = `Winner is ${grid[row[0]]}`;
			hasEnded = true;
		}
	}

	let empty = false;

	for (let i = 0; i < grid.length; i++) {
		if (grid[i] == '') empty = true;
	}

	if (!empty && !hasEnded) {
		if (message) message.innerHTML = `Draw!`;
		hasEnded = true;
	}

	if (hasEnded) {
		const button = document.querySelector('button');
		if (button) button.classList.remove('hide');
	}
};
