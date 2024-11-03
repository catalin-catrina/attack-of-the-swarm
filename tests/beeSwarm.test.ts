import BeeSwarm from '../src/beeSwarm';

test('Swarm initializes correctly', () => {
  const swarm = new BeeSwarm();
  expect(swarm.bees.length).toBe(14);
});

test('Game ends when Queen dies', () => {
  const swarm = new BeeSwarm();
  const queen = swarm.bees.find(bee => bee.type === 'Queen');
  while (queen!.alive) {
    queen!.takeDamage();
  }
  expect(swarm.isGameOver()).toBe(true);
});

test('Game ends when all bees are dead', () => {
  const swarm = new BeeSwarm();
  swarm.bees.forEach(bee => {
    while (bee.alive) {
      bee.takeDamage();
    }
  });
  expect(swarm.isGameOver()).toBe(true);
});
