import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import { useRef, useState } from 'react';
import { chunk } from '../../data/chunk';

let timer = 0;

const PLAYABLE_LENGTH = 5;

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioChunkRef = useRef<string[]>([]);

  const urlRef = useRef<string>('');

  const [isPlaying, setPlaying] = useState(false);

  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const queueRef = useRef<Uint8Array[]>([]);

  function readFromChunk() {
    let i = 0;
    setPlaying(true);

    timer = setInterval(() => {
      if (i === PLAYABLE_LENGTH) playAudio();

      if (i >= chunk.length) {
        clearInterval(timer);
        // 如果数据传完了，告诉 MediaSource 结束
        if (mediaSourceRef.current?.readyState === 'open') {
          mediaSourceRef.current.endOfStream();
        }
        return;
      }

      // 2. 将 base64 转为二进制并推入队列
      const buffer = new Uint8Array(base64ToArrayBuffer(chunk[i]));
      queueRef.current.push(buffer);

      // 3. 尝试播放（如果当前没在更新）
      processQueue();

      // 4. 自动播放（MSE 载入初始数据后可能需要手动调用一次 play）
      if (i === 0 && audioRef.current?.paused) {
        audioRef.current.play();
      }

      i++;
    }, 200);
  }

  function playAudio() {
    if (!audioRef.current) return;

    const ms = new MediaSource();
    mediaSourceRef.current = ms;
    const url = URL.createObjectURL(ms);
    urlRef.current = url;
    audioRef.current.src = url;

    ms.addEventListener('sourceopen', () => {
      // 注意：这里的 mime 类型必须与后端返回的音频格式严格一致
      // 如果是 mp3，通常是 'audio/mpeg'
      const sb = ms.addSourceBuffer('audio/mpeg');
      sourceBufferRef.current = sb;

      // 当这一片数据处理完，尝试追加下一片
      sb.addEventListener('updateend', () => {
        processQueue();
      });

      // 初始启动：如果已经有数据在队列里了
      processQueue();
    });
  }

  function processQueue() {
    const sb = sourceBufferRef.current;
    if (!sb || sb.updating || queueRef.current.length === 0) return;

    const nextChunk = queueRef.current.shift();
    if (nextChunk) {
      try {
        sb.appendBuffer(nextChunk as any);
      } catch (e) {
        console.error('AppendBuffer 失败', e);
      }
    }
  }

  function stopAudio() {
    audioChunkRef.current = [];

    setPlaying(false);

    audioRef.current?.pause();
    audioRef.current!.src = '';

    clearInterval(timer);
    URL.revokeObjectURL(urlRef.current);
  }

  return (
    <Card>
      <Space>
        <audio ref={audioRef} controls style={{ pointerEvents: 'none', opacity: 0.8 }} />
        <Button
          type='primary'
          size='large'
          loading={isPlaying}
          icon={<PlayCircleOutlined />}
          onClick={readFromChunk}
        >
          Play Audio Chunk
        </Button>
        <Button
          size='large'
          disabled={!isPlaying}
          icon={<PauseCircleOutlined />}
          onClick={stopAudio}
        >
          Stop Audio Player
        </Button>
      </Space>
    </Card>
  );
}

const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
