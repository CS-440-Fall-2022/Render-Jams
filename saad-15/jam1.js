"use strict"
var count = 24;
//For the render jam I am rendering an mousepad with an rgb strip around it. 

//Vertices and indices.
let vertices = [
    vec3(-0.75, 0.35, 0), vec3(0.5, -0.35, 0), vec3(-0.75, -0.15, 0), vec3(-0.75, -0.15, 0), vec3(-0.5, -0.35, 0), vec3(0.5, -0.35, 0), vec3(-0.75, 0.35, 0), vec3(-0.5, 0.35, 0), vec3(0.5, -0.35, 0),
    vec3(0.75, -0.35, 0), vec3(-0.5, 0.35, 0), vec3(0.75, 0.15, 0), vec3(0.75, 0.15, 0), vec3(0.5, 0.35, 0), vec3(-0.5, 0.35, 0), vec3(0.75, -0.35, 0), vec3(0.5, -0.35, 0), vec3(-0.5, 0.35, 0),
    vec3(-0.75, -0.35, 0), vec3(-0.75, -0.15, 0), vec3(-0.5, -0.35, 0),
    vec3(0.75, 0.35, 0), vec3(0.75, 0.15, 0), vec3(0.5, 0.35, 0)
];

//vec3(-0.75, 0.35, 0), vec3(0.75, 0.35, 0), vec3(0.75, -0.35, 0), vec3(-0.75, -0.35, 0)
let faces = [0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20,
    21, 22, 23];

let colors = [
    vec3(0, 0, 0.2), vec3(0, 0, 0.2), vec3(0, 0, 0.2),
    vec3(0, 0, 0.2), vec3(0, 0, 0.2), vec3(0, 0, 0.2),
    vec3(0, 0, 0.2), vec3(0, 0, 0.2), vec3(0, 0, 0.2),
    vec3(0.5, 0, 0), vec3(0.5, 0, 0), vec3(0.5, 0, 0),
    vec3(0.5, 0, 0), vec3(0.5, 0, 0), vec3(0.5, 0, 0),
    vec3(0.5, 0, 0), vec3(0.5, 0, 0), vec3(0.5, 0, 0),
    vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2),
    vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2)];

var topIndex;
var rightIndex;
var bottomIndex;
var leftIndex;

//Model View Matrix
let modelViewMatrixLoc;
let projectionMatrixLoc;
let nMatrixLoc;
let viewPosLoc;
let modelViewMatrix;
let projectionMatrix;

let eye = vec3(0.0, 5.0, 0.0);
let at = vec3(0.0, 5.0, -1.0);
let up = vec3(0.0, 1.0, 0.0);
let dir = normalize(subtract(at, eye), false);

//WebGL and file parser variables.
let text;
let loaded = false;
let initialized = false;
let program;
let program2;
let vPosition;
let gl;
let gl2;


// Speed Change
let cycleSpeed = 100;
let rainbowSpeed = 55;
let breatheSpeed = 120;
let discoSpeed = 150;
function changeDiscoSpeed() {
    discoSpeed = -1 * document.getElementById('discoScale').value;
}

function changeRainbowSpeed() {
    rainbowSpeed = -1 * document.getElementById('rainbowScale').value;
}

function changeBreatheSpeed() {
    breatheSpeed = -1 * document.getElementById('breatheScale').value;
}

function changeCycleSpeed() {
    cycleSpeed = -1 * document.getElementById('cycleScale').value;
}


//  Rainbow
var rainbowState = 0;
function turnRainbowOn() {
    cloudIndex = 0;
    rainbowState = 1;
    turnDiscoOff();
    turnBreatheOff();
    turnCycleOff();
}

function turnRainbowOff() {
    rainbowState = 0;
}

