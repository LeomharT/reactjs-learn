import { Card, type GetRef } from 'antd';
import { useEffect, useRef } from 'react';

type Vector2 = {
  x: number;
  y: number;
};

type Vector3 = Vector2 & {
  z: number;
};

export default function Test() {
  const ref = useRef<GetRef<typeof Card>>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) throw new Error('Canvas Element Not Found');
    let animation = 0;

    const size = {
      width: 1280,
      height: 720,
      aspect: 1280 / 720,
    };
    canvas.current.width = size.width;
    canvas.current.height = size.height;
    canvas.current.style.width = size.width + 'px';
    canvas.current.style.height = size.height + 'px';

    const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;

    function clear() {
      ctx.clearRect(0, 0, size.width, size.height);
      ctx.save();
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, size.width, size.height);
      ctx.restore();
    }
    clear();

    function point(p: Vector2) {
      ctx.save();
      const s = 20;
      ctx.fillStyle = '#fadb14';
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      ctx.restore();
    }

    function screen(p: Vector2) {
      const x = ((p.x + 1) / 2) * size.width;
      const y = -((p.y - 1) / 2) * size.height;

      return {
        x,
        y,
      };
    }

    function project(p: Vector3) {
      return {
        x: p.x / p.z,
        y: (p.y / p.z) * size.aspect,
      };
    }

    function translateZ(p: Vector3, dz: number) {
      return {
        ...p,
        z: p.z + dz,
      };
    }

    function line(from: Vector2, to: Vector2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fadb14';
      ctx.stroke();
      ctx.restore();
    }

    function rotate(p: Vector3, angle: number) {
      const x = Math.cos(angle) * p.x - Math.sin(angle) * p.z;
      const z = Math.sin(angle) * p.x + Math.cos(angle) * p.z;

      return {
        x,
        y: p.y,
        z,
      };
    }

    const vs: Vector3[] = [
      { x: 0.25, y: 0.25, z: 0.25 },
      { x: -0.25, y: 0.25, z: 0.25 },
      { x: -0.25, y: -0.25, z: 0.25 },
      { x: 0.25, y: -0.25, z: 0.25 },

      { x: 0.25, y: 0.25, z: -0.25 },
      { x: -0.25, y: 0.25, z: -0.25 },
      { x: -0.25, y: -0.25, z: -0.25 },
      { x: 0.25, y: -0.25, z: -0.25 },
    ];

    const fs: number[][] = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    let prevTime = 0;
    let dz = 1;
    let angle = 0;

    function render(time: number = 0) {
      clear();

      const dt = (time - prevTime) / 1000;
      prevTime = time;

      //   dz += dt;
      angle += 0.01;

      for (const v of vs) {
        point(screen(project(translateZ(rotate({ ...v }, angle), dz))));
      }
      for (const f of fs) {
        for (let i = 0; i < f.length; i++) {
          const from = f[i];
          const to = f[(i + 1) % f.length];

          line(
            screen(project(translateZ(rotate({ ...vs[from] }, angle), dz))),
            screen(project(translateZ(rotate({ ...vs[to] }, angle), dz))),
          );
        }
      }

      animation = requestAnimationFrame(render);
    }
    render();

    return () => {
      clear();
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <Card ref={ref}>
      <canvas ref={canvas} />
    </Card>
  );
}
