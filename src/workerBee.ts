import Bee from './bee';

export default class WorkerBee extends Bee {
  constructor() {
    super(75, 10, 'Worker');
  }
}
