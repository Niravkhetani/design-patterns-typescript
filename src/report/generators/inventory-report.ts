import { ReportType } from '../../common/enums';
import { Report } from '../../common/interfaces';
import { ReportGenerator } from '../factory-method/report-factory';
import { Logger } from '../../infrastructure/singleton/logger';

export class InventoryReportGenerator extends ReportGenerator {
  async createReport(): Promise<Report> {
    Logger.getInstance().info('Generating inventory report...');
    return {
      type: ReportType.INVENTORY,
      title: 'Warehouse Inventory Report',
      generatedAt: new Date(),
      data: [
        { sku: 'SKU-001', product: 'Widget A', stock: 150, reorderLevel: 20 },
        { sku: 'SKU-002', product: 'Gadget B', stock: 45, reorderLevel: 50 },
        { sku: 'SKU-003', product: 'Component C', stock: 0, reorderLevel: 100 },
      ],
      summary: {
        totalProducts: 3,
        totalStock: 195,
        lowStockItems: 2,
        outOfStockItems: 1,
      },
    };
  }
}
