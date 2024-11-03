import Bee from './bee';
import DroneBee from './droneBee';
import QueenBee from './queenBee';
import WorkerBee from './workerBee';

export default class BeeSwarm {
  bees: Bee[];
  totalHp: number;

  constructor() {
    this.bees = [];
    this.initializeSwarm();
    this.totalHp = this.bees.reduce((acc, curr) => acc + curr.maxHp, 0);
  }

  initializeSwarm() {
    this.bees = [];

    // Add Queen
    this.bees.push(new QueenBee());

    // Add Worker Bees
    for (let i = 0; i < 5; i++) {
      this.bees.push(new WorkerBee());
    }

    // Add Drones Bees
    for (let i = 0; i < 8; i++) {
      this.bees.push(new DroneBee());
    }
  }

  isGameOver() {
    // Check if Queen is dead first
    const queenBee = this.bees.find(bee => bee.type === 'Queen') as QueenBee;
    if (!queenBee || !queenBee.alive) {
      return true;
    }

    // Check if all bees are dead
    // as the requirement mentioned 'bees', the Queen is also a bee so I assumed that's what was meant
    const areBeesDead = this.bees.every(bee => !bee.alive);
    return areBeesDead;
  }

  hitBeeSwarm(): { bee: Bee; damage: number } | null {
    if (this.isGameOver()) return null;

    // Get all alive bees, randomly select and hit one of them
    const aliveBees = this.bees.filter(bee => bee.alive);
    const randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
    randomBee.takeDamage();

    // If Queen dies, all bees die
    if (randomBee.type === 'Queen' && !randomBee.alive) {
      this.bees.forEach(bee => (bee.alive = false));
    }

    // return the hit bee and the damage dealt - will see if I find an use for it in the UI
    return { bee: randomBee, damage: randomBee.damage };
  }
}
