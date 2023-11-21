import {vec2, vec3, vec4, mat4, subtract, mult, translate, rotate, scale4, lookAt, ortho, perspective, cross, flatten} from "./Common/MV.js";
import {WebGLUtils} from "./Common/myWebGLUtils.js";
import {initShaders} from "./Common/initShaders.js";
import SaveLoadHandler from "./SaveLoadHandler.js";


var canvas;
var gl;
var program;

var projectionMatrix; 
var modelViewMatrix;
var instanceMatrix;

var modelViewMatrixLoc;
var modelViewLoc;


var headID = 0;

var leg1UpprID = 1;
var leg1uppr_angle1 = 1;
var leg1uppr_angle2 = 2

var leg1MiddleID = 3
var leg1middle_angle1 = 3;
var leg1middle_angle2 = 4;

var leg1LowerID = 5;
var leg1lower_angle1 = 5;
var leg1lower_angle2 = 6;

var leg2UpprID = 7;
var leg2uppr_angle1 = 7;
var leg2uppr_angle2 = 8;

var leg2MiddleID = 9;
var leg2middle_angle1 = 9;
var leg2middle_angle2 = 10;

var leg2LowerID = 11;
var leg2lower_angle1 = 11;
var leg2lower_angle2 = 12;

var leg3UpprID = 13;
var leg3uppr_angle1 = 13;
var leg3uppr_angle2 = 14;

var leg3MiddleID = 15;
var leg3middle_angle1 = 15;
var leg3middle_angle2 = 16;

var leg3LowerID = 17;
var leg3lower_angle1 = 17;
var leg3lower_angle2 = 18;

var leg4UpprID = 19;
var leg4uppr_angle1 = 19;
var leg4uppr_angle2 = 20;

var leg4MiddleID = 21;
var leg4middle_angle1 = 21;
var leg4middle_angle2 = 22;

var leg4LowerID = 23;
var leg4lower_angle1 = 23;
var leg4lower_angle2 = 24;

var leg5UpprID = 25;
var leg5uppr_angle1 = 25;
var leg5uppr_angle2 = 26;

var leg5MiddleID = 27;
var leg5middle_angle1 = 27;
var leg5middle_angle2 = 28;

var leg5LowerID = 29;
var leg5lower_angle1 = 29;
var leg5lower_angle2 = 30;

var leg6UpprID = 31;
var leg6uppr_angle1 = 31;
var leg6uppr_angle2 = 32;

var leg6MiddleID = 33;
var leg6middle_angle1 = 33;
var leg6middle_angle2 = 34;

var leg6LowerID = 35;
var leg6lower_angle1 = 35;
var leg6lower_angle2 = 36;

var leg7UpprID = 37;
var leg7uppr_angle1 = 37;
var leg7uppr_angle2 = 38;

var leg7MiddleID = 39;
var leg7middle_angle1 = 39;
var leg7middle_angle2 = 40;

var leg7LowerID = 41;
var leg7lower_angle1 = 41;
var leg7lower_angle2 = 42;

var leg8UpprID = 43;
var leg8uppr_angle1 = 43;
var leg8uppr_angle2 = 44;

var leg8MiddleID = 45;
var leg8middle_angle1 = 45;
var leg8middle_angle2 = 46;

var leg8LowerID = 47;
var leg8lower_angle1 = 47;
var leg8lower_angle2 = 48;

var leg1uppr_angle3 = 49;
var leg1middle_angle3 = 50;
var leg1lower_angle3 = 51;

var leg2uppr_angle3 = 52;
var leg2middle_angle3 = 53;
var leg2lower_angle3 = 54;

var leg3uppr_angle3 = 55;
var leg3middle_angle3 = 56;
var leg3lower_angle3 = 57;

var leg4uppr_angle3 = 58;
var leg4middle_angle3 = 59;
var leg4lower_angle3 = 60;

var leg5uppr_angle3 = 61;
var leg5middle_angle3 = 62;
var leg5lower_angle3 = 63;

var leg6uppr_angle3 = 64;
var leg6middle_angle3 = 65;
var leg6lower_angle3 = 66;

var leg7uppr_angle3 = 67;
var leg7middle_angle3 = 68;
var leg7lower_angle3 = 69;

var leg8uppr_angle3 = 70;
var leg8middle_angle3 = 71;
var leg8lower_angle3 = 72;

