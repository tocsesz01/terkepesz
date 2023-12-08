//helper

function isEmpty(cell){
    if (!cell.classList.contains('mountain') 
     && !cell.classList.contains('farm')
     && !cell.classList.contains('water')
     && !cell.classList.contains('town')
     && !cell.classList.contains('forest')){
        return true;
     }
     return false;
}

function secretMission(){
    let secretPoints = 0;
    let rightSurrounded = false;
    let leftSurrounded = false;
    let topSurrounded = false;
    let bottomSurrounded = false;
    for (let i = 1; i <= 11; i++){
        bottomSurrounded = false;
        rightSurrounded = false;
        leftSurrounded = false;
        topSurrounded = false;
        for (let j = 1; j <= 11; j++){
            if (getElementByCoordinates(i,j).classList.contains('mountain')){
                const topElem = getElementByCoordinates(i, j-1);
                const bottomElem = getElementByCoordinates(i, j+1);
                const leftElem= getElementByCoordinates(i-1,j);
                const rightElem= getElementByCoordinates(i+1,j);
                if (rightElem != null && i + 1 <= 11){
                    if (rightElem.classList.contains('water') 
                    ||  rightElem.classList.contains('farm')
                    ||  rightElem.classList.contains('town')
                    ||  rightElem.classList.contains('forest')){
                        rightSurrounded = true;
                    }
                }
                if (leftElem != null && i - 1 <= 11){
                    if (leftElem.classList.contains('water') 
                    ||  leftElem.classList.contains('farm')
                    ||  leftElem.classList.contains('town')
                    ||  leftElem.classList.contains('forest')){
                        leftSurrounded = true;
                    }
                }
                if (topElem != null && j - 1 >= 1){
                    if (topElem.classList.contains('water') 
                    ||  topElem.classList.contains('farm')
                    ||  topElem.classList.contains('town')
                    ||  topElem.classList.contains('forest')){
                        topSurrounded = true;
                    }
                }
                if (bottomElem != null && j + 1 >= 1){
                    if (bottomElem.classList.contains('water') 
                    ||  bottomElem.classList.contains('farm')
                    ||  bottomElem.classList.contains('town')
                    ||  bottomElem.classList.contains('forest')){
                        bottomSurrounded = true;
                    }
                }
            }
            if (bottomSurrounded && rightSurrounded && leftSurrounded && topSurrounded){
                secretPoints = secretPoints + 2;
            }
            bottomSurrounded = false;
            rightSurrounded = false;
            leftSurrounded = false;
            topSurrounded = false;
        }
    }
    return secretPoints;
}

