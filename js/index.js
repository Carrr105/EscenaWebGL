var gl; //contexto WebGL
var canvas;

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById("glcanvas");
  gl = initWebGL(canvas);

  if (gl) {
    gl.clearColor(0.0, 1.0, 0.0, 1.0);                      // Establecer el color base en verde
    gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
    gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Limpiar el buffer de color asi como el de profundidad
    draw();
  }
});

function initWebGL(canvas) {
    gl = null;
    var paragraph = document.querySelector("p"),
    canvas = document.querySelector("canvas");
  
    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {

    }
  
    if (!gl) {
    paragraph.innerHTML = "Failed to get WebGL context. " 
    + "Your browser or device may not support WebGL.";
      gl = null;
    }
    else{
    paragraph.innerHTML = "Congratulations! Your browser supports WebGL. ";
    }

    return gl;
}

function draw(){
  var vertices = [
    0.0, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0
  ];
  canvas  = document.querySelector("canvas");
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  var indices = [0,1,2];
  var vertCode =
  'attribute vec3 coordinates;' +
		'void main(void)' +
		'{' +
			' gl_Position = vec4(coordinates, 1.0);' +
		'}';

  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW );
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var IndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  var vertShader = gl.createShader (gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  var fragCode = 
  'void main(void)' +
  '{' +
    ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
  '}';

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);

  var shaderProg = gl.createProgram();

  gl.attachShader(shaderProg, vertShader);
  gl.attachShader(shaderProg, fragShader);
  gl.linkProgram(shaderProg);
  gl.useProgram(shaderProg);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, IndexBuffer);
  var coords = gl.getAttribLocation(shaderProg, "coordinates");
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray (coords);

  gl.clearColor(0.0, 1.0, 0.0, 1.0);                      // Establecer el color base en verde
    gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
    gl.viewport(0, 0, canvas.width, canvas.height);                                // Objetos cercanos opacan objetos lejanos
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0); 
}