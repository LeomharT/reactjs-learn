import { VideoCameraOutlined } from '@ant-design/icons';
import { Button, Card, type GetRef } from 'antd';
import { useRef, useState } from 'react';
import classes from './style.module.css';

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const positions = Array.from({ length: 50 }, () => ({
  top: random(0, 720 - 2),
  left: random(0, 1280 - 100),
}));

export default function Test() {
  const ref = useRef<HTMLDivElement>(null);

  const cameraRef = useRef<GetRef<typeof Button>>(null);

  const [isMoving, setMoving] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  function renderItem() {
    const element: React.ReactNode[] = [];

    for (let i = 0; i < 50; i++) {
      element.push(
        <div
          key={i}
          onPointerMove={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            width: 100,
            height: 2,
            background: 'green',
            top: positions[i].top,
            left: positions[i].left,
          }}
        ></div>,
      );
    }

    return element;
  }

  function handleOnPointerMove(e: React.PointerEvent) {
    e.stopPropagation();

    if (!isMoving) return;

    const cursorPosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    setPosition(cursorPosition);

    cameraRef.current!.style.left = cursorPosition.x - 20 + 'px';
    cameraRef.current!.style.top = cursorPosition.y - 20 + 'px';
  }

  return (
    <Card>
      <div
        ref={ref}
        className={classes.ground}
        onPointerDown={() => setMoving(true)}
        onPointerUp={() => setMoving(false)}
        onPointerMove={handleOnPointerMove}
      >
        {renderItem()}
        <Button
          ref={cameraRef}
          type='primary'
          size='large'
          shape='circle'
          icon={<VideoCameraOutlined />}
          style={{
            transition: 'none',
          }}
          onPointerMove={(e) => e.stopPropagation()}
        ></Button>
      </div>
    </Card>
  );
}