function checkMission(mission){
    const title = mission.title;
    const currentPoints = mission.points;
    let points = 0;
    switch (title){
        case "Az erdő széle":
            for (let i = 1; i <= 11; i++){
                if (getElementByCoordinates(1, i).classList.contains('forest')){
                    points++;
                }
            }
            for (let i = 2; i <= 11; i++){
                if (getElementByCoordinates(i, 1).classList.contains('forest')){
                    points++;
                }
            }
            for (let i = 1; i <= 11; i++){
                if (getElementByCoordinates(11, i).classList.contains('forest')){
                    points++;
                }
            }
            for (let i = 2; i <= 11; i++){
                if (getElementByCoordinates(i, 11).classList.contains('forest')){
                    points++;
                }
            }
            mission.points = currentPoints + points;
            return points;
        case "Álmos-völgy":
            for (let i = 1; i <= 11; i++){
                let forestCounter = 0;
                for (let j = 1; j <= 11; j++){
                    if (getElementByCoordinates(i, j).classList.contains('forest')){
                        forestCounter = 1 + forestCounter;
                    }
                }
                if (forestCounter >= 3){
                    points = points + 4;
                }
                forestCounter = 0;
            }
            mission.points = currentPoints + points;
            return points;
        case "Krumpliöntözés":
            let isNextToFarm = false;
            for (let i = 1; i <= 11; i++){
                isNextToFarm = false;
                for (let j = 1; j <= 11; j++){
                    isNextToFarm = false;
                    if (getElementByCoordinates(i,j).classList.contains('water')){
                        if (getElementByCoordinates(i+1,j) != null && i + 1 <= 11){
                            if (getElementByCoordinates(i+1,j).classList.contains('farm')){
                                isNextToFarm = true;
                            }
                        }
                        if (getElementByCoordinates(i,j+1) != null && j + 1 <= 11){
                            if (getElementByCoordinates(i,j+1).classList.contains('farm')){
                                isNextToFarm = true;
                            }
                        }
                        if (getElementByCoordinates(i-1,j) != null && i - 1 >= 1){
                            if (getElementByCoordinates(i-1,j).classList.contains('farm')){
                                isNextToFarm = true;
                            }
                        }
                        if (getElementByCoordinates(i,j-1) != null && j - 1 >= 1){
                            if (getElementByCoordinates(i,j-1).classList.contains('farm')){
                                isNextToFarm = true;
                            }
                        }
                        
                    }
                    if (isNextToFarm){
                        points = points + 2;
                    }
                    isNextToFarm = false;
                }
            }
            
            mission.points = currentPoints + points;
            return points;
        case "Határvidék":
            let rows = 0;
            let cols = 0;
            for (let i = 1; i <= 11; i++){
                rows = 0;
                for (let j = 1; j <= 11; j++){
                    if (getElementByCoordinates(i,j).classList.contains('mountain') 
                    ||  getElementByCoordinates(i,j).classList.contains('water') 
                    ||  getElementByCoordinates(i,j).classList.contains('farm')
                    ||  getElementByCoordinates(i,j).classList.contains('town')
                    ||  getElementByCoordinates(i,j).classList.contains('forest')){
                        rows = rows+1;
                    }
                }
                if (rows == 11){
                    points = points + 6;
                }
                rows = 0;
            }
            for (let i = 1; i <= 11; i++){
                cols = 0;
                for (let j = 1; j <= 11; j++){
                    if (getElementByCoordinates(j,i).classList.contains('mountain') 
                    ||  getElementByCoordinates(j,i).classList.contains('water') 
                    ||  getElementByCoordinates(j,i).classList.contains('farm')
                    ||  getElementByCoordinates(j,i).classList.contains('town')
                    ||  getElementByCoordinates(j,i).classList.contains('forest')){
                        cols = cols+1;
                    }
                }
                if (cols == 11){
                    points = points + 6;
                }
                cols = 0;
            }
            mission.points = currentPoints + points;
            return points;
        case "Üres telek":
        let isThereEmpty = false;
        for (let i = 1; i <= 11; i++){
            for (let j = 1; j <= 11; j++){
                if (getElementByCoordinates(i,j).classList.contains('town')){
                    if (getElementByCoordinates(i+1,j) != null && i + 1 <= 11){
                        if (isEmpty(getElementByCoordinates(i+1,j))){
                            isThereEmpty = true;
                        }
                    }
                    if (getElementByCoordinates(i,j+1) != null && j + 1 <= 11){
                        if (isEmpty(getElementByCoordinates(i,j+1))){
                            isThereEmpty = true;
                        }
                    }
                    if (getElementByCoordinates(i-1,j) != null && i - 1 >= 1){
                        if (isEmpty(getElementByCoordinates(i-1,j))){
                            isThereEmpty = true;
                        }
                    }
                    if (getElementByCoordinates(i,j-1) != null && j - 1 >= 1){
                        if (isEmpty(getElementByCoordinates(i,j-1))){
                            isThereEmpty = true;
                        }
                    }
                    
                }
                if (isThereEmpty){
                    points = points + 2;
                }
                isThereEmpty = false;
            }
        }
        mission.points = currentPoints + points;
        return points;
    case "Páratlan silók":
        let oddCols = 0;
        for (let i = 1; i <= 11; i = i+2){
        oddCols = 0;
        for (let j = 1; j <= 11; j++){
            if (!isEmpty(getElementByCoordinates(j,i))){
                oddCols = oddCols+1;
            }
        }
        if (oddCols == 11){
            points = points + 10;
        }
        oddCols = 0;
    }

        mission.points = currentPoints + points;
        return points;
    }
}

function getElementByCoordinates(x, y) {
    const cellId = `cell-${x},${y}`;
    return document.getElementById(cellId);
  }

function endHover(cell){
    cordx = parseInt(cell.getAttribute('x'));
    if (cordx == 1) cordx ++;
    if (cordx == 11) cordx --;
    cordy = parseInt(cell.getAttribute('y'));
    if (cordy == 1) cordy ++;
    if (cordy == 11) cordy --;
    cordxstart = cordx - 1;
    cordystart = cordy - 1;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
                elem = getElementByCoordinates(cordxstart, cordystart);
                elem.classList.remove('selected')
                elem.classList.remove('invalid')
            
            cordystart++;
        }
        cordystart = cordy - 1;
        cordxstart++;
    }
}

