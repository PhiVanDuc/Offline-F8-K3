var table = document.querySelector('.table');

for (var i = 1; i <= 10; i++) {
    const tableRow = document.createElement('tr');
    table.appendChild(tableRow);

    for (var j = 1; j <= 10; j++) {
        const tableColumn = document.createElement('td');
        tableColumn.innerText = `${i} x ${j} = ${i * j}`;
        tableRow.appendChild(tableColumn);
    }
}