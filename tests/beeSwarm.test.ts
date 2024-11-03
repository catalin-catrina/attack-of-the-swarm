import BeeSwarm from '../src/beeSwarm';

test('BeeSwarm initializes correctly', () => {
  const swarm = new BeeSwarm();
  expect(swarm.bees.length).toBe(14);
});

test('BeeSwarm ends game when Queen dies', () => {
  const swarm = new BeeSwarm();
  const queen = swarm.bees.find(bee => bee.type === 'Queen');
  while (queen!.alive) {
    queen!.takeDamage();
  }
  expect(swarm.isGameOver()).toBe(true);
});

test('BeeSwarm ends game when all bees are dead', () => {
  const swarm = new BeeSwarm();
  swarm.bees.forEach(bee => {
    while (bee.alive) {
      bee.takeDamage();
    }
  });
  expect(swarm.isGameOver()).toBe(true);
});
