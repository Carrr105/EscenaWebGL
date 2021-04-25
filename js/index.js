main();
// base del proyecto es de https://developer.mozilla.org, 
// https://github.com/mdn/content/tree/main/files/en-us/web/api/webgl_api/tutorial
// figuras geometricas creadas por el equipo


function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');

    if (gl === null) {
      alert ("Este navegador no soporta WebGL");
      return;
    }

    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    const cubeBufferInfo = primitives.createCubeWithVertexColorsBufferInfo(gl, 20);

    var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

    var cameraAngleRadians = 40 * Math.PI / 180;
    var fieldOfViewRadians = 60* Math.PI / 180;
    var cameraHeight = 50;

    var cubeUniforms = {
      u_colorMult: [1, 0.5, 0.5, 1],
      u_matrix: m4.identity(),
    };
    var cubeTranslation = [0, 0, 0];

  requestAnimationFrame(drawScene);

function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {
  var matrix = m4.translate(viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2]);
  matrix = m4.xRotate(matrix, xRotation);
  return m4.yRotate(matrix, yRotation);
}

function drawScene(time) {

  time*= 0.0005;


  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
  const cameraPosition= [0,40,100];
  const target = [0, 0, 0];
  const up = [0, 1, 0];
  const cameraMatrix = m4.lookAt(cameraPosition, target, up);
  const viewMatrix = m4.inverse(cameraMatrix);
  const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
  
  var cubeXRotation = 0;
  var cubeYRotation = time;

  // draw cube
  gl.useProgram(programInfo.program);
  webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);

  cubeUniforms.u_matrix = computeMatrix(
    viewProjectionMatrix,
    cubeTranslation,
    cubeXRotation,
    cubeYRotation);
  
   // Set the uniforms we just computed
   webglUtils.setUniforms(programInfo, cubeUniforms);

   gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);

   requestAnimationFrame(drawScene);


    
}

}


