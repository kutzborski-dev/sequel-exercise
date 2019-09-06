function coinCalculator(){
    let input = document.querySelector("#coins").value;
    let value = 0; //Total pence value which will be taken from the input after sufficient validation
    let penceDisplay = document.querySelector("#input");

    penceDisplay.innerHTML = 0; //Reset the total pence display in case the script is executed again without refreshing the page

    //The coin list, the value indicates the pence, e.g: 200p = £2 coin, 50p = 50p coin; The counterElem is the html field counter that will be updated to display the result
    let coins = [
        {
            value: 200,
            counter: 0,
            counterElem: document.getElementById("2pound-counter")
        },
        {
            value: 100,
            counter: 0,
            counterElem: document.getElementById("1pound-counter")
        },
        {
            value: 50,
            counter: 0,
            counterElem: document.getElementById("50p-counter")
        },
        {
            value: 20,
            counter: 0,
            counterElem: document.getElementById("20p-counter")
        },
        {
            value: 10,
            counter: 0,
            counterElem: document.getElementById("10p-counter")
        },
        {
            value: 5,
            counter: 0,
            counterElem: document.getElementById("5p-counter")
        },
        {
            value: 2,
            counter: 0,
            counterElem: document.getElementById("2p-counter")
        },
        {
            value: 1,
            counter: 0,
            counterElem: document.getElementById("1p-counter")
        }
    ];

    let match = input.match(/[abcdefghijklmnoqrstuvwxyz]+/i); //Scan for unwanted, non-numeric, characters

    if(match !== null){ //If the input contains unwanted characters, throw an error and "exit" the script
        alert("Please enter a correct format!");
        return false;
    }

    if(input.indexOf(".") !== -1){ //Scan the string's character indexes for a dot, if there is a dot, e.g: "£9.81p", "9.81p", "£9.81", "9.81", then proceed
        value = input.replace(/[£p]/g, ""); //Remove none numeric characters, leave the dot for the decimals
        value = parseFloat(value).toFixed(2) * 100; //Multiply the input by 100 after converting it into a float unit and rounding it to two decimals, in order to receive the rounded pence value
    }
    else if(input.indexOf(".") === -1 && input.indexOf("£") !== -1){ //If there is no dot, but a pound symbol present, e.g: "£2", then proceed
        value = Number(input.replace(/[£p]/g, "")) * 100; //Remove the non-numeric characters and convert the string into a number, then multiply it by 100 to receive the pence value
    }
    else if(input.indexOf(".") === -1 && input.indexOf("p") !== -1){ //If there is no dot, but a "p" character present, e.g: "76p", then proceed
        value = Number(input.replace(/[p]/g, "")); //Remove the non-numeric character and convert the string into a number to receive the pence value
    }
    else{ //If none of these above apply, e.g: "5", then proceed
        value = Number(input);
    }

    penceDisplay.innerHTML = value; //Update the total pence input display

    for(let i = 0; i < coins.length; i++){
        coins[i].counterElem.innerHTML = 0; //Reset the table counter element in case the script is executed again without refreshing the page

        while(value / coins[i].value >= 1){ //If the pence value is equal to or greater than 1 when divided by the current coin value, increment the counter. e.g: 431/200 = 2.155, meaning we could increase the count of the £2 coin twice
            value -= coins[i].value; //Subtract the coin value from the total pence value to avoid permanent loop
            coins[i].counter++
            coins[i].counterElem.innerHTML = coins[i].counter; //Update the table counter element innerHTML property to display the result immediately
        }
    }
}