//var headX = 73;
//var headZ = 74;

var headHeight = 3.5;
var headWidth = 3;
var legUpperHeight = 3;
var legUpperWidth = 0.3;
var legMiddleHeight = 2;
var legMiddleWidth = 0.2;
var legLowerHeight = 2;
var legLowerWidth = 0.1;


class Node{
    constructor(transform, render, sibling, child, height, width){
        this.transform = transform;
        this.render = render; 
        this.sibling = sibling; 
        this.child = child;
        
        this.height = height;
        this.width = width;
    }
}



var numLegs = 8;
var numNodes = 1 + 3*numLegs;//1 for head, 3*numLegs for legs
var nodeIds = [headID, leg1UpprID, leg1MiddleID, leg1LowerID,
                        leg2UpprID, leg2MiddleID, leg2LowerID,
                        leg3UpprID, leg3MiddleID, leg3LowerID,
                        leg4UpprID, leg4MiddleID, leg4LowerID,
                        leg5UpprID, leg5MiddleID, leg5LowerID,
                        leg6UpprID, leg6MiddleID, leg6LowerID,
                        leg7UpprID, leg7MiddleID, leg7LowerID,
                        leg8UpprID, leg8MiddleID, leg8LowerID]

var theta = [0, 
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
            ]
console.log(theta.length)
 

var stack = [];
var figure = []; // array holding figure elements
for( var i=0; i<numNodes; i++) figure[i] = "placeholder";


