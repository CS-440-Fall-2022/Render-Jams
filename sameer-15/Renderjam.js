
"use strict";
let gl;  // WebGL "context"
let indices;
let canvas;
let program;
let vertices;


var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 2; //default
var theta = [0, 0, 0]; //rotation for each axis

var rotspeed = 0.4;
let vtx = [];
var thetaLoc;
let flag = 0;
let toggle = 0;

let frame_count = 0 ;

let slider = 1;

let r = vec3(1,0,0);
let g = vec3(0,1,0);
let b = vec3(0,0,1);
let w = vec3(1, 1,1);

let colors = [r, g, b, w, r, g, b, w, vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random())];
;

window.onload = function init()
{
    
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    // Compute data.

    vertices = [vec3(-0.10, -0.1,0.1),vec3(0.1, -0.1, 0.1),vec3(-0.1, 0.1,0.1),vec3(0.1, 0.1, 0.1),    vec3(-0.10, -0.1,-0.1),vec3(0.1, -0.1, -0.1),vec3(-0.1, 0.1,-0.1),vec3(0.1, 0.1, -0.1),
        vec3(-0.25, -0.25,0.25),vec3(0.25, -0.25, 0.25),vec3(-0.25, 0.25,0.25),vec3(0.25, 0.25, 0.25),    vec3(-0.25, -0.25,-0.25),vec3(0.25, -0.25, -0.25),vec3(-0.25, 0.25,-0.25),vec3(0.25, 0.25, -0.25) ];

    indices = [0,1,2,3,2,0, 3,1,    4,5,6,7,6,4, 7,5,  0,4,1,5,2,6,3,7,
               8,9,10,11,10,8, 11,9,    12,13,14,15,14,12, 15,13,  8,12,9,13,10,14,11,15,
               0,8,1,9,2,10,3,11,4,12,5,13,6,14,7,15];
    

    draw();
    


    thetaLoc = gl.getUniformLocation(program, "uTheta");
    document.getElementById("myRange").oninput = function() {
        slider = this.value;
        for(let i = 0 ; i<vertices.length; i++){
            vtx.push(vertices[i]);
            vertices[i] = vec3(vertices[i][0]*this.value,vertices[i][1]*this.value,vertices[i][2]*this.value);
        }
        colors = [r, g, b, w, r, g, b, w, vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random())];

        draw();
        vertices = vtx;
        vtx = [];
    }

    function doWhichKey(e) { 
        //get the key that is pressed
        e = e || window.event; 
        let charCode = e.keyCode || e.which; 
        return String.fromCharCode(charCode); 
      } 
      
      window.addEventListener('keypress', function (e) { 
        
        if (doWhichKey(e) == 't' || doWhichKey(e) == 'T' ){ //check is pressed key is T or t
            
            if(toggle == 0){
                toggle =1;
                document.getElementById("header").innerHTML = "CMY Model!"; //change header 
                r = vec3(0,1,1);
                g = vec3(1,0,1);
                b = vec3(1,1,0);
                w = vec3(0, 0,0);

                colors = [r, g, b, w, r, g, b, w, vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random())];
                for(let i = 0 ; i<vertices.length; i++){
                    vtx.push(vertices[i]);
                    vertices[i] = vec3(vertices[i][0]*slider,vertices[i][1]*slider,vertices[i][2]*slider);
                }

                draw();
                vertices = vtx;
                vtx = [];

            }
            else if(toggle == 1){
                toggle = 0;
                document.getElementById("header").innerHTML = "RGB Model!"; //change header
                r = vec3(1,0,0);
                g = vec3(0,1,0);
                b = vec3(0,0,1);
                w = vec3(1, 1,1);
                colors = [r, g, b, w, r, g, b, w, vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random()), vec3(Math.random(),Math.random(),Math.random())];
                for(let i = 0 ; i<vertices.length; i++){
                    vtx.push(vertices[i]);
                    vertices[i] = vec3(vertices[i][0]*slider,vertices[i][1]*slider,vertices[i][2]*slider);
                }    
                draw();
                vertices = vtx;
                vtx = [];
                
            }
    
    
            }
      }, false);




    render();
}

function draw(){
    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
    let vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vPosition );
    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
    let vColors = gl.getAttribLocation( program, "vColors" );
    gl.vertexAttribPointer( vColors, 3, gl.FLOAT, false, 0    , 0 );
    gl.enableVertexAttribArray( vColors );
    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );
    gl.uniform3fv(thetaLoc, theta);
}



function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    theta[0] += rotspeed;
    theta[1]+=rotspeed;
    theta[2] += rotspeed;
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
    frame_count++;
    requestAnimationFrame(render);

}