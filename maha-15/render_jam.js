"use strict";
// references:
//https://stackoverflow.com/questions/15367165/finding-coordinates-of-koch-curve/15368026#15368026
//https://github.com/nature-of-code/noc-examples-processing/blob/master/chp08_fractals/Exercise_8_02_KochSnowFlake/Exercise_8_02_KochSnowFlake.pde
let points = [];
let colors = []
let gl; // WebGL "context"
window.onload = function init() {
    let canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) alert("WebGL 2.0 isn't available");

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //  Load shaders and initialize attribute buffers
    let n = 13;
    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    let a = 0;
    let b = -1;
    let length = 0.4;
    let angle = 0;
    

    
    
    createPoints(n,a,b,length,angle,points);
    
    
    console.log(colors.length);
    console.log(points.length);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
        
        let vColor = gl.getAttribLocation(program, "aColors");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
        
        
        render();
    };

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINES , 0, points.length);
}
function _createTexture(my_image) {

    // Create a new "texture object"
    var texture_object = gl.createTexture();
  
    gl.bindTexture(gl.TEXTURE_2D, texture_object);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, my_image);
    return texture_object;
  }
function createPoints(depth, x, y, length, angle, points) {
    if (depth<=0)
    return;
    
    // end of current line segment
    let x2 = x + length * Math.sin(angle);
    let y2 = y + length * Math.cos(angle);
    
    // add segment
    points.push(vec3(x,y,-1),vec3(x2, y2,-1));
   
    colors.push(vec3(1,1,1));
    colors.push(vec3(1,1,1));
    
    // create 2 branches
    createPoints(depth-1, x2, y2, length/1.3, angle+Math.PI/7, points);
    createPoints(depth - 1,x2, y2, length/1.3, angle-Math.PI/7, points);
}