var cloudIndex = 0;
function rainbow() {

    if (cloudIndex == 0) {
        changeGlowTop(1, 0, 0);
        changeGlowRight(1, 0, 0.25);
        changeGlowBottom(1, 0, 0.5);
        changeGlowLeft(1, 0, 0.75);
        cloudIndex++;
    }
    else if (cloudIndex == 1) {
        changeGlowTop(1, 0, 0.25);
        changeGlowRight(1, 0, 0.5);
        changeGlowBottom(1, 0, 0.75);
        changeGlowLeft(1, 0, 1);
        cloudIndex++;
    }
    else if (cloudIndex == 2) {
        changeGlowTop(1, 0, 0.5);
        changeGlowRight(1, 0, 0.75);
        changeGlowBottom(1, 0, 1);
        changeGlowLeft(0.75, 0, 1);
        cloudIndex++;
    }
    else if (cloudIndex == 3) {
        changeGlowTop(1, 0, 0.75);
        changeGlowRight(1, 0, 1);
        changeGlowBottom(0.75, 0, 1);
        changeGlowLeft(0.5, 0, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 4) {
        changeGlowTop(1, 0, 1);
        changeGlowRight(0.75, 0, 1);
        changeGlowBottom(0.5, 0, 1);
        changeGlowLeft(0.25, 0, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 5) {
        changeGlowTop(0.75, 0, 1);
        changeGlowRight(0.5, 0, 1);
        changeGlowBottom(0.25, 0, 1);
        changeGlowLeft(0, 0, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 6) {
        changeGlowTop(0.5, 0, 1);
        changeGlowRight(0.25, 0, 1);
        changeGlowBottom(0, 0, 1);
        changeGlowLeft(0, 0.25, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 7) {
        changeGlowTop(0.25, 0, 1);
        changeGlowRight(0, 0, 1);
        changeGlowBottom(0, 0.25, 1);
        changeGlowLeft(0, 0.5, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 8) {
        changeGlowTop(0, 0, 1);
        changeGlowRight(0, 0.25, 1);
        changeGlowBottom(0, 0.5, 1);
        changeGlowLeft(0, 0.75, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 9) {
        changeGlowTop(0, 0.25, 1);
        changeGlowRight(0, 0.5, 1);
        changeGlowBottom(0, 0.75, 1);
        changeGlowLeft(0, 1, 1);
        cloudIndex++;;
    }
    else if (cloudIndex == 10) {
        changeGlowTop(0, 0.5, 1);
        changeGlowRight(0, 0.75, 1);
        changeGlowBottom(0, 1, 1);
        changeGlowLeft(0, 1, 0.75);
        cloudIndex++;;
    }
    else if (cloudIndex == 11) {
        changeGlowTop(0, 0.75, 1);
        changeGlowRight(0, 1, 1);
        changeGlowBottom(0, 1, 0.75);
        changeGlowLeft(0, 1, 0.5);
        cloudIndex++;;
    }
    else if (cloudIndex == 12) {
        changeGlowTop(0, 1, 1);
        changeGlowRight(0, 1, 0.75);
        changeGlowBottom(0, 1, 0.5);
        changeGlowLeft(0, 1, 0.25);
        cloudIndex++;;
    }
    else if (cloudIndex == 13) {
        changeGlowTop(0, 1, 0.75);
        changeGlowRight(0, 1, 0.5);
        changeGlowBottom(0, 1, 0.25);
        changeGlowLeft(0, 1, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 14) {
        changeGlowTop(0, 1, 0.5);
        changeGlowRight(0, 1, 0.25);
        changeGlowBottom(0, 1, 0);
        changeGlowLeft(0.25, 1, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 15) {
        changeGlowTop(0, 1, 0.25);
        changeGlowRight(0, 1, 0);
        changeGlowBottom(0.25, 1, 0);
        changeGlowLeft(0.5, 1, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 16) {
        changeGlowTop(0, 1, 0);
        changeGlowRight(0.25, 1, 0);
        changeGlowBottom(0.5, 1, 0);
        changeGlowLeft(0.75, 1, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 17) {
        changeGlowTop(0.25, 1, 0);
        changeGlowRight(0.5, 1, 0);
        changeGlowBottom(0.75, 1, 0);
        changeGlowLeft(1, 1, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 18) {
        changeGlowTop(0.5, 1, 0);
        changeGlowRight(0.75, 1, 0);
        changeGlowBottom(1, 1, 0);
        changeGlowLeft(1, 0.75, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 19) {
        changeGlowTop(0.75, 1, 0);
        changeGlowRight(1, 1, 0);
        changeGlowBottom(1, 0.75, 0);
        changeGlowLeft(1, 0.5, 0);
        cloudIndex++;;
    }
    else if (cloudIndex == 20) {
        changeGlowTop(1, 1, 0);
        changeGlowRight(1, 0.75, 0);
        changeGlowBottom(1, 0.5, 0);
        changeGlowLeft(1, 0.25, 0);
        cloudIndex++;
    }
    else if (cloudIndex == 21) {
        changeGlowTop(1, 0.75, 0);
        changeGlowRight(1, 0.5, 0);
        changeGlowBottom(1, 0.25, 0);
        changeGlowLeft(1, 0, 0);
        cloudIndex++;
    }
    else if (cloudIndex == 22) {
        changeGlowTop(1, 0.5, 0);
        changeGlowRight(1, 0.25, 0);
        changeGlowBottom(1, 0, 0);
        changeGlowLeft(1, 0, 0.25);
        cloudIndex++;
    }
    else if (cloudIndex == 23) {
        changeGlowTop(1, 0.25, 0);
        changeGlowRight(1, 0, 0);
        changeGlowBottom(1, 0, 0.25);
        changeGlowLeft(1, 0, 0.5);
        cloudIndex = 0;
    }
}

//  Breathe
var cycleState = 0;
var cycleIndex = 0;
var currentIndex = 0;
function turnCycleOn() {
    cycleState = 1;
    cycleIndex = 0;
    currentIndex = 0;
    turnDiscoOff();
    turnBreatheOff();
    turnRainbowOff();
}

function turnCycleOff() {
    cycleState = 0;
}

function cycle() {
    if (cycleIndex == 0) {
        if (currentIndex == 0) {
            changeGlow(1, 0, 0.75)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(1, 0, 0.5)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(1, 0, 0.25)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(1, 0, 0)
            currentIndex = 0;
            cycleIndex++;
        }
    }
    else if (cycleIndex == 1) {
        if (currentIndex == 0) {
            changeGlow(1, 0.25, 0)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(1, 0.5, 0)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(1, 0.75, 0)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(1, 1, 0)
            currentIndex = 0;
            cycleIndex++;
        }
    }
    else if (cycleIndex == 2) {
        if (currentIndex == 0) {
            changeGlow(0.75, 1, 0)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(0.5, 1, 0.5)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(0.25, 1, 0)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(0, 1, 0)
            currentIndex = 0;
            cycleIndex++;
        }
    }
    else if (cycleIndex == 3) {
        if (currentIndex == 0) {
            changeGlow(0, 1, 0.25)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(0, 1, 0.5)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(0, 1, 0.75)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(0, 1, 1)
            currentIndex = 0;
            cycleIndex++;
        }
    }
    else if (cycleIndex == 4) {
        if (currentIndex == 0) {
            changeGlow(0, 0.75, 1)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(0, 0.5, 1)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(0, 0.25, 1)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(0, 0, 1)
            currentIndex = 0;
            cycleIndex++;
        }
    }
    else if (cycleIndex == 5) {
        if (currentIndex == 0) {
            changeGlow(0.25, 0, 1)
            currentIndex++;
        }
        else if (currentIndex == 1) {
            changeGlow(0.5, 0, 1)
            currentIndex++;
        }
        else if (currentIndex == 2) {
            changeGlow(0.75, 0, 1)
            currentIndex++;
        }
        else if (currentIndex == 3) {
            changeGlow(1, 0, 1)
            currentIndex = 0;
            cycleIndex = 0;
        }
    }
}


//  Breathe
var breatheState = 0;
var breatheIndex = 0;
var flowIndex = 0;
function turnBreatheOn() {
    breatheState = 1;
    breatheIndex = 0;
    flowIndex = 0;
    turnDiscoOff();
    turnCycleOff();
    turnRainbowOff();
}

function turnBreatheOff() {
    breatheState = 0;
}

function breathe() {
    if (breatheIndex == 0) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0.25, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0.5, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0.75, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(1, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0.75, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0.5, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0.25, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex++;
        }
    }
    else if (breatheIndex == 1) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0, 0.25, 0)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0, 0.5, 0)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0, 0.75, 0)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(0, 1, 0)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0, 0.75, 0)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0, 0.5, 0)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0, 0.25, 0)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex++;
        }
    }
    else if (breatheIndex == 2) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0, 0, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0, 0, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0, 0, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(0, 0, 1)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0, 0, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0, 0, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0, 0, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex++;
        }
    }
    else if (breatheIndex == 3) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0, 0.25, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0, 0.5, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0, 0.75, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(0, 1, 1)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0, 0.75, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0, 0.5, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0, 0.25, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex++;
        }
    }
    else if (breatheIndex == 4) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0.25, 0, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0.5, 0, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0.75, 0, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(1, 0, 1)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0.75, 0, 0.75)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0.5, 0, 0.5)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0.25, 0, 0.25)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex++;
        }
    }
    else if (breatheIndex == 5) {
        if (flowIndex == 0) {
            changeGlow(0, 0, 0)
            flowIndex++;
        }
        else if (flowIndex == 1) {
            changeGlow(0.25, 0.25, 0)
            flowIndex++;
        }
        else if (flowIndex == 2) {
            changeGlow(0.5, 0.5, 0)
            flowIndex++;
        }
        else if (flowIndex == 3) {
            changeGlow(0.75, 0.75, 0)
            flowIndex++;
        }
        else if (flowIndex == 4) {
            changeGlow(1, 1, 0)
            flowIndex++;
        }
        else if (flowIndex == 5) {
            changeGlow(0.75, 0.75, 0)
            flowIndex++;
        }
        else if (flowIndex == 6) {
            changeGlow(0.5, 0.5, 0)
            flowIndex++;
        }
        else if (flowIndex == 7) {
            changeGlow(0.25, 0.25, 0)
            flowIndex++;
        }
        else if (flowIndex == 8) {
            changeGlow(0, 0, 0)
            flowIndex = 0;
            breatheIndex = 0;
        }
    }
}