function initNodes(Id) {
    var m = mat4();
    switch(Id) {
        case headID:
        //case headX:
        //case headZ:
            //m = mult(m, rotate(theta[headX], 1, 0, 0))
            m = mult(m, rotate(theta[headID], 0, 1, 0));
            //m = mult(m, rotate(theta[headZ], 0, 0, 1));
            figure[headID] = new Node( m, head, null, leg1uppr_angle1 );
        break;

        case leg1uppr_angle1:
        case leg1uppr_angle2:
        case leg1uppr_angle3:
            m = translate(-0.5*headWidth, 0.2, 0.5*headWidth);
            m = mult(m, rotate(theta[leg1uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg1uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg1uppr_angle3], 0, 0, 1));
            figure[leg1uppr_angle1] = new Node( m, upperLeg, leg2UpprID, leg1middle_angle1);
        break;
                
        case leg1middle_angle1:
        case leg1middle_angle2:
        case leg1middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg1middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg1middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg1middle_angle3], 0, 0, 1));

            figure[leg1middle_angle1] = new Node( m, middleLeg, null, leg1lower_angle1);
        break;
        
        case leg1lower_angle1:
        case leg1lower_angle2:
        case leg1lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg1lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg1lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg1lower_angle3], 0, 0, 1));

            figure[leg1lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Second Leg---------
        case leg2uppr_angle1:
        case leg2uppr_angle2:
        case leg2uppr_angle3:
            m = translate(0, 0.2, 0.5*headWidth);
            m = mult(m, rotate(theta[leg2uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg2uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg2uppr_angle3], 0, 0, 1));
            figure[leg2uppr_angle1] = new Node( m, upperLeg, leg3UpprID, leg2middle_angle1);
        break;
                
        case leg2middle_angle1:
        case leg2middle_angle2:
        case leg2middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg2middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg2middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg2middle_angle3], 0, 0, 1));

            figure[leg2middle_angle1] = new Node( m, middleLeg, null, leg2lower_angle1);
        break;
        
        case leg2lower_angle1:
        case leg2lower_angle2:
        case leg2lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg2lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg2lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg2lower_angle3], 0, 0, 1));

            figure[leg2lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Third Leg---------
        case leg3uppr_angle1:
        case leg3uppr_angle2:
        case leg3uppr_angle3:
            m = translate(0.5*headWidth, 0.2, 0.5*headWidth);
            m = mult(m, rotate(theta[leg3uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg3uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg3uppr_angle3], 0, 0, 1));
            figure[leg3uppr_angle1] = new Node( m, upperLeg, leg4UpprID, leg3middle_angle1);
        break;
                
        case leg3middle_angle1:
        case leg3middle_angle2:
        case leg3middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg3middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg3middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg3middle_angle3], 0, 0, 1));

            figure[leg3middle_angle1] = new Node( m, middleLeg, null, leg3lower_angle1);
        break;
        
        case leg3lower_angle1:
        case leg3lower_angle2:
        case leg3lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg3lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg3lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg3lower_angle3], 0, 0, 1));

            figure[leg3lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Fourth Leg---------
        case leg4uppr_angle1:
        case leg4uppr_angle2:
        case leg4uppr_angle3:
            m = translate(-0.5*headWidth, 0.2, 0);
            m = mult(m, rotate(theta[leg4uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg4uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg4uppr_angle3], 0, 0, 1));
            figure[leg4uppr_angle1] = new Node( m, upperLeg, leg5UpprID, leg4middle_angle1);
        break;
                
        case leg4middle_angle1:
        case leg4middle_angle2:
        case leg4middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg4middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg4middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg4middle_angle3], 0, 0, 1));

            figure[leg4middle_angle1] = new Node( m, middleLeg, null, leg4lower_angle1);
        break;
        
        case leg4lower_angle1:
        case leg4lower_angle2:
        case leg4lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg4lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg4lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg4lower_angle3], 0, 0, 1));

            figure[leg4lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Fifth Leg---------
        case leg5uppr_angle1:
        case leg5uppr_angle2:
        case leg5uppr_angle3:
            m = translate(0.5*headWidth, 0.2, 0);
            m = mult(m, rotate(theta[leg5uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg5uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg5uppr_angle3], 0, 0, 1));
            figure[leg5uppr_angle1] = new Node( m, upperLeg, leg6UpprID, leg5middle_angle1);
        break;
                
        case leg5middle_angle1:
        case leg5middle_angle2:
        case leg5middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg5middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg5middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg5middle_angle3], 0, 0, 1));

            figure[leg5middle_angle1] = new Node( m, middleLeg, null, leg5lower_angle1);
        break;
        
        case leg5lower_angle1:
        case leg5lower_angle2:
        case leg5lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg5lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg5lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg5lower_angle3], 0, 0, 1));

            figure[leg5lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Sixth Leg---------
        case leg6uppr_angle1:
        case leg6uppr_angle2:
        case leg6uppr_angle3:
            m = translate(-0.5*headWidth, 0.2, -0.5*headWidth);
            m = mult(m, rotate(theta[leg6uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg6uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg6uppr_angle3], 0, 0, 1));
            figure[leg6uppr_angle1] = new Node( m, upperLeg, leg7UpprID, leg6middle_angle1);
        break;
                
        case leg6middle_angle1:
        case leg6middle_angle2:
        case leg6middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg6middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg6middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg6middle_angle3], 0, 0, 1));

            figure[leg6middle_angle1] = new Node( m, middleLeg, null, leg6lower_angle1);
        break;
        
        case leg6lower_angle1:
        case leg6lower_angle2:
        case leg6lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg6lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg6lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg6lower_angle3], 0, 0, 1));

            figure[leg6lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Seventh Leg---------
        case leg7uppr_angle1:
        case leg7uppr_angle2:
        case leg7uppr_angle3:
            m = translate(0, 0.2, -0.5*headWidth);
            m = mult(m, rotate(theta[leg7uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg7uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg7uppr_angle3], 0, 0, 1));
            figure[leg7uppr_angle1] = new Node( m, upperLeg, leg8UpprID, leg7middle_angle1);
        break;
                
        case leg7middle_angle1:
        case leg7middle_angle2:
        case leg7middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg7middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg7middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg7middle_angle3], 0, 0, 1));

            figure[leg7middle_angle1] = new Node( m, middleLeg, null, leg7lower_angle1);
        break;
        
        case leg7lower_angle1:
        case leg7lower_angle2:
        case leg7lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg7lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg7lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg7lower_angle3], 0, 0, 1));

            figure[leg7lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
        // -------Eighth Leg---------
        case leg8uppr_angle1:
        case leg8uppr_angle2:
        case leg8uppr_angle3:
            m = translate(0.5*headWidth, 0.2, -0.5*headWidth);
            m = mult(m, rotate(theta[leg8uppr_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg8uppr_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg8uppr_angle3], 0, 0, 1));
            figure[leg8uppr_angle1] = new Node( m, upperLeg, null, leg8middle_angle1);
        break;
                
        case leg8middle_angle1:
        case leg8middle_angle2:
        case leg8middle_angle3:
            m = translate(0, legUpperHeight, 0.0);
            m = mult(m, rotate(theta[leg8middle_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg8middle_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg8middle_angle3], 0, 0, 1));

            figure[leg8middle_angle1] = new Node( m, middleLeg, null, leg8lower_angle1);
        break;
        
        case leg8lower_angle1:
        case leg8lower_angle2:
        case leg8lower_angle3:
            m = translate(0, legMiddleHeight, 0.0);

            m = mult(m, rotate(theta[leg8lower_angle1], 1, 0, 0))
            m = mult(m, rotate(theta[leg8lower_angle2], 0, 1, 0));
            m = mult(m, rotate(theta[leg8lower_angle3], 0, 0, 1));

            figure[leg8lower_angle1] = new Node( m, lowerLeg, null, null);
            
        break;
    }

}


