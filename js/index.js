var gl; //contexto WebGL
start();

function start() {
  var canvas = document.getElementById("glcanvas");
  gl = initWebGL(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.5, 0.0, 1.0);                      // Establecer el color base en verde, totalmente opaco
    gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
    gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Limpiar el buffer de color asi como el de profundidad
  }
}

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
      alert("Tu navegador no soporta WebGL.");
      gl = null;
    }
    else{
    paragraph.innerHTML = "Congratulations! Your browser supports WebGL. ";
    }

    return gl;
  }
  