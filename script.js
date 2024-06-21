let grid = document.querySelector('.grid');
let grid_button = document.getElementById('submit-grid');
let cleargrid_button = document.getElementById('clear-grid');
let grid_width = document.getElementById('width-range');
let grid_height = document.getElementById('height-range');
let color_button = document.getElementById('color-input');
let erase_button = document.getElementById('erase-button');
let paint_button = document.getElementById('paint-button');
let button_stroke1 = document.getElementById('small');
let button_stroke2 = document.getElementById('med');
let button_stroke3 = document.getElementById('large');
let width_value = document.getElementById('width-value');
let height_value = document.getElementById('height-value');
let title = document.getElementById('title');

let events = {
  down: 'mousedown',
  move: 'mousemove',
  up: 'mouseup',
};

let draw = false;
let erase = false;
let brush_size = 1;

grid_button.addEventListener('click', () => {
  // screen change
  title.classList.add('hidden');
  document.querySelector('.begin-options').classList.add('hidden');
  document.querySelector('.outer-wrapper').classList.add('hidden');
  document.querySelector('.draw-wrapper').classList.remove('hidden');

  const grid_backdrop = document.createElement('div');
  grid_backdrop.classList.add('grid-backdrop');
  grid.innerHTML = '';
  grid.appendChild(grid_backdrop);

  // construct grid, each square gets id
  let count = 0;
  for (let i = 0; i < grid_height.value; i++) {
    count += 2;
    let div = document.createElement('div');
    div.classList.add('grid-row');

    for (let j = 0; j < grid_width.value; j++) {
      count += 2;
      let col = document.createElement('div');
      col.classList.add('grid-col');
      col.setAttribute('id', `gridCol${count}`);
      col.addEventListener(events.down, () => {
        draw = true;
        draw_pixels(col);
      });
      col.addEventListener(events.move, (e) => {
        let elementId = document.elementFromPoint(e.clientX, e.clientY).id;
        checker(elementId);
      });
      col.addEventListener(events.up, () => {
        draw = false;
      });
      div.appendChild(col);
    }
    grid_backdrop.appendChild(div);
  }
});

cleargrid_button.addEventListener('click', () => {
  // iterate through the grid, set color to transparent
  let grid_cols = document.querySelectorAll('.grid-col');
  grid_cols.forEach((col) => {
    col.style.backgroundColor = 'transparent';
  });
});

erase_button.addEventListener('click', () => {
  erase = true;
});

paint_button.addEventListener('click', () => {
  erase = false;
});

document.querySelectorAll('.stroke-button').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.stroke-button').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

document.querySelector('.draw-wrapper').addEventListener('mouseleave', () => {
  draw = false;
});

button_stroke1.addEventListener('click', () => {
  brush_size = 1;
});

button_stroke2.addEventListener('click', () => {
  brush_size = 2;
});

button_stroke3.addEventListener('click', () => {
  brush_size = 3;
});

grid_width.addEventListener('input', () => {
  width_value.innerHTML = grid_width.value;
});

grid_height.addEventListener('input', () => {
  height_value.innerHTML = grid_height.value;
});

window.onload = () => {
  grid_width.value = 1;
  grid_height.value = 1;
  width_value.innerHTML = '20';
  height_value.innerHTML = '20';
};

function draw_pixels(col) {
  let id = parseInt(col.id.replace("gridCol", "")); // Extract the numerical part of the id
  let row = Math.floor(id / (grid_width.value * 2));
  let colIndex = (id % (grid_width.value * 2)) / 2;

  for (let i = 0; i < brush_size; i++) {
    for (let j = 0; j < brush_size; j++) {
      let rowOffset = row + i;
      let colOffset = colIndex + j;
      let index = (rowOffset * grid_width.value * 2) + (colOffset * 2);
      let pixelId = `gridCol${index}`;
      let pixel = document.getElementById(pixelId);
      if (pixel) {
        pixel.style.backgroundColor = erase ? 'transparent' : color_button.value;
      }
    }
  }
}

function checker(elementId) {
  if (draw) {
    let element = document.getElementById(elementId);
    if (element) {
      draw_pixels(element);
    }
  }
}