import { Button, Card, Divider, Group, Select, TextInput, Tree, useTree } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import CustomTreeNode from './components/CustomTreeNode';
import NoneSelected from './components/NoneSelected';
import { data } from './data';
import classes from './style.module.css';

export default function DemoMenuManage() {
	const tree = useTree();

	const [selected] = useState();

	return (
		<div className={classes.layout}>
			<Card withBorder shadow='md' p={0} className={classes.tree}>
				<form>
					<Group wrap='wrap' justify='space-between' p='sm'>
						<Select placeholder='请选择类型' />
						<TextInput placeholder='请输入关键字' />
						<Button leftSection={<IconSearch />}>Search</Button>
					</Group>
					<Divider />
				</form>
				<Tree
					tree={tree}
					data={data}
					selectOnClick
					clearSelectionOnOutsideClick
					classNames={{
						node: classes.node,
					}}
					renderNode={(payload) => <CustomTreeNode {...payload} />}
					onChange={console.warn}
				/>
			</Card>
			<Card withBorder shadow='md'>
				{!selected && <NoneSelected />}
			</Card>
		</div>
	);
}
