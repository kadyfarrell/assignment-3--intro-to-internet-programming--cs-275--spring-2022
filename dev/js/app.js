window.onload = () => {
    let user_input = parseInt(window.prompt(`Enter the size of the matrix: `));
    if(user_input >=1 && user_input <=9){   
        
        let elements = new Array(user_input);

        document.write(`<b>Original Matrix</b> <br><br>`);
    
        for (let i = 0; i < elements.length; i++) {
            elements[i] = new Array(user_input);
        }

        let z = 1;

        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements.length; j++) {
                elements[i][j] = z++;
            }
        }
        
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements.length; j++) {
                document.write(elements[i][j] + ` `);
            }
            document.write(`<br>`);
        }
          
        document.write(`<br><b> Flipped Matrix: </b><br><br>`);

        let i = 0, j = user_input;
        let temp = 0;
        while (i < j) {
            temp = elements[i][i];
            elements[i][i] = elements[j - 1][j - 1];
            elements[j - 1][j - 1] = temp;
            i++;
            j--;
        }


        for (i = 0; i < user_input; ++i) {
            for (j = 0; j < user_input; ++j)
                document.write(elements[i][j] + ` `);
            document.write(`<br>`);
        }
    }        
    else{
        alert(`Please input an integer not string`);
    }
};
