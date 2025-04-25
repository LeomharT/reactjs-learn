import { useOptimistic } from 'react';

export default function DemoUseOptimistic() {
	const list = useOptimistic([]);
	return <div>UseOptimistic</div>;
}