function hoverBlock(cell, nextElem){
    isValid = true;
    cordx = parseInt(cell.getAttribute('x'));
    cordy = parseInt(cell.getAttribute('y'));
    cordxstart = cordx - 1;
    cordystart = cordy - 1;
    for (let i = 0; i < 3; i++){
        
        for (let j = 0; j < 3; j++){
            if (nextElem.shape[i][j] == 1){
                isValid = isValid && isValidPlacement(cordxstart, cordystart);
            }
            
            cordystart++;
        }
        cordystart = cordy - 1;
        cordxstart++;
    }
    
    cordxstart = cordx - 1;
    cordystart = cordy - 1;
    if (isValid){
        for (let i = 0; i < 3; i++){
        
            for (let j = 0; j < 3; j++){
                if (nextElem.shape[i][j] == 1){
                    elem = getElementByCoordinates(cordxstart, cordystart);
                    elem.classList.add('selected');
                    
                }
                
                cordystart++;
            }
            cordystart = cordy - 1;
            cordxstart++;
        }
    }else{
        for (let i = 0; i < 3; i++){
        
            for (let j = 0; j < 3; j++){
                if (nextElem.shape[i][j] == 1){
                    elem = getElementByCoordinates(cordxstart, cordystart);
                    elem.classList.add('invalid');
                    
                }
                
                cordystart++;
            }
            cordystart = cordy - 1;
            cordxstart++;
        }
    }
}
function placeBlock(cell, nextElem){
    isValid = true;
    cordx = parseInt(cell.getAttribute('x'));
    cordy = parseInt(cell.getAttribute('y'));
    cordxstart = cordx - 1;
    cordystart = cordy - 1;
    for (let i = 0; i < 3; i++){
        
        for (let j = 0; j < 3; j++){
            if (nextElem.shape[i][j] == 1){
                isValid = isValid && isValidPlacement(cordxstart, cordystart);
            }
            
            cordystart++;
        }
        cordystart = cordy - 1;
        cordxstart++;
    }
    
    cordxstart = cordx - 1;
    cordystart = cordy - 1;

    if (isValid){
        for (let i = 0; i < 3; i++){
        
            for (let j = 0; j < 3; j++){
                if (nextElem.shape[i][j] == 1){
                    elem = getElementByCoordinates(cordxstart, cordystart);
                    const type = nextElem.type;
                    elem.classList.add(type);
                }
                
                cordystart++;
            }
            cordystart = cordy - 1;
            cordxstart++;
        }
        currentTime = currentTime - next.time;
        
        if (currentTime < 1 && thisSeason == 3){
            secretMission();
            winterPoints = checkMission(selectedMissions[3]) + checkMission(selectedMissions[0]) + secretMission();
            winterEl.textContent = `${winterPoints} pont`
            mainPoints = mainPoints + winterPoints;
            pointsEl.textContent = `${mainPoints} pont`
            currentSeason.textContent = "Jelenlegi évszak: Vége";
            currentTime = 0;
            mission1pointEl.classList.remove('activeMission');
            mission4pointEl.classList.remove('activeMission');
            thisSeason = thisSeason + 1;
        }else if (currentTime < 1){
            switch (thisSeason){
                case 0:
                    secretMission();
                    springPoints = checkMission(selectedMissions[0]) + checkMission(selectedMissions[1]) + secretMission();
                    springEl.textContent = `${springPoints} pont`
                    mainPoints = mainPoints + springPoints;
                    pointsEl.textContent = `${mainPoints} pont`
                    break;
                case 1:
                    secretMission();
                    summerPoints = checkMission(selectedMissions[1]) + checkMission(selectedMissions[2]) + secretMission();
                    summerEl.textContent = `${summerPoints} pont`
                    mainPoints = mainPoints + summerPoints;
                    pointsEl.textContent = `${mainPoints} pont`
                    break;
                case 2:
                    autumnPoints = checkMission(selectedMissions[2]) + checkMission(selectedMissions[3]) + secretMission();
                    autumnEl.textContent = `${autumnPoints} pont`
                    mainPoints = mainPoints + autumnPoints;
                    pointsEl.textContent = `${mainPoints} pont`
                    break;
            }
            thisSeason++;
            currentTime = 7;
            currentSeason.textContent = "Jelenlegi évszak: " + seasons[thisSeason];
        }
        switch (thisSeason){
            case 1:
                activeMissions = [selectedMissions[1], selectedMissions[2]];
                mission1pointEl.classList.remove('activeMission');
                mission3pointEl.classList.add('activeMission');
                break;
            case 2:
                activeMissions = [selectedMissions[2], selectedMissions[3]];
                mission2pointEl.classList.remove('activeMission');
                mission4pointEl.classList.add('activeMission');
                break;
            case 3:
                activeMissions = [selectedMissions[3], selectedMissions[0]];
                mission3pointEl.classList.remove('activeMission');
                mission1pointEl.classList.add('activeMission');
                break;
            default:
                break;
        }
        mission1pointEl.textContent = selectedMissions[0].points + " pont";
        mission2pointEl.textContent = selectedMissions[1].points + " pont";
        mission3pointEl.textContent = selectedMissions[2].points + " pont";
        mission4pointEl.textContent = selectedMissions[3].points + " pont";
        remainingEl.textContent = "Jelenlegi évszakból hátralevő idő:" + currentTime + "/7";

        nextEl.innerHTML = "";
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        next = elements[randomInt];
        timeValueEl.textContent = "Idő: " + next.time;
        for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
    
            const cellId = `cell-${displayIdCounter}`;
            
            cell.setAttribute('id', cellId);
    
            displayIdCounter++;
           
            if (next.shape[i][j] == 1){
                cell.classList.add(next.type);
            }
            nextEl.appendChild(cell);
        }
    }
    if (currentTime < 1 && thisSeason == 3){
        nextEl.innerHTML = "<h2>Már nem tudsz több elemet lehelyezni!</h2>";
        mirrorEl.innerHTML = "";
        rotateEl.innerHTML = "";
        timeValueEl.innerHTML = "";
    }
    }

}


