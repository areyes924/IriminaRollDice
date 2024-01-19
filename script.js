// Display Vars
var doubles;
var triples;
var mean;
var median;
var mode;




var frequency = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
  };




// Rolling Logic Vars
var diceNum = 1;
var timesToRoll = 1;
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const die3 = document.getElementById("die3");




function setDiceNumber(num){
    diceNum = parseInt(num);
    console.log(diceNum);
   
    if (diceNum == 1){
        //Show 1
        die1.textContent = "DIE";
        die2.textContent = "";
        die3.textContent = "";




    }
    else if (diceNum == 2){
        //Show 2
        die1.textContent = "DIE";
        die2.textContent = "DIE";
        die3.textContent = "";
    }
    else{
        // Show 3
        die1.textContent = "DIE";
        die2.textContent = "DIE";
        die3.textContent = "DIE";
    }




    displayFrequencyTable();
}




function setTimesToRoll(form){
    var num = form.rollNumber.value;
    timesToRoll = parseInt(num);
}








function roll(){
    var sum = 0;
    resetLogic();




    for (let i = 0; i < timesToRoll; i++) {
        sum = 0
        console.log("rolled once");
        const Die1 = Math.floor(Math.random() * (6) + 1);
        sum += Die1;
        die1.textContent = Die1;




        if (diceNum > 1){
            const Die2 = Math.floor(Math.random() * (6) + 1);
            sum += Die2;
            die2.textContent = Die2;
            if (Die1 == Die2){
                doubles += 1;
            }
            if (diceNum == 3){
                const Die3 = Math.floor(Math.random() * (6) + 1);
                die3.textContent = Die3;
                sum += Die3;
                if (Die2 == Die3 || Die1 == Die3){ // If the third die is equal to ONE of the other two die
                    doubles += 1;
                    if (Die2 == Die3 && Die1 == Die3){ // If Triples
                        doubles -=2;
                        triples += 1;
                    }
                }
            }
        }




        frequency[sum] += 1;
    }




   








    console.log(frequency);
    displayFrequencyTable();
    calculateLogic();
    displayLogic();
}




function calculateLogic(){
    mode = diceNum;
    var counted = 0;
    var total = 0;
    var medianFound = false;
    for (let i = diceNum; i <= 6 * diceNum; i++) {
        // Check if we're in the middle for median
        if (counted < (timesToRoll/2) && (counted + frequency[i+1]) < (timesToRoll/2)){
            median = i;
        }
        else if (counted < (timesToRoll/2) && (counted + frequency[i+1]) > (timesToRoll/2)){
            median = i;
        }

        // check for mode
        if (frequency[i] > frequency[mode]){
            mode = i
        }
        total += i * frequency[i];
        counted += frequency[i];
    }

    


    mean = total / parseFloat(timesToRoll);
}




function resetLogic(){
    doubles = 0;
    triples = 0;
    mean = 0;
    median = 0;
    mode = 0;


    frequency = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0,
        "13": 0,
        "14": 0,
        "15": 0,
        "16": 0,
        "17": 0,
        "18": 0,
    };
}

function displayFrequencyTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
 
    const numbersrow = document.createElement("tr");
    const freqrow = document.createElement("tr");
 
    for (let i = diceNum; i <= 6 * diceNum; i++) {
      const cell = document.createElement("th");
      const cellText = document.createTextNode(i);
      cell.appendChild(cellText);
      numbersrow.appendChild(cell);
    }
 
    tblBody.appendChild(numbersrow);

    for (let i = diceNum; i <= 6 * diceNum; i++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(frequency[i]);
        cell.appendChild(cellText);
        freqrow.appendChild(cell);
      }
   
    tblBody.appendChild(freqrow);
   
 
    tbl.appendChild(tblBody);
 
    // Remove the old table before appending the new one
    const freqtable = document.getElementById("freqtable");
    freqtable.innerHTML = "";
    freqtable.appendChild(tbl);
  }








function displayLogic(){
    const doubledisplay = document.getElementById("double");
    const tripledisplay = document.getElementById("triple");
    doubledisplay.textContent = "Doubles: " + doubles;
    tripledisplay.textContent = "Triples: " + triples;




    // Bottom Table
    const meandisplay = document.getElementById("mean");
    const mediandisplay = document.getElementById("median");
    const modedisplay = document.getElementById("mode");




    meandisplay.textContent = "Mean: " + mean;
    mediandisplay.textContent = "Median: " + median;
    modedisplay.textContent = "Mode: " + mode;
}