//  Disco Mode
var discoIndex = 0;
var discoState = 0;

function turnDiscoOn() {
    discoState = 1;
    discoIndex = 0;
    turnBreatheOff();
    turnCycleOff();
    turnRainbowOff();
}

function turnDiscoOff() {
    discoState = 0;
}

function disco() {
    if (discoIndex == 0) {
        changeGlow(1, 0, 0)
        discoIndex++;
    }
    else if (discoIndex == 1) {
        changeGlow(0, 1, 0)
        discoIndex++;
    }
    else if (discoIndex == 2) {
        changeGlow(1, 1, 0)
        discoIndex++;
    }
    else if (discoIndex == 3) {
        changeGlow(0, 1, 1)
        discoIndex++;
    }
    else if (discoIndex == 4) {
        changeGlow(1, 0, 1)
        discoIndex++;
    }
    else if (discoIndex == 5) {
        changeGlow(0, 0, 1)
        discoIndex = 0;
    }
}

function changeGlow(red = 0, green = 0, blue = 0) {
    var index = count;
    while (index < colors.length) {
        colors[index][0] = red;
        colors[index][1] = green;
        colors[index][2] = blue;
        index++;
    }
}

function changeGlowTop(red = 0, green = 0, blue = 0) {
    var index = count;
    while (index < topIndex) {
        colors[index][0] = red;
        colors[index][1] = green;
        colors[index][2] = blue;
        index++;
    }
}

