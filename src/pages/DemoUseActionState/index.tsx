import { Box } from '@mantine/core';
import { useActionState } from 'react';

export default function DemoUseActionState() {
	const [data, action, isPending] = useActionState(saveUser, undefined);

	return (
		<Box maw='350px'>
			<form style={{ display: 'flex', flexDirection: 'column' }} action={action}>
				<label htmlFor='firstName'>First Name</label>
				<input id='firstName' name='firstName' />
				<button disabled={isPending} style={{ marginTop: '.5rem' }}>
					Submit
				</button>
				{data?.error && <span style={{ color: 'red' }}>{data.error}</span>}
				{data?.message && <span style={{ color: 'green' }}>{data.message}</span>}
			</form>
		</Box>
	);
}

async function saveUser(_: unknown, formData: FormData) {
	const firstName = formData.get('firstName') as string;

	await wait(1000);
	if (firstName === '') {
		return {
			error: 'Name is required',
		};
	}

	return {
		message: 'User saved',
	};
}

async function wait(duration: number) {
	return new Promise<void>((r) => setTimeout(r, duration));
}
