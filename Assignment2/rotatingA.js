"use strict";

var canvas;
var gl;
var frames = 1;

var theta = 0.0;
var thetaLoc;
var color = [0, 0, 0, 0];
var colorLocation;
window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available ");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    //  Set Background color of the 
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(-this.Math.sqrt(2) / 2, -this.Math.sqrt(2) / 2),
        vec2(0, 1),
        vec2(this.Math.sqrt(2) / 2, -this.Math.sqrt(2) / 2),
        vec2(-0.415, 0.0),
        vec2(0.415, 0.0),
    ];

    var bufferId = gl.createBuffer();
    this.gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    this.gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    colorLocation = gl.getUniformLocation(program, "u_color");
    var vPosition = gl.getAttribLocation(program, "vPosition");
    this.gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(vPosition);
    thetaLoc = gl.getUniformLocation(program, "theta");
    render();
};

function changeColor() {
    return vec4(Math.random(), Math.random(), Math.random(), 1);
}

function render() {
    gl.uniform4fv(colorLocation, changeColor());
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(thetaLoc, theta);
    theta += 0.10/frames;

    //  Render A shape
    gl.drawArrays(gl.LINE_STRIP, 0, 3);
    
    //  Render A band
    gl.drawArrays(gl.LINE_STRIP, 3, 2);
    //  Input from user
    frames = +document.getElementById("fps").value;
    window.requestAnimationFrame(render);
    sleep(1000/frames);
    console.log(frames);
}

//  Delay method
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

