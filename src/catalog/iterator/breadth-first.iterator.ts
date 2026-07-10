import { CatalogComponent } from '../composite/catalog-component';
import { CatalogIterator } from './catalog-iterator';

export class BreadthFirstIterator implements CatalogIterator<CatalogComponent> {
  private queue: CatalogComponent[];
  private currentIndex: number;

  constructor(root: CatalogComponent) {
    this.queue = [root];
    this.currentIndex = 0;
  }

  current(): CatalogComponent {
    return this.queue[this.currentIndex];
  }

  next(): CatalogComponent {
    const current = this.queue[this.currentIndex];
    if (current && !current.isLeaf()) {
      this.queue.push(...current.getChildren());
    }
    this.currentIndex++;
    return this.queue[this.currentIndex];
  }

  hasNext(): boolean {
    if (this.currentIndex === 0 && this.queue.length > 0) return true;
    return this.currentIndex < this.queue.length - 1;
  }

  reset(): void {
    this.queue = [this.queue[0]];
    this.currentIndex = 0;
  }
}
