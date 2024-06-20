let grid = document.querySelector('.grid');
let grid_button = document.getElementById('submit-grid');
let cleargrid_button = document.getElementById('clear-grid');
let grid_width = document.getElementById('width-range');
let grid_height = document.getElementById('height-range');
let colorButton = document.getElementById('color-input');
let erase_button = document.getElementById('erase-button');
let paint_button = document.getElementById('paint-button');
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

grid_button.addEventListener('click', () => {

  //screen change
  title.classList.add('hidden');
  document.querySelector('.begin-options').classList.add('hidden');
  document.querySelector('.outer-wrapper').classList.add('hidden');
  document.querySelector('.draw-wrapper').classList.remove('hidden');

  const grid_backdrop = document.createElement('div');
  grid_backdrop.classList.add('grid-backdrop');
  grid.innerHTML = '';
  grid.appendChild(grid_backdrop);

  //construct grid, each sqaure gets id
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
        if (erase) {
          col.style.backgroundColor = 'transparent';
        } else {
          col.style.backgroundColor = colorButton.value;
        }
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
  grid.innerHTML = '';
});

erase_button.addEventListener('click', () => {
  erase = true;
});

paint_button.addEventListener('click', () => {
  erase = false;
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
  width_value.innerHTML = '10';
  height_value.innerHTML = '10';
};


//pass in square id, check, color
function checker(elementId) {
  let gridColumns = document.querySelectorAll('.grid-col');
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = 'transparent';
      }
    }
  });
}