function changeGlowRight(red = 0, green = 0, blue = 0) {
    var index = topIndex;
    while (index < rightIndex) {
        colors[index][0] = red;
        colors[index][1] = green;
        colors[index][2] = blue;
        index++;
    }
}
function changeGlowBottom(red = 0, green = 0, blue = 0) {
    var index = rightIndex;
    while (index < bottomIndex) {
        colors[index][0] = red;
        colors[index][1] = green;
        colors[index][2] = blue;
        index++;
    }
}

function changeGlowLeft(red = 0, green = 0, blue = 0) {
    var index = bottomIndex;
    while (index < leftIndex) {
        colors[index][0] = red;
        colors[index][1] = green;
        colors[index][2] = blue;
        index++;
    }
}

function addFace(x, y, index) {
    var vertex1 = vec3(x, y, 0);
    vertices.push(vertex1);
    colors.push(vec3(0.1, 0.1, 0.1));
    var vertex2 = vec3(x + 0.01, y, 0);
    vertices.push(vertex2);
    colors.push(vec3(0.1, 0.1, 0.1));
    var vertex3 = vec3(x, y + 0.01, 0);
    vertices.push(vertex3);
    colors.push(vec3(0.1, 0.1, 0.1));
    var vertex4 = vec3(x + 0.01, y + 0.01, 0);
    vertices.push(vertex4);
    colors.push(vec3(0.1, 0.1, 0.1));
    faces.push(index); faces.push(index + 1); faces.push(index + 2); faces.push(index + 1); faces.push(index + 2); faces.push(index + 3);

}
function createStrip() {
    var start = vertices[0];

    var x = -0.753;
    var y = 0.353;
    var xend = -0.753;
    var yend = 0.353;
    var index = count;

    while (x <= -1 * xend + 0.01) {
        addFace(x, y, index);
        x = x + 0.01;

        index = index + 4;
    }
    topIndex = index;
    x = x - 0.01
    while (y >= -1 * yend - 0.015) {
        addFace(x, y, index);
        y = y - 0.01;
        index = index + 4;
    }
    rightIndex = index;

    y = y + 0.01
    while (x >= xend - 0.01) {
        addFace(x, y, index);
        x = x - 0.01;
        index = index + 4;
    }
    bottomIndex = index;

    x = x + 0.01;
    while (y <= yend) {
        addFace(x, y, index);
        y = y + 0.01;
        index = index + 4;
    }
    leftIndex = index;


}