function traverse(Id) {
    if(Id == null) return; 
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    figure[Id].render();
    if(figure[Id].child != null) traverse(figure[Id].child); 
    modelViewMatrix = stack.pop();
    if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
}

//Limbs

var uvs =  [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];
var uv_buffer;
var uv_attribute;
var texture;
var hasTexture;
function initFaceTexture(){
    // here we create buffer and attribute pointer for texture coordinates
    uv_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(uvs), gl.STATIC_DRAW);
            
    // a_texcoord is the name of the attribute inside vertex shader
    uv_attribute = gl.getAttribLocation(program, "a_texcoord");

    // each attribute is made of 2 floats
    gl.vertexAttribPointer(uv_attribute, 2, gl.FLOAT, false, 0, 0) ;
    gl.enableVertexAttribArray(uv_attribute);  
    
    hasTexture = gl.getUniformLocation(program, "aHasTexture");


    // create and bind texture
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // initially texture is 1x1 blue pixel
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));

    // we will load the image asynchronously
    var image = new Image();
    image.src =  "Textures/octopusFace.jpg"; 
    image.addEventListener('load', function() {
        // after the image is loaded, bind it as our texture
        // this requires the file to be on the server with the same origin as our script
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        
        // texture width and heigh should be a power of 2, otherwise you would get an error on this line
        gl.generateMipmap(gl.TEXTURE_2D);
        
        updateNodesAndRender();
    });
              
}
function head() {
    gl.uniform1f(hasTexture, 1.0);
    drawResizedCube(headHeight, headWidth); 
 }
function upperLeg() {
    gl.uniform1f(hasTexture, 0.0);
    drawResizedCube(legUpperHeight, legUpperWidth); 
}
function middleLeg() {
    drawResizedCube(legMiddleHeight, legMiddleWidth);
}
function lowerLeg() {
    drawResizedCube(legLowerHeight, legLowerWidth);
}

//Primitives
var numcubeVertices  = 36; //!Not necessary?
var cubePoints = [];
var cubeVertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];
var cubeNormals = [];
function quad(a, b, c, d) {
    var t1 = subtract(cubeVertices[b], cubeVertices[a]);
    var t2 = subtract(cubeVertices[c], cubeVertices[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
 
 
    cubePoints.push(cubeVertices[a]); 
    cubeNormals.push(normal); 
    cubePoints.push(cubeVertices[b]); 
    cubeNormals.push(normal); 
    cubePoints.push(cubeVertices[c]); 
    cubeNormals.push(normal);   
    cubePoints.push(cubeVertices[a]);  
    cubeNormals.push(normal); 
    cubePoints.push(cubeVertices[c]); 
    cubeNormals.push(normal); 
    cubePoints.push(cubeVertices[d]); 
    cubeNormals.push(normal);    
 }
function cube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}
function drawResizedCube(height, width){
    gl.clear(gl.DEPTH_BUFFER_BIT);

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * height, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(width, height, width) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    //for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
    
    //!This is rendering stuff
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cubeNormals), gl.STATIC_DRAW );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    //!This is rendering stuff
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cubePoints), gl.STATIC_DRAW );
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays( gl.TRIANGLES, 0, numcubeVertices );

    //!The only thing that actually(possibly) changes are the normals
    //calculateAndSendLightValues();
}

//LIGHT STUFF, should be shared
var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

//!MATERIAL STUFF, SHOULD BE EXCLUSIVE TO ONE OBJECT 
var octopusColor = vec4(193.0/255, 74.0/255, 65.0/255, 0);
var materialAmbient = octopusColor;
var materialDiffuse = octopusColor;
var materialSpecular = octopusColor;
var materialShininess = 50.0;

