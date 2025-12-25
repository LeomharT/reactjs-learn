import { PlayCircleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Select } from 'antd';
import { useEffect, useRef } from 'react';
import classes from './style.module.css';

const STREAM_TYPE = {
  WEBRTC: 'WEBRTC',
  RTMP: 'RTMP',
  FLV: 'FLV',
  HLS: 'HLS',
} as const;

type FormValue = {
  type: keyof typeof STREAM_TYPE;
  url: string;
};

export default function StreamPlayer() {
  const [form] = Form.useForm<FormValue>();

  const video = useRef<HTMLVideoElement>(null);

  function handleOnFinish(e: FormValue) {
    if (!video.current) return;

    console.log(e);
    if (e.type === STREAM_TYPE.WEBRTC) {
      playWebRTCStream(e.url, video.current);
    }
  }

  function autoPlay() {
    video.current?.play();
  }

  useEffect(() => {
    form.setFieldValue(
      'url',
      'http://192.168.68.9:1985/rtc/v1/whep/?app=live&stream=mystream11'
    );
    form.setFieldValue('type', STREAM_TYPE.WEBRTC);
  }, [form]);

  return (
    <Card>
      <Form form={form} layout='inline' onFinish={handleOnFinish}>
        <Form.Item name='type' rules={[{ required: true }]}>
          <Select
            style={{ width: '120px' }}
            placeholder='Chose Stream Type'
            options={[
              { label: 'webRTC', value: STREAM_TYPE.WEBRTC },
              { label: 'rtmp', value: STREAM_TYPE.RTMP },
              { label: 'hls', value: STREAM_TYPE.HLS },
              { label: 'flv', value: STREAM_TYPE.FLV },
            ]}
          />
        </Form.Item>
        <Form.Item name='url' rules={[{ required: true }]}>
          <Input
            style={{ width: '280px' }}
            name='url'
            placeholder='Please Enter Stream URL'
          />
        </Form.Item>
        <Button type='primary' htmlType='submit' icon={<PlayCircleOutlined />}>
          Play
        </Button>
      </Form>
      <Divider />
      <video
        ref={video}
        controls
        className={classes.video}
        onCanPlayThrough={autoPlay}
      ></video>
    </Card>
  );
}

async function playWebRTCStream(url: string, video: HTMLVideoElement) {
  const pc = new RTCPeerConnection({});

  pc.addEventListener('track', (e) => {
    video.srcObject = e.streams[0];
  });

  pc.addTransceiver('video', { direction: 'recvonly' });
  pc.addTransceiver('audio', { direction: 'recvonly' });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sdp',
    },
    body: offer.sdp,
  });

  const answerSDP = await res.text();

  await pc.setRemoteDescription({
    type: 'answer',
    sdp: answerSDP,
  });
}
