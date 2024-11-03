abstract class Bee {
  readonly maxHp: number;
  readonly damage: number;
  readonly type: string;
  hp: number;
  alive: boolean;

  constructor(hp: number, damage: number, type: string) {
    this.hp = hp;
    this.maxHp = hp;
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
