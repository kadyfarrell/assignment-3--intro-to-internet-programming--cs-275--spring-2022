window.onload = () => {
    let userInput = parseInt(window.prompt(`Enter the size of the matrix: `));
    if(userInput >=1 && userInput <=9){   
        
        let elements = new Array(userInput);

        const originalMatrix = document.getElementById(`originalMatrix`);

        for (let i = 0; i < elements.length; i++) {
            elements[i] = new Array(userInput);
        }

        let z = 1;

        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements.length; j++) {
                elements[i][j] = z++;
            }
        }
        
        for (let i = 0; i < elements.length; i++) {
            const newRow1 = document.createElement(`tr`);
            for (let j = 0; j < elements.length; j++) {
                console.log(i, j, elements[i][j]);
                const newCell1 = document.createElement(`td`);
                newCell1.innerHTML = elements[i][j];
                newRow1.appendChild(newCell1);
            }
            originalMatrix.appendChild(newRow1);
        }

        const flippedMatrix = document.getElementById(`flippedMatrix`);

        let i = 0, j = userInput;
        let temp = 0;
        while (i < j) {
            temp = elements[i][i];
            elements[i][i] = elements[j - 1][j - 1];
            elements[j - 1][j - 1] = temp;
            i++;
            j--;
        }

        for (i = 0; i < userInput; ++i) {
            const newRow2 = document.createElement(`tr`);
            for (j = 0; j < userInput; ++j) {
                const newCell2 = document.createElement(`td`);
                newCell2.innerHTML = elements[i][j] ;
                newRow2.appendChild(newCell2);
            }
            flippedMatrix.appendChild(newRow2);
        }
    }        
    else{
        alert(`Please input an integer not string`);
    }
};
