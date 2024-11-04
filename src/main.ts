import Bee from './bee';
import BeeSwarm from './beeSwarm';
import DroneBee from './droneBee';
import QueenBee from './queenBee';
import WorkerBee from './workerBee';

class Game {
  private playerName: string;
  private swarm: BeeSwarm;

  constructor(playerName: string) {
    this.playerName = playerName;
    this.swarm = new BeeSwarm();
    this.loadFromLocalStorage();
    this.renderUI();
    this.bindUIEvents();
  }

  private bindUIEvents(): void {
    // Bind click events for the 2 buttons (Attack / Reset)
    const hitButtonElement = document.getElementById(
      'hit-button'
    ) as HTMLButtonElement;
    hitButtonElement.addEventListener('click', () => this.attackSwarm());

    const resetButton = document.getElementById(
      'reset-button'
    ) as HTMLButtonElement;
    resetButton.addEventListener('click', () => this.resetGame());
  }

  private attackSwarm(): void {
    // destructure the 2 object properties received by hitBeeSwarm method
    // default to null values since it can also return null when game is over
    const { bee, damage } = this.swarm.hitBeeSwarm() ?? {
      bee: null,
      damage: null,
    };

    // if an attack happened (i.e game is not over yet), display it in the UI
    if (bee && damage !== null) {
      this.showAttackDetails(bee, damage);
    }

    // after every attack, save the new state, render the updated UI, and end the game if no more bees
    this.saveToLocalStorage();
    this.renderUI();
    if (this.swarm.isGameOver()) {
      this.showGameOver();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('attackTheSwarmState', JSON.stringify(this.swarm));
  }

  private loadFromLocalStorage(): void {
    // Unexpectd problem I did not consider: when I get the data back from storage, they're just simple objects of no type and have no methods
    // Solution: For each bee saved in storage, instantiate a new Bee of that type to receive access to the take damage method
    // Finally, overwrite the newly created Bee (which will have default values) with the property values previously saved in storage, in order to resume the last saved state
    const savedState = localStorage.getItem('attackTheSwarmState');
    if (savedState) {
      const swarmData = JSON.parse(savedState);
      this.swarm.bees = swarmData.bees.map((beeData: any) => {
        let bee: Bee;
        switch (beeData.type) {
          case 'Queen':
            bee = new QueenBee();
            break;
          case 'Worker':
            bee = new WorkerBee();
            break;
          case 'Drone':
            bee = new DroneBee();
            break;
          default:
            throw new Error(`No bee of type ${beeData.type}`);
        }

        Object.assign(bee, beeData);
        return bee;
      });
    }
  }

  private showAttackDetails(bee: Bee, damage: number): void {
    const hitInfoElement = document.getElementById('hit-info') as HTMLElement;
    hitInfoElement.textContent = bee.alive
      ? `You hit a ${bee.type} and did ${damage} damage!`
      : `You just killed a ${bee.type}!`;
  }

  private renderUI(): void {
    this.renderPlayerName();
    this.renderSwarmSummary();
  }

  // display in UI the information about bees on the right
  // for each bee type, call renderBeeGroup()
  private renderSwarmSummary(): void {
    const swarmSummaryUpperElement = document.querySelector(
      '.swarm-summary--upper'
    ) as HTMLElement;
    const swarmSummaryLowerElement = document.querySelector(
      '.swarm-summary--lower'
    ) as HTMLElement;
    swarmSummaryUpperElement.textContent = '';
    swarmSummaryLowerElement.textContent = '';

    let totalAliveBeesHP = 0;
    const beeTypes = ['Queen', 'Worker', 'Drone'];

    beeTypes.forEach(type => {
      totalAliveBeesHP += this.renderBeeGroup(type, swarmSummaryLowerElement);
    });

    const swarmTitleElement = document.createElement('p');
    const swarmStatusElement = document.createElement('p');

    swarmTitleElement.classList.add('swarm-title');
    swarmStatusElement.classList.add('swarm-spy-status');

    swarmTitleElement.textContent = 'The Swarm!';
    swarmStatusElement.textContent = `Latest spy report 👀 on the The Swarm!’s health: ${totalAliveBeesHP} / ${this.swarm.totalHp}`;

    swarmSummaryUpperElement.append(swarmTitleElement, swarmStatusElement);
  }

  private renderBeeGroup(
    type: string,
    swarmSummaryLowerElement: HTMLElement
  ): number {
    const beesOfType = this.swarm.bees.filter(bee => bee.type == type);
    if (beesOfType.length === 0) return 0;

    const aliveBees = beesOfType.filter(bee => bee.alive);
    const totalGroupHealth = beesOfType.reduce(
      (prev, curr) => prev + curr.hp,
      0
    );
    const beeClass = type.toLowerCase();

    const beeTypeElement = document.createElement('div');
    beeTypeElement.classList.add(`${beeClass}__container`);

    // Bonus: details about the swarm
    aliveBees.forEach((bee, index) => {
      const beeInfoElement = document.createElement('div');
      const textLeftElement = document.createElement('p');
      const textRightElement = document.createElement('p');

      beeInfoElement.classList.add(`${beeClass}`);
      textLeftElement.textContent =
        type === 'Queen' ? `${type}` : `${type} ${index + 1}`;
      textRightElement.textContent = `HP: ${bee.hp} / ${bee.maxHp}`;

      beeInfoElement.append(textLeftElement, textRightElement);
      beeTypeElement.appendChild(beeInfoElement);
    });

    swarmSummaryLowerElement.appendChild(beeTypeElement);
    return totalGroupHealth;
  }

  private renderPlayerName() {
    const playerNameElement = document.getElementById(
      'player-name'
    ) as HTMLElement;
    playerNameElement.textContent = this.playerName;
  }

  private showGameOver(): void {
    const gameOverElement = document.getElementById('game-over') as HTMLElement;
    const hitButtonElement = document.getElementById(
      'hit-button'
    ) as HTMLButtonElement;
    gameOverElement.style.display = 'block';
    hitButtonElement.disabled = true;
  }

  private resetGame(): void {
    this.swarm.initializeSwarm();
    this.saveToLocalStorage();
    this.renderUI();
    this.resetUI();
  }

  private resetUI(): void {
    const gameOverElement = document.getElementById('game-over') as HTMLElement;
    const hitButtonElement = document.getElementById(
      'hit-button'
    ) as HTMLButtonElement;
    const hitInfo = document.getElementById('hit-info') as HTMLElement;

    gameOverElement.style.display = 'none';
    hitButtonElement.disabled = false;
    hitInfo.textContent = '';
  }
}

window.onload = () => {
  // game req did not specifically mention it but I wanted to add an input and offer the player the possibility to enter his/her own name - no more time though
  const playerName = 'Catalin';
  const game = new Game(playerName);
};
