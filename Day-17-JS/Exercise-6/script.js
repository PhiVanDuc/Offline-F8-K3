var chessTable = document.querySelector('.chess-table');

for (var i = 1; i <= 8; i++) {
    const chessRow = document.createElement('tr');
    chessTable.appendChild(chessRow);

    for (var j = 1; j <= 8; j++) {
        const chessColumn = document.createElement('td');
        if (i % 2 !== 0 && j % 2 === 0) {
            chessColumn.style.backgroundColor = 'rgb(12,67,35)';
        }
        else if (i % 2 === 0 && j % 2 !== 0) {
            chessColumn.style.backgroundColor = 'rgb(12,67,35)';
        }
        chessRow.appendChild(chessColumn);
    }
}