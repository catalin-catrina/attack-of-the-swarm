import QueenBee from '../src/queenBee';
import WorkerBee from '../src/workerBee';
import DroneBee from '../src/droneBee';

test('Queen takes damage correctly', () => {
  const queen = new QueenBee();
  queen.takeDamage();
  expect(queen.hp).toBe(92);
});

test('Worker takes damage correctly', () => {
  const worker = new WorkerBee();
  worker.takeDamage();
  expect(worker.hp).toBe(65);
});

test('Drone takes damage correctly', () => {
  const drone = new DroneBee();
  drone.takeDamage();
  expect(drone.hp).toBe(38);
});

test('Queen dies after sufficient damage', () => {
  const queen = new QueenBee();
  for (let i = 0; i < 13; i++) {
    queen.takeDamage();
  }
  expect(queen.alive).toBe(false);
  expect(queen.hp).toBe(0);
});

test('Worker dies after sufficient damage', () => {
  const worker = new WorkerBee();
  for (let i = 0; i < 8; i++) {
    worker.takeDamage();
  }
  expect(worker.alive).toBe(false);
  expect(worker.hp).toBe(0);
});

test('Drone dies after sufficient damage', () => {
  const drone = new DroneBee();
  for (let i = 0; i < 5; i++) {
    drone.takeDamage();
  }
  expect(drone.alive).toBe(false);
  expect(drone.hp).toBe(0);
});