//Shared?... or exclusive?..
var ambientColor, diffuseColor, specularColor;
var projectionMatrixLoc, shininessLoc, lightPositionLoc, specularProductLoc, diffuseProductLoc, ambientProductLoc;

function calculateAndSendLightValues(){
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
 
 
    gl.uniform4fv(ambientProductLoc, flatten(ambientProduct));
    gl.uniform4fv(diffuseProductLoc, flatten(diffuseProduct) );
    gl.uniform4fv(specularProductLoc,flatten(specularProduct) );	
    gl.uniform4fv(lightPositionLoc, flatten(lightPosition) );
    gl.uniform1f(shininessLoc, materialShininess);
 }
 


var vBuffer, vNormal, nBuffer, vPosition;

 

var init = function () {
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );
    //gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.useProgram( program);

    gl.enable(gl.DEPTH_TEST);

    //Initialize the primitive, cube
    cube();
    initFaceTexture();

    //Buffer and matrix stuff
    instanceMatrix = mat4();
    modelViewMatrix = mat4();

    //Init light stuff
    shininessLoc = gl.getUniformLocation(program, "shininess");
    lightPositionLoc = gl.getUniformLocation(program, "lightPosition");
    specularProductLoc = gl.getUniformLocation(program, "specularProduct"); 
    ambientProductLoc = gl.getUniformLocation(program, "ambientProduct");
    diffuseProductLoc = gl.getUniformLocation(program, "diffuseProduct")

    
    //Calculate and send light stuff
    calculateAndSendLightValues();

    //init
    nBuffer = gl.createBuffer();
    vNormal = gl.getAttribLocation( program, "vNormal" );
    vBuffer = gl.createBuffer();

    //Set camera
    //projectionMatrix = ortho(-10.0,10.0,-10.0, 10.0,-10.0,10.0);
    projectionMatrix = ortho(-10, 10, -10, 10, -100, 100);

    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    
    vBuffer = gl.createBuffer();    
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cubePoints), gl.STATIC_DRAW);
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    instantiateArmSliders();
    instantiateHeadSliders();
    instantiateAnimationUI();
    instantiatePresetAnimationUI();
    instantiateLightUI();
    //instantiateSaveLoadButtons();


    updateNodesAndRender();
}
function instantiatePresetAnimationUI(){
    document.getElementById("anim1").addEventListener("click", anim1FlagUpdater);
    document.getElementById("anim2").addEventListener("click", anim2FlagUpdater);
}

function updateNodesAndRender(){
    //Initialize nodes and render
    for(i=0; i<numNodes; i++) initNodes(nodeIds[i]);
    render();
}

function instantiateLightUI(){
    document.getElementById("x+").addEventListener("click", () => (incrementLightLocation(1, 0, 0)));
    document.getElementById("x-").addEventListener("click", () => (incrementLightLocation(-1, 0, 0)));

    document.getElementById("y+").addEventListener("click", () => (incrementLightLocation(0, 1, 0)));
    document.getElementById("y-").addEventListener("click", () => (incrementLightLocation(0, -1, 0)));

    document.getElementById("z+").addEventListener("click", () => (incrementLightLocation(0, 0, 1)));
    document.getElementById("z-").addEventListener("click", () => (incrementLightLocation(0, 0, -1)));
}

window.onload = init;

var render = function() {
    gl.clear(gl.COLOR_BUFFER_BIT );
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    traverse(headID);
}

function setAnimation(dataArr){
    animation = dataArr.slice();
}

var customAnimFlag = false;
function toggleCustomAnimFlag(){
    anim2Flag = false;
    anim1Flag = false;

    if(customAnimFlag == true)
        customAnimFlag = false;
    else{
        customAnimFlag = true;
        animate();
    }
}

var SAVE_LOAD_HANDLER;
var animation = []; //each array in this array is an animation, each array in each animation is a frame fully described by the theta values present within the scene graph
function instantiateAnimationUI(){
    let addButton = document.getElementById("addFrame");
    addButton.addEventListener("click", (event) => (addFrame(event)));
    
    let playButton = document.getElementById("playAnimation");
    playButton.addEventListener("click", (event) => (toggleCustomAnimFlag()));
    //let customs = document.getElementById("customs").getElementsByTagName("button")

    //let n = customs.length;
    //[...customs].map((custom, index) => addFrame(index, n));
    instantiateSaveLoadButtons();
}

