import {type} from 'os';
import '../style.scss';

const field = document.querySelector('.field')!;
enum Sizes {
  FIELD_WIDTH = getSize(field).width,
  FIELD_HEIGHT = getSize(field).height,
  FIELD_HALF_WIDHT = FIELD_WIDTH * 0.5,
  FIELD_HALF_HEIGHT = FIELD_HEIGHT * 0.5,
}

type Coords = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Scale = {
  x: number;
  y: number;
};

type Plot = {
  f: (x: number) => number;
  color: string;
};

function addPoint(element: Element, coords: Coords, color = 'black') {
  const point = document.createElement('div');
  point.classList.add('point');
  point.style.backgroundColor = color;
  setCoords(point, coords);
  element.appendChild(point);
}

function getSize(element: Element): Size {
  return {
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
  };
}

function setCoords(element: HTMLElement, coords: Coords): void {
  element.style.left = coords.x + 'px';
  element.style.top = coords.y + 'px';
}

let n = -Sizes.FIELD_HALF_WIDHT;

function drawAxis(): void {
  for (let i = 0; i < Sizes.FIELD_WIDTH; i++) {
    addPoint(field, {
      x: i,
      y: Sizes.FIELD_HEIGHT * 0.5 - 2,
    });
  }
  for (let i = 0; i < Sizes.FIELD_HEIGHT; i++) {
    addPoint(field, {
      x: Sizes.FIELD_WIDTH * 0.5 - 2,
      y: i,
    });
  }
}

drawAxis();

function f(x: number): number {
  return Math.sin(x);
}

function g(x: number): number {
  return Math.cos(x);
}

function w(x: number): number {
  return isNaN(Math.sqrt(x)) ? 0 : Math.sqrt(x);
}

function h(x: number): number {
  return -x + Math.sin(x);
}

function m(x: number): number {
  return x + Math.sin(x);
}

const scale: Scale = {
  x: 0.01,
  y: 40,
};

function draw(...args: Plot[]): NodeJS.Timeout {
  const interval = setInterval(() => {
    for (const f of args) {
      addPoint(
        field,
        {
          x: n + Sizes.FIELD_HALF_WIDHT,
          y: -f.f(n * scale.x) * scale.y + Sizes.FIELD_HALF_HEIGHT - 2,
        },
        f.color
      );
    }
    if (n >= Sizes.FIELD_HALF_WIDHT - 2) {
      clearInterval(interval);
    }
    n++;
  }, 1);
  return interval;
}

let interval = draw(
  {f: f, color: 'red'},
  {f: g, color: 'blue'},
  {f: w, color: 'green'},
  {f: h, color: 'yellow'},
  {f: m, color: 'black'}
);

function clear(element: Element): void {
  n = -Sizes.FIELD_HALF_WIDHT;
  clearInterval(interval);
  element.innerHTML = '';
  drawAxis();
}

const clearButton = document.querySelector('#clear')!;
const startButton = document.querySelector('#start')!;
const pauseButton = document.querySelector('#pause')!;

clearButton.addEventListener('click', () => {
  clear(field);
  clearInterval(interval);
});

startButton.addEventListener('click', () => {
  interval = draw(
    {f: f, color: 'red'},
    {f: g, color: 'blue'},
    {f: w, color: 'green'},
    {f: h, color: 'yellow'},
    {f: m, color: 'black'}
  );
});

pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});
