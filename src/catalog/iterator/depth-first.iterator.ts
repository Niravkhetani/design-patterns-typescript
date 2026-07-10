import { CatalogComponent } from '../composite/catalog-component';
import { CatalogIterator } from './catalog-iterator';

export class DepthFirstIterator implements CatalogIterator<CatalogComponent> {
  private stack: CatalogComponent[];
  private currentIndex: number;

  constructor(root: CatalogComponent) {
    this.stack = [root];
    this.currentIndex = 0;
  }

  current(): CatalogComponent {
    return this.stack[this.currentIndex];
  }

  next(): CatalogComponent {
    const current = this.stack[this.currentIndex];
    if (current && !current.isLeaf()) {
      const children = current.getChildren();
      this.stack.splice(this.currentIndex + 1, 0, ...children);
    }
    this.currentIndex++;
    return this.stack[this.currentIndex];
  }

  hasNext(): boolean {
    if (this.currentIndex === 0 && this.stack.length > 0) return true;
    return this.currentIndex < this.stack.length - 1;
  }

  reset(): void {
    this.currentIndex = 0;
  }
}
