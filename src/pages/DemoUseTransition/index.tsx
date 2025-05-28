import { Button, SimpleGrid } from '@mantine/core';

export default function DemoUseTransition() {
  return (
    <SimpleGrid
      cols={{
        base: 1,
        md: 2,
        lg: 3,
      }}
    >
      <Button size='xl'>1</Button>
      <Button size='xl'>2</Button>
      <Button size='xl'>3</Button>
      <Button size='xl'>4</Button>
      <Button size='xl'>5</Button>
      <Button size='xl'>6</Button>
    </SimpleGrid>
  );
}
