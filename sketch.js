let currentColor = "#000000";
var pointsArray = [];
var savePoints = [];
var isPainting = true;
var isEditing = true;
var controlAction = false;
var userImage;

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(5, 30);
  slider.position(-50, 210);
  slider.size(150, 50);
  slider.style('transform', 'rotate(270deg)');

  clearButton = createButton("");
  clearButton.position(15, 585);
  clearButton.size(81, 50);
  clearButton.mousePressed(clearPoints);
  clearButton.addClass('btn');
  clearButton.addClass('btn-default');
  clearButton.html("Clear <i class='fas fa-trash'></i>");

  paintButton = createButton("");
  paintButton.position(15, 335);
  paintButton.size(40, 50);
  paintButton.mousePressed(function() {
    getFocus(this);
    isPainting = true;
    isEditing = true;
  });
  paintButton.addClass('btn');
  paintButton.addClass('btn-default');
  paintButton.html("<i class='fas fa-paint-brush'></i>");

  eraseButton = createButton("");
  eraseButton.position(60, 335);
  eraseButton.size(40, 50);
  eraseButton.mousePressed(function() {
    getFocus(this);
    isPainting = false;
    isEditing = true;
  });
  eraseButton.addClass('btn');
  eraseButton.addClass('btn-default');
  eraseButton.html("<i class='fas fa-eraser'></i>");
  
  getColorButton = createButton("");
  getColorButton.position(15, 390);
  getColorButton.size(40, 50);
  getColorButton.mousePressed(function() {
    getFocus(this);
    isEditing = false;
  });
  getColorButton.addClass('btn');
  getColorButton.addClass('btn-default');
  getColorButton.html("<i class='fas fa-eye-dropper'></i>");
  
  getFocus(paintButton);

  undoButton = createButton("");
  undoButton.position(15, 455);
  undoButton.size(40, 50);
  undoButton.mousePressed(undo);
  undoButton.addClass('btn');
  undoButton.addClass('btn-default');
  undoButton.html("<i class='fas fa-undo'></i>");
  
  redoButton = createButton("");
  redoButton.position(60, 455);
  redoButton.size(40, 50);
  redoButton.mousePressed(redo);
  redoButton.addClass('btn');
  redoButton.addClass('btn-default');
  redoButton.html("<i class='fas fa-redo'></i>");
  
  downloadButton = createButton("");
  downloadButton.position(15, 515);
  downloadButton.size(40, 50);
  downloadButton.mousePressed(savePaint);
  downloadButton.addClass('btn');
  downloadButton.addClass('btn-default');
  downloadButton.html("<i class='fas fa-download'></i>");
  
  fileInput = createFileInput(loadPaint);
  
  loadButton = createButton("");
  loadButton.position(60, 515);
  loadButton.size(40, 50);
  loadButton.addClass('btn');
  loadButton.addClass('btn-default');
  loadButton.addClass('btn-file');
  loadButton.html("<i class='fas fa-upload'></i>");
  
  fileInput.parent(loadButton);
}

function draw() {
  background(255);
  fill("#D7D3D3");
  strokeWeight(1);
  rect(0, 0, 120, displayHeight);
  if (userImage) { 
    image(userImage, 120, 0, width - 120, height); 
  } 
  sliderEllipses();
  stroke('#000');
  line(120, 0, 120, displayHeight);

  if (isEditing && mouseIsPressed && mouseX > 140 && pmouseX > 140) {
    var color = isPainting ? currentColor : "#FFF";
    pointsArray.push(new Point(pmouseX, pmouseY, color, slider.value()));
    pointsArray.push(new Point(mouseX, mouseY, color, slider.value()));
  }

  displayLines();

}


function sliderEllipses() {
  strokeWeight(1);
  fill(currentColor);
  stroke("#000");

  circle(70, 160, 30);
  circle(70, 190, 23);
  circle(70, 220, 19);
  circle(70, 250, 16.5);
  circle(70, 280, 14);
  circle(70, 300, 5);
}

function displayLines() {
  for (var i = 0; i < pointsArray.length - 1; i += 2) {
    stroke(pointsArray[i].color);
    strokeWeight(pointsArray[i].thickness);
    line(pointsArray[i].x, pointsArray[i].y,
      pointsArray[i + 1].x, pointsArray[i + 1].y);
  }
}

function getFocus(button) {
  switch(button) {
    case paintButton:
      paintButton.addClass('animated-border');
      eraseButton.removeClass('animated-border');
      getColorButton.removeClass('animated-border');
      break;
    case eraseButton:
      paintButton.removeClass('animated-border');
      eraseButton.addClass('animated-border');
      getColorButton.removeClass('animated-border');
      break;
    case getColorButton:
      paintButton.removeClass('animated-border');
      eraseButton.removeClass('animated-border');
      getColorButton.addClass('animated-border');
  }
}

function clearPoints() {
  savePoints = [];
  pointsArray = [];
  userImage = null;
}

function keyPressed() {
  if (keyCode == CONTROL) controlAction = true;
  if (keyCode == 90 && controlAction) {
    undo();
  }
  if (keyCode == 89 && controlAction) {
    redo();
  }
}

function keyReleased() {
  if (keyCode == CONTROL) controlAction = false;
}

function undo() {
  var aux = pointsArray.pop();
  if (aux != undefined) {
    savePoints.push(aux);
  }
  aux = pointsArray.pop();
  if (aux != undefined) {
    savePoints.push(aux);
  }
}

function redo() {
  var aux = savePoints.pop();
  if (aux != undefined) {
    pointsArray.push(aux);
  }
  aux = savePoints.pop();
  if (aux != undefined) {
    pointsArray.push(aux);
  }
}

function savePaint() {
  to_save = get(140, 0, windowWidth - 140, windowHeight);
  to_save.save("paintPicture.jpg");
}

function loadPaint(file) {
  if (file.type === 'image') { 
    userImage = createImg(file.data, ""); 
    userImage.hide(); 
  } 
}

function mouseClicked() {
  if(!isEditing) {
    currentColor = get(mouseX, mouseY);
    if(pickr.setColor(rgb2hex(currentColor), true)) {
     pickr.applyColor(true); 
    }
  }
}

function rgb2hex(rgb){
  let rgba = color(currentColor).levels;
  let hexCol = `#${hex(rgba[0], 2)}${hex(rgba[1], 2)}${hex(rgba[2], 2)}`;
  return hexCol;
}