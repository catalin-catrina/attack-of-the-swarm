class Bee {
  maxHp: number;
  hp: number;
  damage: number;
  type: string;
  alive: boolean;

  constructor(hp: number, damage: number, type: string) {
    this.maxHp = hp;
    this.hp = hp;
    this.damage = damage;
    this.type = type;
    this.alive = true;
  }

  takeDamage(): void {
    if (!this.alive) {
      return;
    }

    this.hp -= this.damage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }
}

export default Bee;

