
export const GenerateItemsTable = (itemName) => {

        const itemsTable = document.createElement("table")
        const itemsTableBody = document.createElement("tbody")

        for (let i = 0; i < 2; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 2; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                const cell = document.createElement("td");
                const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
        itemsTable.appendChild(itemsTableBody);
        itemsTable.setAttribute("border", "2");
        return (
            <div>
            itemsTable
            </div>
        );
    }
