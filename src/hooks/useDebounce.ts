import { useRef } from 'react';

export default function useDebounce<T>() {
  const fn = useRef<T | null>(null);
  const time = useRef(0);
}
