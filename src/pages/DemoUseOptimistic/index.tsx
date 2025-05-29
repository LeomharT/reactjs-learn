import { Button, Card, Flex, Modal, NumberInput, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { startTransition, useEffect, useOptimistic, useState } from 'react';
import classes from './style.module.css';

type ListType = {
	id?: string;
	position?: number;
	mass?: number;
	symbol?: string;
	name?: string;
};

type OptimisticListType = ListType & {
	loading?: boolean;
};

const _data: ListType[] = [
	{ id: '1', position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
	{ id: '2', position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
	{ id: '3', position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
	{ id: '4', position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
	{ id: '5', position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function DemoUseOptimistic() {
	const [open, setOpen] = useState(false);

	const form = useForm<ListType>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			symbol: '',
			mass: undefined,
			position: undefined,
		},
		validate: {
			name: (value) => (value ? null : 'Please Inter Name'),
			symbol: (value) => (value ? null : 'Please Inter Symbol'),
			mass: (value) => (value ? null : 'Please Inter Mass'),
			position: (value) => (value ? null : 'Please Inter Position'),
		},
	});

	const [list, setList] = useState<ListType[]>(_data);

	const [optimisticList, setOptimisticList] = useOptimistic<OptimisticListType[]>(list);

	function handleOnSubmit(data: ListType) {
		setOpen(false);
		form.reset();

		data.id = crypto.randomUUID();

		const optimisticItem = {
			...data,
			loading: true,
		};

		startTransition(async () => {
			setOptimisticList((prev) => {
				return [...prev, optimisticItem];
			});

			const newItem: ListType = await new Promise((r) => {
				setTimeout(() => {
					r(data);
				}, 2000);
			});
			setList((list) => [...list, newItem]);
		});
	}

	const rows = optimisticList.map((element, index) => (
		<Table.Tr key={`${element.id}${index}`} data-loading={element.loading}>
			<Table.Td>{element.position}</Table.Td>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>{element.symbol}</Table.Td>
			<Table.Td>{element.mass}</Table.Td>
		</Table.Tr>
	));

	useEffect(() => {
		console.log(optimisticList);
	}, [optimisticList]);

	return (
		<Flex justify='center'>
			<Card withBorder shadow='sm' m='lg' maw='1200px'>
				<Table
					miw='750px'
					classNames={{ tr: classes.tr }}
					striped
					highlightOnHover
					withColumnBorders
					withRowBorders
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Element position</Table.Th>
							<Table.Th>Element name</Table.Th>
							<Table.Th>Symbol</Table.Th>
							<Table.Th>Atomic mass</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
				<Button mt='md' size='xs' fullWidth variant='light' onClick={() => setOpen(true)}>
					Add Item
				</Button>
			</Card>
			<Modal
				opened={open}
				title='Add New Item'
				onClose={() => {
					setOpen(false);
					form.clearErrors();
					form.reset();
				}}
			>
				<form onSubmit={form.onSubmit(handleOnSubmit)}>
					<Flex direction='column' gap='md'>
						<NumberInput
							withAsterisk
							min={0}
							hideControls
							placeholder='Please Inter Position'
							label='Element Position'
							{...form.getInputProps('position')}
						/>
						<TextInput
							withAsterisk
							placeholder='Please Inter Name'
							label='Element Name'
							{...form.getInputProps('name')}
						/>
						<TextInput
							withAsterisk
							placeholder='Please Inter Symbol'
							label='Symbol'
							{...form.getInputProps('symbol')}
						/>
						<NumberInput
							withAsterisk
							min={0}
							hideControls
							placeholder='Please Inter Atomic mass'
							label='Atomic mass'
							{...form.getInputProps('mass')}
						/>
						<Button type='submit' variant='filled'>
							Submit
						</Button>
					</Flex>
				</form>
			</Modal>
		</Flex>
	);
}
