import MenuSVG from '@/assets/menu.svg';
import { Button, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './style.module.css';

export default function NoneSelected() {
	return (
		<Stack align='center'>
			<Stack p='lg'>
				<Title>Please select menu to edit</Title>
				<Text c='dimmed'>
					Edit existing menu items or add new ones to guide users through your site. Customize
					titles, links, and order. Use clear labels and organized structure for easy navigation.
					Preview changes before publishing, and ensure responsiveness across devices. Save your
					updates to apply them.
				</Text>
				<Button variant='light' size='lg' leftSection={<IconPlus />}>
					Add New Menu Item
				</Button>
			</Stack>
			<img src={MenuSVG} className={classes.img} />
		</Stack>
	);
}