function createTexture(gl, size) {
    var texture = gl.createTexture();
    //set properties for the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.offsetWidth, size.offsetHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    return texture;
}

function createFramebuffer(gl, size) {
    var buffer = gl.createFramebuffer();
    //bind framebuffer to texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    var texture = createTexture(gl, size);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    return {
        texture: texture,
        buffer: buffer
    };
}

window.onload = function init() {
    alert("Welcome to my sunbmission for RenderJam.\nI am rendering an RGB mousepad with 5 different strip modes.\nDiscoMode\nBreatheMode\nCycleMode\nRainbowMode\nFlat On\nUse the toggle button to turn on these modes and use the bars to adjust speed for each mode.\nUse the Turn Off button to shut RGB off.")
    createStrip();
    //movetoCenter();

    let canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true, premultipliedAlpha: true })
    if (!gl) alert("WebGL 2.0 isn't available");

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    render();
}
function sleep(ms) {
    ms = parseInt(ms);
    var now = new Date();
    var nowMs = now.valueOf();

    var endMs = nowMs + ms;

    while (endMs > nowMs) {
        nowMs = new Date().valueOf();
    }

    return true;
}


function render(depth = true) {


    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);


    // Associate out shader variables with our data buffer
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    let vColors = gl.getAttribLocation(program, "vColors");
    gl.vertexAttribPointer(vColors, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColors);

    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);


    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0, 0, 0, 1);
    // gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    gl.drawElements(gl.TRIANGLES, faces.length, gl.UNSIGNED_SHORT, 0);
    if (discoState == 1) {
        disco();
        sleep(discoSpeed);
    }

    if (breatheState == 1) {
        breathe();
        sleep(breatheSpeed);
    }

    if (cycleState == 1) {
        cycle();
        sleep(cycleSpeed);
    }

    if (rainbowState == 1) {
        rainbow();
        sleep(rainbowSpeed);
    }
    requestAnimationFrame(render);
}

