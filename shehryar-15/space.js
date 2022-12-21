/* ******************************************************************************************
References
https://www.cs.unm.edu/~angel/BOOK/INTERACTIVE_COMPUTER_GRAPHICS/SEVENTH_EDITION/CODE/06/wireSphere.js
https://www.cs.unm.edu/~angel/BOOK/INTERACTIVE_COMPUTER_GRAPHICS/SEVENTH_EDITION/CODE/06/shadedCube.js
****************************************************************************************** */ 

"use strict";

let gl;  // WebGL "context"
let canvas;
var refinit;
var program;
var program2;

var positions = [];
var stars = [];
var normals=[];
var colors = [];
var indices = [];

var numTimesToSubdivide = 6; //recursion depth
var index = 0;


var flag = false;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 1; //default
var thetarot = [0, 0, 0]; //rotation for each axis

var rotspeed = 1.0;

var thetaLoc;

var increased=0;
var decreased = 0;

var near = -10;
var far = 10;
var radius = 1.5;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ttop =3.0;
var bbottom = -3.0;

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

var lightPosition = vec4(1.0, -0.8, 0.8, 0.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);

var lightSpecular = vec4(0.0, 0.8, 0.0, 0.0);

var materialAmbient = vec4(0.0, 0.0, 0.0, 0.0);
var materialDiffuse = vec4(1.0,0.5, 0.0, 1.0);
var materialSpecular = vec4(0.0, 0.0, 0.0, 0.0);
var materialShininess = 15.0;

var ctm;
var ambientColor, diffuseColor, specularColor;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var nMatrix, nMatrixLoc;

var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var ambientProduct;
var diffuseProduct;
var specularProduct;


function drawnew(normalsArray, vertices, colors, programme, canvas){
    // Load the data into the GPU and bind to shader variables.//vbuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var normalLoc = gl.getAttribLocation(programme, "aNormal");
    gl.vertexAttribPointer(normalLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);


    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer //aposition -> positionloc
    let vPosition = gl.getAttribLocation( programme, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vPosition );

    // Load the data into the GPU and bind to shader variables. //cBuffer
    /*
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer //colorloc
    let vColors = gl.getAttribLocation( program, "vColors" );
    gl.vertexAttribPointer( vColors, 3, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vColors );
    */

    modelViewMatrixLoc = gl.getUniformLocation(programme, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(programme, "uProjectionMatrix");
    nMatrixLoc = gl.getUniformLocation(programme, "uNormalMatrix");

    gl.uniform4fv( gl.getUniformLocation(programme,
        "uAmbientProduct"),flatten(ambientProduct));
    gl.uniform4fv( gl.getUniformLocation(programme,
        "uDiffuseProduct"),flatten(diffuseProduct));
    gl.uniform4fv( gl.getUniformLocation(programme,
        "uSpecularProduct"),flatten(specularProduct));
    gl.uniform4fv( gl.getUniformLocation(programme,
        "uLightPosition"),flatten(lightPosition));
    gl.uniform1f( gl.getUniformLocation(programme,
        "uShininess"),materialShininess);
  
    thetaLoc = gl.getUniformLocation(programme, "uTheta");
}

function drawstars(vertices, color, ind, programme, canvas){
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer //aposition -> positionloc
    let vPosition = gl.getAttribLocation( programme, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vPosition );

    // Load the data into the GPU and bind to shader variables. //cBuffer
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer //colorloc
    let vColors = gl.getAttribLocation( programme, "vColors" );
    gl.vertexAttribPointer( vColors, 3, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vColors );

    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ind), gl.STATIC_DRAW );

}

function renderstars(){
    //gl.useProgram(program2);
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawElements( gl.POINTS, indices.length, gl.UNSIGNED_SHORT, 0);
    //gl.drawArrays(gl.POINTS,0,3);
}


function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program2);
    for (var i = 0; i<stars.length;i++){
        var loc = vec3(stars[i][0]-(0.001),stars[i][1],stars[i][2]);
        if ((loc[0] <0.35 && loc[0] >-0.35) && (loc[1]<0.25 && loc[1]>-0.31)) {
            stars[i] = vec3(loc[0]-0.1,loc[1],loc[2]); 
        }
        else {
            stars[i] = loc;
        }
        
        if (stars[i][0] < -1){
            stars[i][0] = 1.1;
        } 
    }
    console.log(stars);

    drawstars(stars, colors, indices, program2, canvas);
    renderstars();

    gl.useProgram(program);

    theta += 0.03*dr
    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = ortho(left, right, bbottom, ttop, near, far);
    nMatrix = normalMatrix(modelViewMatrix, true);


    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.uniformMatrix3fv(nMatrixLoc, false, flatten(nMatrix)  );
    
    drawnew(normals,positions, colors, program, canvas);

    for( var i=0; i<index; i+=3)
        gl.drawArrays(gl.TRIANGLES, i, 3);

    if(flag) thetarot[axis] += rotspeed;
    gl.uniform3fv(thetaLoc, thetarot);

    
    requestAnimationFrame(render);
}



function generatestars(){
    var ind = 0;
    for (var i = -1; i<1; i+=0.1){
        for (var j = -1; j<1; j+=0.1){
            var num = Math.floor(Math.random() * 11);
            if (num < 1 && ((i>0.3 || i<-0.3) || (j>0.6 || j<-0.6))){
                stars.push(vec3(i,j,0));
                indices.push(ind);
                colors.push(vec3(1.0,1.0,1.0));
                ind++;
            }

        }
    }
}

function triangle(a, b, c) {

    var t1 = subtract(b, a);
    var t2 = subtract(c, a);
    var normal = normalize(cross(t2, t1));
    normal = vec4(normal[0], normal[1], normal[2], 0.0);

    normals.push(normal);
    normals.push(normal);
    normals.push(normal);


    positions.push(a);
    positions.push(b);
    positions.push(c);

    index += 3;
}

function divideTriangle(a, b, c, count) {
   if (count > 0) {

       var ab = mix( a, b, 0.5);
       var ac = mix( a, c, 0.5);
       var bc = mix( b, c, 0.5);

       ab = normalize(ab, true);
       ac = normalize(ac, true);
       bc = normalize(bc, true);

       divideTriangle(a, ab, ac, count - 1);
       divideTriangle(ab, b, bc, count - 1);
       divideTriangle(bc, c, ac, count - 1);
       divideTriangle(ab, bc, ac, count - 1);
   }
   else {
       triangle(a, b, c);
   }
}

function tetrahedron(a, b, c, d, n) {
   divideTriangle(a, b, c, n);
   divideTriangle(d, c, b, n);
   divideTriangle(a, d, b, n);
   divideTriangle(a, c, d, n);
}



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 ); //canvas color
    //gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    //gl.useProgram( program );

    program2 = initShaders(gl, "vertex-shader2","fragment-shader2");


    positions = [];
    stars = [];
    normals = [];
    colors = [];

    generatestars();

    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

    radius *= 0.5;


    render();


    refinit = init;    
}

function closer(){
    if (increased <2){
        radius *= 2.0;
        increased++;
        decreased--;
    }
}

function further(){
    if (decreased < 1){
        radius *= 0.5;
        decreased++;
        increased--;
    }
}