function addFrame(event){
    animation.push(theta.slice());
}



async function animate(smoothness = 100.0){
    for (let i = 0; i < animation.length - 1; i++){
        let start = animation[i];
        let end = animation[i+1];
        let delta = [];
        let cur = [];

        for (let frame = 0; frame < start.length; frame++){
            cur.push(start[frame]);
            delta.push((start[frame]-end[frame])/smoothness)
        }

        await animateRecurs(cur, delta, smoothness);

        if (customAnimFlag == false){
            return;
        }
    }
}
async function animateRecurs(cur, delta, smoothness = 100.0, t = 100){
        if (smoothness < 0 || customAnimFlag == false){
            return;
        }

        for (let frame = 0; frame < delta.length; frame++){
            cur[frame] += delta[frame];
        }
        theta = cur.slice();
        console.log(theta)

        updateNodesAndRender();

        setTimeout(() => animateRecurs(cur, delta, smoothness-1, t), t);
}

function incrementLightLocation(x, y, z){
    lightPosition = vec4(lightPosition[0] + x, lightPosition[1] + y, lightPosition[2] + z);
    gl.uniform4fv(lightPositionLoc, flatten(lightPosition) );
    render();
}

function instantiateSaveLoadButtons(){
    //SAVE LOAD HANDLER INIT
    SAVE_LOAD_HANDLER = new SaveLoadHandler(setAnimation); //actually, we don't need init since we are only loading the animation and not actually playing it

    let saveLoad = document.getElementById("SaveLoad");
    let save = saveLoad.getElementsByTagName("button")[0];
    let loadForm = document.getElementById("LoadForm");

    save.addEventListener("click", (event) => (saveHandler(event)));
    loadForm.addEventListener("change", (event) => (loadHandler(event)));
    document.getElementById("Load").addEventListener("submit", (e) => (e.preventDefault()));

    function saveHandler(event){
        //TODO get title from event somehow
        let title = "Animation.txt";
        SAVE_LOAD_HANDLER.save(animation, title);
    }

    function loadHandler(event){
        event.preventDefault();
        var fr = new FileReader();
        fr.onload = () => {
            SAVE_LOAD_HANDLER.load(fr.result);
        }

        fr.readAsText(loadForm.files[0])
    }
}

 

function instantiateHeadSliders(){
    let headSliders = document.getElementById("head");
    const sliders = headSliders.getElementsByTagName("input");
    //!TEMPORARY
    sliders[0].addEventListener("input", (event) => sliderHandler(headID, parseInt(event.target.value)));
    //sliders[1].addEventListener("input", (event) => sliderHandler(headID, parseInt(event.target.value)));
    //sliders[2].addEventListener("input", (event) => sliderHandler(headZ, parseInt(event.target.value)));

}
//Arm Sliders
function instantiateArmSliders(){
    for (let i = 1; i <= numLegs; i++){
        let armSliders = document.getElementById("arm" + i);

        const divs = armSliders.getElementsByTagName("div");
        
        for (let j = 0; j < divs.length; j++){
            const sliders = divs[j].getElementsByTagName("input");
            [...sliders].map((slider, index) => slider.addEventListener("input", (event) => sliderHandler(getId(i, j+1, index+1), parseInt(event.target.value))));
        }        
    }
}

function sliderHandler(id, newValue){
    theta[id] = newValue;
    
    initNodes(id);
    //for(i=0; i<numNodes; i++) initNodes(nodeIds[i]);
    render();
    
}


function getId(armNo, armPartNo,rotationNo){ 
    if (rotationNo != 3){
        let numOfRotations = 2;
        let numOfArmParts = 3;

        return 1 + (armNo-1)*numOfRotations*numOfArmParts + (armPartNo-1)*numOfRotations + rotationNo - 1
    }
    else{
        return 48 + (armNo-1)*3 + armPartNo;
    }
}

