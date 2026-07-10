import { Product } from '../../common/interfaces';
import { CatalogComponent } from './catalog-component';

export class CategoryComposite implements CatalogComponent {
  private children: CatalogComponent[] = [];

  constructor(
    private id: string,
    private name: string,
    private description: string
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.children.reduce((sum, child) => sum + child.getPrice(), 0);
  }

  isLeaf(): boolean {
    return false;
  }

  add(component: CatalogComponent): void {
    this.children.push(component);
  }

  remove(component: CatalogComponent): void {
    this.children = this.children.filter(c => c.getId() !== component.getId());
  }

  getChildren(): CatalogComponent[] {
    return [...this.children];
  }

  getProducts(): Product[] {
    return this.children.flatMap(child => child.getProducts());
  }

  getTotalProducts(): number {
    return this.children.reduce((sum, child) => sum + child.getTotalProducts(), 0);
  }
}
