"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available ");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0)
    ];
    var bufferId = gl.createBuffer();
    this.gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    this.gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation (program, "vPosition");
    this.gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    render();
};

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += 2;
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3); 
    window.requestAnimationFrame(render);
}