function isValidPlacement(x, y){
    const elem = getElementByCoordinates(x, y);
    if (x > 11 || x < 1 || y > 11 || y < 1){
        return false;
    }

    if (elem.classList.contains("mountain") ||
        elem.classList.contains("water")    ||
        elem.classList.contains("farm")     ||
        elem.classList.contains("town")     ||
        elem.classList.contains("forest")){
            return false;
        }
    else {
        return true;
    }

}


function mirrorShapeHorizontally(shape) {
    const mirroredShape = shape.map(row => [...row].reverse());
    return mirroredShape;
}

function rotateShapeClockwise(shape) {
    const numRows = shape.length;
    const numCols = shape[0].length;
  
    // Create a new empty array for the rotated shape
    const rotatedShape = new Array(numCols).fill(0).map(() => new Array(numRows).fill(0));
  
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        rotatedShape[j][numRows - 1 - i] = shape[i][j];
      }
    }
  
    return rotatedShape;
}

//
let displayIdCounter = 1;
//elements
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]
//

//missions

const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      "picture": "missions/erdoSzele.png",
      "points": 0
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      "picture": "missions/almosVolgy.png",
      "points": 0
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      "picture": "missions/krumpliOntozes.png",
      "points": 0
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      "picture": "missions/hatarVidek.png",
      "points": 0
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
      "picture": "missions/uresTelek.png",
      "points": 0
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
      "picture": "missions/paratlanSilok.png",
      "points": 0
    }]
};

//
const grid = document.querySelector('.grid');
const nextEl = document.querySelector('.nextDisplay');
const springEl = document.querySelector('.springPoints');
const summerEl = document.querySelector('.summerPoints');
const autumnEl = document.querySelector('.autumnPoints');
const winterEl = document.querySelector('.winterPoints');
const pointsEl = document.querySelector('.points');
const mirrorEl = document.querySelector('.mirror');
const rotateEl = document.querySelector('.rotate');
const timeValueEl = document.querySelector('.timeValue');
const remainingEl = document.querySelector('.remainingTime');
const currentSeason = document.querySelector('.currentSeason');
const mission1titleEl = document.querySelector('.mission1title');
const mission1descEl = document.querySelector('.mission1desc');
const mission1pointEl = document.querySelector('.mission1points');
const mission1imgEl = document.querySelector('.mission1picture');
const mission2titleEl = document.querySelector('.mission2title');
const mission2descEl = document.querySelector('.mission2desc');
const mission2pointEl = document.querySelector('.mission2points');
const mission2imgEl = document.querySelector('.mission2picture');
const mission3titleEl = document.querySelector('.mission3title');
const mission3descEl = document.querySelector('.mission3desc');
const mission3pointEl = document.querySelector('.mission3points');
const mission3imgEl = document.querySelector('.mission3picture');
const mission4titleEl = document.querySelector('.mission4title');
const mission4descEl = document.querySelector('.mission4desc');
const mission4pointEl = document.querySelector('.mission4points');
const mission4imgEl = document.querySelector('.mission4picture');

let mainPoints = 0;
let m1points = 0;
let m2points = 0;
let m3points = 0;
let m4points = 0;

const selectedMissions = [];


while(selectedMissions.length != 4){

    let missionrandom = Math.floor(Math.random() * ((missions.basic.length - 1) - 0 + 1)) + 0;
    const mission = missions.basic[missionrandom];
    if (!selectedMissions.includes(mission)){
        selectedMissions.push(mission);
    }
}

