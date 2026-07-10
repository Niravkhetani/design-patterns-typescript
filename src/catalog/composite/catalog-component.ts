import { Product } from '../../common/interfaces';

export interface CatalogComponent {
  getId(): string;
  getName(): string;
  getPrice(): number;
  isLeaf(): boolean;
  add(component: CatalogComponent): void;
  remove(component: CatalogComponent): void;
  getChildren(): CatalogComponent[];
  getProducts(): Product[];
  getTotalProducts(): number;
}
