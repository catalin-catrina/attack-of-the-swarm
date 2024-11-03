// tests/bee.test.ts
import QueenBee from '../src/queenBee';
import WorkerBee from '../src/workerBee';
import DroneBee from '../src/droneBee';

test('QueenBee takes damage correctly', () => {
  const queen = new QueenBee();
  queen.takeDamage();
  expect(queen.hp).toBe(92);
});

test('WorkerBee dies after sufficient damage', () => {
  const worker = new WorkerBee();
  for (let i = 0; i < 8; i++) {
    worker.takeDamage();
  }
  expect(worker.alive).toBe(false);
  expect(worker.hp).toBe(0);
});

test('DroneBee dies after sufficient damage', () => {
  const drone = new DroneBee();
  for (let i = 0; i < 5; i++) {
    drone.takeDamage();
  }
  expect(drone.alive).toBe(false);
  expect(drone.hp).toBe(0);
});
