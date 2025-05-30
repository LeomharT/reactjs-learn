import {
	Box,
	Card,
	Group,
	Tree,
	useMantineTheme,
	useTree,
	type RenderTreeNodePayload,
} from '@mantine/core';
import {
	IconCaretDownFilled,
	IconMenu,
	IconMenuDeep,
	IconNumber123,
	IconSlash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { data } from './data';
import classes from './style.module.css';

console.log(IconNumber123);

export default function DemoMenuManage() {
	const tree = useTree();

	return (
		<div className={classes.layout}>
			<Card withBorder shadow='md' p={0}>
				<Tree
					tree={tree}
					data={data}
					selectOnClick
					expandOnClick={false}
					clearSelectionOnOutsideClick
					classNames={{
						node: classes.node,
					}}
					renderNode={(payload) => <CustomTreeNode {...payload} />}
				/>
			</Card>
			<Card withBorder shadow='md'>
				<IconNumber123 />
				<span>Hello 你号</span>
			</Card>
		</div>
	);
}

function CustomTreeNode(props: RenderTreeNodePayload & { icon?: ReactNode }) {
	const tree = props.tree;

	const theme = useMantineTheme();

	function toggleCollapse() {
		if (props.expanded) {
			tree.collapse(props.node.value);
		} else {
			tree.expand(props.node.value);
		}
	}

	return (
		<Box {...props.elementProps} h={36}>
			<Group gap={5} h='100%' px='md'>
				{props.hasChildren ? (
					<IconCaretDownFilled
						size={18}
						style={{ transform: props.expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
						onClick={toggleCollapse}
					/>
				) : (
					<IconSlash size={18} style={{ transform: 'rotate(55deg) scale(0.8)' }} />
				)}

				{props.icon ?? props.hasChildren ? (
					<IconMenu color={theme.colors.gray[6]} size={18} />
				) : (
					<IconMenuDeep color={theme.colors.gray[6]} size={18} />
				)}

				<span>{props.node.label}</span>
			</Group>
		</Box>
	);
}