//!TODO 
var anim1Flag = false;
function anim1FlagUpdater(){
    anim2Flag = false;
    customAnimFlag = false;

    if(anim1Flag == true)
        anim1Flag = false;
    else{
        anim1Flag = true;
        theta = [60, 
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0];
            init();
        animation1(0);
    }
        
    console.log(anim1Flag);
}
function animation1(time){
    if (!anim1Flag) {
        return;
    }
    console.log("func executed");
    console.log(anim1Flag);
    time += 0.01;
    var adjust;
    var speed = 1;
    var c = time * speed;
    // front upper legs
    adjust = -45 * Math.abs(Math.sin(c)) + 180; // between 180 and 135 degrees
    for(i = 0; i < 3; i++){
        theta[ i*6 + 1] = adjust
    }
    adjust = 45 * Math.abs(Math.sin(c+0.1)); // between 0 and 45 degrees
    // front middle legs
    for(i = 0; i < 3; i++){
        theta[i*6 + 3] = adjust
    }
    adjust = 30 * Math.abs(Math.sin(c+0.1)); // between 0 and 45 degrees
    // front lower legs
    for(i = 0; i < 3; i++){
        theta[i*6 + 5] = adjust
    }
    adjust = 45 * Math.abs(Math.sin(c)); // between 45 and 0 degrees
    // left middle upper leg
    theta[58] = adjust
    
    adjust = -45 * Math.abs(Math.sin(c+0.1));
    // left middle middle leg
    theta[59] = adjust

    adjust = -30 * Math.abs(Math.sin(c+0.1));
    // left middle lower leg
    theta[60] = adjust

    adjust = -45 * Math.abs(Math.sin(c)); // between -45 and 0 degrees
    // right middle upper leg
    theta[61] = adjust
    
    adjust = 45 * Math.abs(Math.sin(c+0.1));
    // right middle middle leg
    theta[62] = adjust

    adjust = 30 * Math.abs(Math.sin(c+0.1));
    // right middle lower leg
    theta [63] = adjust

    adjust = 45 * Math.abs(Math.sin(c)) + 180; // between 180 and 270 degrees
    // back upper legs
    for(i = 5; i < 8; i++){
        theta[ i*6 + 1] = adjust
    }
    adjust = -45 * Math.abs(Math.sin(c+0.1));
    // back middle legs
    for(i = 5; i < 8; i++){
        theta[ i*6 + 3] = adjust
    }
    adjust = -30 * Math.abs(Math.sin(c+0.1));
    // back lower legs
    for(i = 5; i < 8; i++){
        theta[i*6 + 5] = adjust
    }
    updateNodesAndRender();
    setTimeout( () => (animation1(time)), 10);
}
var anim2Flag = false;
function anim2FlagUpdater(){
    anim1Flag = false;
    customAnimFlag = false;

    if(anim2Flag == true)
        anim2Flag = false;
    else{
        anim2Flag = true;
        theta = [0, 
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            180, 0,   0, 0,   0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0];
            init()
        animation2(0);
    }
}
var animation2Innerflag = false;
function animation2(time){
    if (!anim2Flag) {
        return;
    }
    console.log(anim2Flag);
    time += 0.01;
    var adjust;
    var speed = 1;
    var c = time * speed;

    // front left upper x
    //theta[1] = adjust
    // front right upper x
    //theta[13] = adjust

    // front left upper z
    if(theta[64] < 89){
        adjust = 90 * Math.abs(Math.sin(c)); // between 90 and 0 degrees
        theta[64] = adjust
    }
    // front left middle z
    if(theta[65] < 80){
        adjust = 90 * Math.abs(Math.sin(c)); // between 90 and 0 degrees
        theta[65] = adjust
    }   
    
    if (theta[64] > 89 && theta[65] > 80 && !animation2Innerflag) {
        animation2Innerflag = true;
        c = 0;
    }
    // front left lower z
    if (theta[64] > 89 && theta[65] > 80 && animation2Innerflag) {
        adjust = 30 * Math.abs(Math.sin(c*15));
        theta[66] = adjust    
    }
    
    // front right upper z
    if (theta[70] > -89) {
        console.log(theta[70])
        adjust = -90 * Math.abs(Math.sin(c));
        theta[70] = adjust    
    }
    
    /*
    adjust = 45 * Math.abs(Math.sin(c+0.1)); // between 0 and 45 degrees
    // front middle legs
    for(i = 0; i < 3; i++){
        theta[i*6 + 3] = adjust
    }
    adjust = 30 * Math.abs(Math.sin(c+0.1)); // between 0 and 45 degrees
    // front lower legs
    for(i = 0; i < 3; i++){
        theta[i*6 + 5] = adjust
    }*/
    updateNodesAndRender();
    setTimeout( () => (animation2(time)), 10);
}

function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}