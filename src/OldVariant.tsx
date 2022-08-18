import { useMouse, useSize } from 'ahooks';
import { MouseEvent, useEffect, useRef, useState } from 'react';

type Cord = {
  x: number;
  y: number;
};

const L = 100;
const D = 150;

function getHeight(side: number) {
  return (Math.sqrt(3) / 2) * side;
}

function distance(p1: Cord, p2: Cord) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function isLessThan(p1: Cord, p2: Cord) {
  return distance(p1, p2) <= D / 2;
}

function App() {
  const [firstCircle, setFirstCircle] = useState<Cord | null>(null);
  const [secondCircle, setSecondCircle] = useState<Cord | null>(null);
  const [thirdCircle, setThirdCircle] = useState<Cord | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const mouse = useMouse();

  const firstCircleRef = useRef<HTMLDivElement>(null);
  const secondCircleRef = useRef<HTMLDivElement>(null);
  const thirdCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (size) {
      const centerPosition = { x: size?.width / 2, y: size?.height / 2 };

      setFirstCircle({
        x: centerPosition.x,
        y: centerPosition.y - (getHeight(L) * 2) / 3,
      });

      setSecondCircle({
        x: centerPosition.x - L / 2,
        y: centerPosition.y + getHeight(L) / 3,
      });

      setThirdCircle({
        x: centerPosition.x + L / 2,
        y: centerPosition.y + getHeight(L) / 3,
      });
    }
  }, [size]);

  const clickHandler = (e: MouseEvent) => {
    const isRed = isLessThan(
      { x: mouse.clientX, y: mouse.clientY },
      firstCircle!
    );
    const isGreen = isLessThan(
      { x: mouse.clientX, y: mouse.clientY },
      secondCircle!
    );
    const isBlue = isLessThan(
      { x: mouse.clientX, y: mouse.clientY },
      thirdCircle!
    );

    if (isRed && isBlue && isGreen) {
      console.log('RGB');
    } else if (isRed && isBlue) {
      console.log('RB');
    } else if (isRed && isGreen) {
      console.log('RG');
    } else if (isGreen && isBlue) {
      console.log('GB');
    } else if (isRed) {
      console.log('R');
    } else if (isGreen) {
      console.log('G');
    } else if (isBlue) {
      console.log('B');
    } else {
      console.log('NONE');
    }
  };

  return (
    <div ref={ref} className="app" onClick={clickHandler}>
      <div
        ref={firstCircleRef}
        className="circle red"
        style={{
          top: firstCircle?.y,
          left: firstCircle?.x,
          height: D,
          width: D,
        }}
      />
      <div
        ref={secondCircleRef}
        className="circle green"
        style={{
          top: secondCircle?.y,
          left: secondCircle?.x,
          height: D,
          width: D,
        }}
      />
      <div
        ref={thirdCircleRef}
        className="circle blue"
        style={{
          top: thirdCircle?.y,
          left: thirdCircle?.x,
          height: D,
          width: D,
        }}
      />
      <div className="center" />
      <div
        className="center"
        style={{ top: firstCircle?.y, left: firstCircle?.x }}
      />
      <div
        className="center"
        style={{ top: secondCircle?.y, left: secondCircle?.x }}
      />
      <div
        className="center"
        style={{ top: thirdCircle?.y, left: thirdCircle?.x }}
      />
    </div>
  );
}

export default App;