const mission1 = selectedMissions[0];
mission1titleEl.textContent = mission1.title;
mission1descEl.textContent = mission1.description;
mission1imgEl.setAttribute("src", mission1.picture);
const mission2 = selectedMissions[1];
mission2titleEl.textContent = mission2.title;
mission2descEl.textContent = mission2.description;
mission2imgEl.setAttribute("src", mission2.picture);
const mission3 = selectedMissions[2];
mission3titleEl.textContent = mission3.title;
mission3descEl.textContent = mission3.description;
mission3imgEl.setAttribute("src", mission3.picture);
const mission4 = selectedMissions[3];
mission4titleEl.textContent = mission4.title;
mission4descEl.textContent = mission4.description;
mission4imgEl.setAttribute("src", mission4.picture);

let activeMissions = [mission1, mission2];

mission1pointEl.classList.add('activeMission');
mission2pointEl.classList.add('activeMission');

const seasons = ['Tavasz', 'Nyár', 'Ősz', 'Tél'];
let currentTime = 7;
let thisSeason = 0;

currentSeason.textContent = "Jelenlegi évszak: " + seasons[thisSeason];
remainingEl.textContent = "Jelenlegi évszakból hátralevő idő:" + currentTime + "/7";

let cellIdCounter = 1;
const min = 0;
const max = 15;
let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
let next = elements[randomInt];
timeValueEl.textContent = "Idő: " + next.time;
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        const cellId = `cell-${displayIdCounter}`;
        
        cell.setAttribute('id', cellId);

        displayIdCounter++;
       
        if (next.shape[i][j] == 1){
            cell.classList.add(next.type);
        }
        nextEl.appendChild(cell);
    }
}

// Create an object to map coordinates to cell IDs
const cellCoordinates = {
  '2,2': 'cell-2,2',
  '4,9': 'cell-4,9',
  '6,4': 'cell-6,4',
  '9,10': 'cell-9,10',
  '10,6': 'cell-10,6',
};

      for (let i = 1; i < 12; i++) {
        for (let j = 1; j < 12; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
        
          const cellId = `cell-${i},${j}`;
        
          cell.setAttribute('id', cellId);
          cell.setAttribute('x', i);
          cell.setAttribute('y', j);
        
          if (cellCoordinates[`${i},${j}`]) {
          cell.classList.add('mountain');
          }

          cellIdCounter++;

          grid.appendChild(cell);
        }
      }

      grid.addEventListener('click', e => {
        const cellEl = e.target;
        if (cellEl.classList.contains('cell') && (currentSeason!= 3 && currentTime > 0)) {
            
            placeBlock(cellEl, next)
            
          }

        e.stopPropagation();
      });

      grid.addEventListener('mouseleave', function(){
        cells.forEach(cell => { endHover(cell, next); });
      });

      const cells = grid.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.addEventListener('mouseenter', function () {
          if ((currentSeason!= 3 && currentTime > 0)){
            hoverBlock(cell, next);
          }
        });
        
        cell.addEventListener('mouseleave', function () {
          endHover(cell, next);
        });
      });


//points

let springPoints = 0;
let summerPoints = 0;
let autumnPoints = 0;
let winterPoints = 0;

springEl.textContent = springPoints + " pont";
summerEl.textContent = summerPoints + " pont";
autumnEl.textContent = autumnPoints + " pont";
winterEl.textContent = winterPoints + " pont";

mirrorEl.addEventListener('click', (e) => {
    const mirroredShape = mirrorShapeHorizontally(next.shape);
    next.shape = mirroredShape;
    next.mirrored = !next.mirrored;
    nextEl.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
    
            const cellId = `cell-${displayIdCounter}`;
            
            cell.setAttribute('id', cellId);
    
            displayIdCounter++;
            
            if (mirroredShape[i][j] == 1){
                cell.classList.add(next.type);
            }
            nextEl.appendChild(cell);
        }
    }
});

rotateEl.addEventListener('click', (e) => {
const rotatedShape = rotateShapeClockwise(next.shape);
    next.shape = rotatedShape;
    if (next.rotation != 3){
    next.rotation = next.rotation + 1;
    } else {
        next.rotation = 0;
    }
    nextEl.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
    
            const cellId = `cell-${displayIdCounter}`;
            
            cell.setAttribute('id', cellId);
    
            displayIdCounter++;
           
            if (rotatedShape[i][j] == 1){
                cell.classList.add(next.type);
            }
            nextEl.appendChild(cell);
        }
    }
});