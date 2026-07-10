import { Product } from '../../common/interfaces';
import { CatalogComponent } from './catalog-component';

export class ProductLeaf implements CatalogComponent {
  constructor(private product: Product) {}

  getId(): string {
    return this.product.id;
  }

  getName(): string {
    return this.product.name;
  }

  getPrice(): number {
    return this.product.price;
  }

  isLeaf(): boolean {
    return true;
  }

  add(_component: CatalogComponent): void {
    throw new Error('Cannot add to a leaf product');
  }

  remove(_component: CatalogComponent): void {
    throw new Error('Cannot remove from a leaf product');
  }

  getChildren(): CatalogComponent[] {
    return [];
  }

  getProducts(): Product[] {
    return [this.product];
  }

  getTotalProducts(): number {
    return 1;
  }
}
