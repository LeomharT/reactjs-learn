import { Box, Group, type RenderTreeNodePayload, useMantineTheme } from '@mantine/core';
import { IconCaretDownFilled, IconMenu, IconMenuDeep, IconSlash } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export default function CustomTreeNode(props: RenderTreeNodePayload & { icon?: ReactNode }) {
	const tree = props.tree;

	const theme = useMantineTheme();

	return (
		<Box
			h={36}
			{...props.elementProps}
			onContextMenu={(e) => {
				e.preventDefault();
				tree.select(props.node.value);
			}}
		>
			<Group gap={5} h='100%' px='md'>
				{props.hasChildren ? (
					<IconCaretDownFilled
						size={18}
						style={{ transform: props.expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
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
