var gl; //contexto WebGL
start();

function start() {
  var canvas = document.getElementById("glcanvas");
  gl = initWebGL(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
    gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
    gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Limpiar el buffer de color asi como el de profundidad
  }
}

function initWebGL(canvas) {
    gl = null;
  
    try {
      // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {
        
    }
  
    if (!gl) {
      alert("Tu navegador no soporta WebGL.");
      gl = null;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    return gl;
  }
  