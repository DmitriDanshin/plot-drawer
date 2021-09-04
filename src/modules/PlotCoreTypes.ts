type MathFunction = (a: number) => number;

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
  f: MathFunction;
  color: string;
};
