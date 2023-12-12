/***************************************
  *  Filename: sierpinski_triangle.js
  *
  *  Content: Generates a Sierpinski triangle fractal using recursion
  *
  ***************************************/

// Canvas variables
var canvas;
var ctx;
var width;
var height;

// Triangle variables
var initialTriangleSize = 500;
var initialTriangleHeight = initialTriangleSize * Math.sin(Math.PI / 3);
var initialTrianglePoints = [
  { x: 0, y: initialTriangleHeight },
  { x: initialTriangleSize / 2, y: 0 },
  { x: initialTriangleSize, y: initialTriangleHeight }
];

// Recursive function to draw a Sierpinski triangle
function drawSierpinskiTriangle(points, depth) {
  if (depth === 0) {
    drawTriangle(points);
  } else {
    var midPoints = getMidPoints(points);
    
    drawSierpinskiTriangle([points[0], midPoints[0], midPoints[1]], depth - 1);
    drawSierpinskiTriangle([midPoints[0], points[1], midPoints[2]], depth - 1);
    drawSierpinskiTriangle([midPoints[1], midPoints[2], points[2]], depth - 1);
  }
}

// Function to calculate the midpoints of a triangle
function getMidPoints(points) {
  var midPoints = [
    { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 },
    { x: (points[1].x + points[2].x) / 2, y: (points[1].y + points[2].y) / 2 },
    { x: (points[2].x + points[0].x) / 2, y: (points[2].y + points[0].y) / 2 }
  ];

  return midPoints;
}

// Function to draw a triangle
function drawTriangle(points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.closePath();
  ctx.stroke();
}

// Initialize canvas and context
function init() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;

  drawSierpinskiTriangle(
    initialTrianglePoints,
    Math.floor(Math.log2(height / initialTriangleHeight))
  );
}

// Call the init function on window load
window.onload = init;