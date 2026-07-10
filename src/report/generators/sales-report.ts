import { ReportType } from '../../common/enums';
import { Report } from '../../common/interfaces';
import { ReportGenerator } from '../factory-method/report-factory';
import { Logger } from '../../infrastructure/singleton/logger';

export class SalesReportGenerator extends ReportGenerator {
  async createReport(): Promise<Report> {
    Logger.getInstance().info('Generating sales report...');
    return {
      type: ReportType.SALES,
      title: 'Monthly Sales Report',
      generatedAt: new Date(),
      data: [
        { orderId: 'ORD-001', amount: 150.00, date: '2026-06-01' },
        { orderId: 'ORD-002', amount: 275.50, date: '2026-06-02' },
        { orderId: 'ORD-003', amount: 89.99, date: '2026-06-03' },
      ],
      summary: {
        totalOrders: 3,
        totalRevenue: 515.49,
        averageOrderValue: 171.83,
      },
    };
  }
}
