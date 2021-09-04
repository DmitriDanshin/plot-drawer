import '../style.scss';

class PlotCore implements IPlotCore {
  private context: CanvasRenderingContext2D | undefined;
  private readonly canvas: HTMLCanvasElement;

  constructor(
    private readonly functions: MathFunction[],
    private readonly selector: string
  ) {
    this.functions = functions;
    this.selector = selector;
    this.canvas = document.querySelector(this.selector)!;
  }

  private get canvasSizes() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  private scaleCanvas(): void {
    const dpi = window.devicePixelRatio;
    const height = +getComputedStyle(this.canvas)
      .getPropertyValue('height')
      .slice(0, -2);
    const width = +getComputedStyle(this.canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    this.canvas.setAttribute('height', (height * dpi).toString());
    this.canvas.setAttribute('width', (width * dpi).toString());
  }

  private drawPoint(x: number, y: number): void {
    this.context!.fillRect(x, y, 1, 1);
  }

  private drawAxis() {
    for (let i = 0; i < this.canvasSizes.height; i++) {
      this.drawPoint(this.canvasSizes.width / 2, i);
    }
    for (let i = 0; i < this.canvasSizes.width; i++) {
      this.drawPoint(i, this.canvasSizes.height / 2);
    }
  }

  private drawFunctions() {
    for (let i = 0; i < this.canvasSizes.width; i++) {
      this.drawPoint(
        -i + this.canvasSizes.height,
        Math.sin(i * 0.02) * 25 + this.canvasSizes.height / 2
      );
    }
  }

  init(): void {
    if (this.canvas) {
      this.context = this.canvas.getContext('2d')!;
      this.scaleCanvas();
      this.drawAxis();
      this.drawFunctions();
    } else {
      throw 'Cannot find the element by selector: ' + this.selector;
    }
  }

  clear(): void {
    this.context!.clearRect(
      0,
      0,
      this.canvasSizes.width,
      this.canvasSizes.height
    );
  }
}

function f1(x: number): number {
  return x;
}

const plot = new PlotCore([f1, f1], '#canvas');
plot.init();
