import { Button, Card, Flex, LoadingOverlay, Modal, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { useOptimistic, useState } from 'react';
import classes from './style.module.css';

type ListType = {
	position: number;
	mass: number;
	symbol: string;
	name: string;
};

type OptimisticListType = ListType & {
	loading?: boolean;
};

export default function DemoUseOptimistic() {
	const query = useQuery<ListType[]>({
		queryKey: ['ITEMS'],
		queryFn: getItems,
		initialData: [],
	});

	const [open, setOpen] = useState(false);

	const form = useForm();

	const [optimisticList, setOptimisticList] = useOptimistic<OptimisticListType[]>(query.data);

	const rows = optimisticList.map((element) => (
		<Table.Tr key={element.name} data-loading={element.loading}>
			<Table.Td>{element.position}</Table.Td>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>{element.symbol}</Table.Td>
			<Table.Td>{element.mass}</Table.Td>
		</Table.Tr>
	));

	return (
		<Flex justify='center'>
			<Card withBorder shadow='sm' m='lg' maw='1200px'>
				<LoadingOverlay visible={query.isFetching} />
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
				<Button fullWidth size='xs' variant='light' mt='md' onClick={() => setOpen(true)}>
					Add Item
				</Button>
			</Card>
			<Modal opened={open} onClose={() => setOpen(false)}></Modal>
		</Flex>
	);
}

async function getItems() {
	return new Promise<ListType[]>((r) => {
		setTimeout(() => {
			r([
				{ position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
				{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
				{ position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
				{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
				{ position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
			]);
		}, 1000);
	});
}

async function postItem(input: ListType) {
	return new Promise((r) => {
		setTimeout(() => {
			r(input);
		}, 2000);
	});
}
