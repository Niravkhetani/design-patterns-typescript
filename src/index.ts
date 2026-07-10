import { Logger } from './infrastructure/singleton/logger';
import { ConfigManager } from './infrastructure/singleton/config-manager';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { OAuthStrategy } from './auth/strategies/oauth.strategy';
import { SessionStrategy } from './auth/strategies/session.strategy';
import { AuthService } from './auth/auth-service';
import { StandardPaymentFactory } from './payment/payment-factory';
import { StripeAdapter } from './payment/adapters/stripe.adapter';
import { PayPalApiAdapter } from './payment/adapters/paypal-api.adapter';
import { PaymentMethod } from './common/enums';
import { NotificationPublisher } from './notification/observer/notification-publisher';
import { EmailObserver } from './notification/observers/email-observer';
import { SmsObserver } from './notification/observers/sms-observer';
import { PushObserver } from './notification/observers/push-observer';
import { OrderNotificationBridge } from './notification/bridge/notification-service-bridge';
import { EmailSender } from './notification/bridge/email-sender';
import { SmsSender } from './notification/bridge/sms-sender';
import { OrderFacade } from './order/facade/order-facade';
import { CategoryComposite } from './catalog/composite/category-composite';
import { ProductLeaf } from './catalog/composite/product-leaf';
import { DepthFirstIterator } from './catalog/iterator/depth-first.iterator';
import { BreadthFirstIterator } from './catalog/iterator/breadth-first.iterator';
import { CheckoutFacade } from './checkout/facade/checkout-facade';
import { AuthMiddleware } from './middleware/chain/auth.middleware';
import { ValidationMiddleware } from './middleware/chain/validation.middleware';
import { LoggingMiddleware } from './middleware/chain/logging.middleware';
import { BaseHttpHandler } from './middleware/decorator/base-handler';
import { LoggingDecorator } from './middleware/decorator/logging-decorator';
import { RateLimitDecorator } from './middleware/decorator/rate-limit-decorator';
import { PostgresStorageFactory } from './storage/drivers/postgres-storage';
import { MongoStorageFactory } from './storage/drivers/mongodb-storage';
import { SalesReportGenerator } from './report/generators/sales-report';
import { UserReportGenerator } from './report/generators/user-report';
import { InventoryReportGenerator } from './report/generators/inventory-report';
import { ProductBuilder } from './common/builder/product.builder';
import { ProductPrototype } from './common/prototype/product.prototype';
import { ProductFlyweightFactory } from './common/flyweight/product-flyweight.factory';
import { OrderOriginator, OrderCaretaker } from './common/memento/order-memento';
import { CartMediator } from './common/mediator/cart-mediator';
import { registerCheckoutComponents } from './common/mediator/cart-components';
import { ReportVisitor, DiscountVisitor } from './common/visitor/report.visitor';
import { RealDataService, CachingProxy, AccessControlProxy } from './infrastructure/proxy/data-proxy';
import { CheckoutPaymentContext } from './payment/strategies/checkout-payment.strategy';
import { CreditCardStrategy } from './payment/strategies/credit-card.strategy';
import { PayPalStrategy } from './payment/strategies/paypal.strategy';

async function main(): Promise<void> {
  Logger.getInstance().info('═══════════════════════════════════════');
  Logger.getInstance().info('  E-Commerce Design Patterns Demo');
  Logger.getInstance().info('═══════════════════════════════════════');

  await demonstrateSingleton();
  await demonstrateBuilderAndPrototype();
  await demonstrateFlyweight();
  await demonstrateAbstractFactory();
  await demonstrateFactoryMethod();
  await demonstrateTemplateMethodAndStrategy();
  await demonstrateAdapter();
  await demonstrateObserver();
  await demonstrateBridge();
  await demonstrateCompositeAndIterator();
  await demonstrateState();
  await demonstrateCommand();
  await demonstrateFacade();
  await demonstrateChainOfResponsibility();
  await demonstrateDecorator();
  await demonstrateProxy();
  await demonstrateMemento();
  await demonstrateMediator();
  await demonstrateVisitor();

  Logger.getInstance().info('═══════════════════════════════════════');
  Logger.getInstance().info('  All design patterns demonstrated!');
  Logger.getInstance().info('═══════════════════════════════════════');
}

async function demonstrateSingleton(): Promise<void> {
  Logger.getInstance().info('\n--- Singleton Pattern ---');
  const config1 = ConfigManager.getInstance();
  const config2 = ConfigManager.getInstance();
  console.assert(config1 === config2, 'ConfigManager should be singleton');
  Logger.getInstance().info(`App name: ${config1.get<string>('app.name')}`);
  Logger.getInstance().info(`Environment: ${config1.get<string>('app.environment')}`);
}

async function demonstrateBuilderAndPrototype(): Promise<void> {
  Logger.getInstance().info('\n--- Builder Pattern ---');
  const product = new ProductBuilder()
    .withId('prod_1')
    .withSku('SKU-WIDGET-001')
    .withName('Premium Widget')
    .withDescription('A high-quality widget')
    .withPrice(49.99)
    .withCurrency('USD')
    .withCategory('cat_tools')
    .withAttribute('color', 'blue')
    .withAttribute('material', 'titanium')
    .withStock(250)
    .build();
  Logger.getInstance().info(`Built product: ${product.name} - $${product.price} (${product.stock} in stock)`);

  Logger.getInstance().info('\n--- Prototype Pattern ---');
  const prototype = new ProductPrototype(product);
  const cloned = prototype.clone();
  Logger.getInstance().info(`Cloned product: ${cloned.name}, SKU: ${cloned.sku}`);

  const customClone = prototype.cloneWithOverrides({ price: 39.99, stock: 100 });
  Logger.getInstance().info(`Custom clone: ${customClone.name}, Price: $${customClone.price}, Stock: ${customClone.stock}`);
}

async function demonstrateFlyweight(): Promise<void> {
  Logger.getInstance().info('\n--- Flyweight Pattern ---');
  const factory = new ProductFlyweightFactory();

  const electronics = factory.getFlyweight({
    category: 'Electronics', brand: 'Generic', supplier: 'SupplierA',
    warrantyMonths: 12, returnPolicy: '30 days',
  });
  const electronics2 = factory.getFlyweight({
    category: 'Electronics', brand: 'Generic', supplier: 'SupplierA',
    warrantyMonths: 12, returnPolicy: '30 days',
  });
  const apparel = factory.getFlyweight({
    category: 'Apparel', brand: 'FashionCo', supplier: 'SupplierB',
    warrantyMonths: 0, returnPolicy: '14 days',
  });

  console.assert(electronics === electronics2, 'Should reuse same flyweight');
  Logger.getInstance().info(`Total flyweights created: ${factory.getTotalFlyweights()}`);
  Logger.getInstance().info(`Phone: ${electronics.display({ serial: 'SN001', color: 'black' })}`);
  Logger.getInstance().info(`Tablet: ${electronics2.display({ serial: 'SN002', color: 'silver' })}`);
  Logger.getInstance().info(`Shirt: ${apparel.display({ serial: 'SN003', size: 'L' })}`);
}

async function demonstrateAbstractFactory(): Promise<void> {
  Logger.getInstance().info('\n--- Abstract Factory Pattern ---');
  const pgFactory = new PostgresStorageFactory();
  const pgProductRepo = pgFactory.createProductRepository();
  const pgUserRepo = pgFactory.createUserRepository();
  Logger.getInstance().info('PostgreSQL repositories created');
  await pgProductRepo.findById('test');
  await pgUserRepo.findByEmail('test@example.com');

  const mongoFactory = new MongoStorageFactory();
  const mongoOrderRepo = mongoFactory.createOrderRepository();
  Logger.getInstance().info('MongoDB repositories created');
  await mongoOrderRepo.findById('order_1');
}

async function demonstrateFactoryMethod(): Promise<void> {
  Logger.getInstance().info('\n--- Factory Method Pattern ---');
  const paymentFactory = new StandardPaymentFactory();
  const ccProcessor = paymentFactory.createProcessor(PaymentMethod.CREDIT_CARD);
  Logger.getInstance().info(`Created processor: ${ccProcessor.name}`);

  const payment = await paymentFactory.executePayment(PaymentMethod.CREDIT_CARD, 'order_fm_1', {
    amount: 199.99, currency: 'USD',
  });
  Logger.getInstance().info(`Payment completed: ${payment.id}, status: ${payment.status}`);

  Logger.getInstance().info('\n--- Report Factory Method ---');
  const salesReport = await new SalesReportGenerator().generateAndFormat();
  const inventoryReport = await new InventoryReportGenerator().generateAndFormat();
  const userReport = await new UserReportGenerator().generateAndFormat();
  Logger.getInstance().info(`Sales report generated (${salesReport.length} chars)`);
  Logger.getInstance().info(`Inventory report generated (${inventoryReport.length} chars)`);
  Logger.getInstance().info(`User report generated (${userReport.length} chars)`);
}

async function demonstrateTemplateMethodAndStrategy(): Promise<void> {
  Logger.getInstance().info('\n--- Template Method + Strategy Pattern ---');

  const jwtAuth = new AuthService(new JwtStrategy());
  const jwtToken = await jwtAuth.login({ email: 'alice@example.com', password: 'secret' });
  Logger.getInstance().info(`JWT Login successful, token expires: ${jwtToken.expiresAt}`);

  const user = await jwtAuth.verifySession(jwtToken.accessToken);
  Logger.getInstance().info(`Verified user: ${user.name} (${user.email})`);

  await jwtAuth.logout('session_123');

  const oauthAuth = new AuthService(new OAuthStrategy());
  const oauthToken = await oauthAuth.login({ email: 'bob@oauth.com', password: '' });
  Logger.getInstance().info(`OAuth Login successful, token: ${oauthToken.accessToken.substring(0, 20)}...`);

  const sessionAuth = new AuthService(new SessionStrategy());
  const sessionToken = await sessionAuth.login({ email: 'charlie@example.com', password: 'pass' });
  Logger.getInstance().info(`Session login successful, token: ${sessionToken.accessToken}`);
}

async function demonstrateAdapter(): Promise<void> {
  Logger.getInstance().info('\n--- Adapter Pattern ---');
  const stripeAdapter = new StripeAdapter();
  const stripePayment = await stripeAdapter.processPayment('order_adapter_1', {
    amount: 49.99, currency: 'USD',
  });
  Logger.getInstance().info(`Stripe adapter payment: ${stripePayment.id}, txn: ${stripePayment.transactionId}`);

  const paypalAdapter = new PayPalApiAdapter();
  const paypalPayment = await paypalAdapter.processPayment('order_adapter_2', {
    amount: 99.99, currency: 'USD',
  });
  Logger.getInstance().info(`PayPal adapter payment: ${paypalPayment.id}, txn: ${paypalPayment.transactionId}`);

  await stripeAdapter.refundPayment(stripePayment.id);
  Logger.getInstance().info('Stripe payment refunded via adapter');
}

async function demonstrateObserver(): Promise<void> {
  Logger.getInstance().info('\n--- Observer Pattern ---');
  const publisher = new NotificationPublisher();
  const emailObs = new EmailObserver();
  const smsObs = new SmsObserver();
  const pushObs = new PushObserver();

  publisher.subscribe('order.confirmed', emailObs);
  publisher.subscribe('order.confirmed', smsObs);
  publisher.subscribe('shipping.update', pushObs);

  await publisher.notify('order.confirmed', {
    channel: 'ORDER_CONFIRMATION' as any,
    recipient: 'alice@example.com',
    subject: 'Order Confirmed',
    body: 'Your order #12345 has been confirmed.',
    data: { orderId: '12345' },
  });

  await publisher.notify('shipping.update', {
    channel: 'SHIPPING_UPDATE' as any,
    recipient: 'device_token_abc',
    subject: 'Package Shipped',
    body: 'Your package is on the way!',
    data: { trackingId: 'TRACK-001' },
  });
}

async function demonstrateBridge(): Promise<void> {
  Logger.getInstance().info('\n--- Bridge Pattern ---');
  const orderNotif = new OrderNotificationBridge(new EmailSender());
  await orderNotif.send({
    type: 'EMAIL' as any,
    channel: 'ORDER_CONFIRMATION' as any,
    recipient: 'alice@example.com',
    subject: 'Your Order #54321',
    body: 'Thank you for your purchase!',
  });

  orderNotif.setSender(new SmsSender());
  await orderNotif.send({
    type: 'SMS' as any,
    channel: 'SHIPPING_UPDATE' as any,
    recipient: '+1234567890',
    subject: 'Shipping Update',
    body: 'Your order has been shipped! Track: TRACK-002',
  });
}

async function demonstrateCompositeAndIterator(): Promise<void> {
  Logger.getInstance().info('\n--- Composite Pattern ---');
  const electronicsCat = new CategoryComposite('cat_1', 'Electronics', 'Electronic items');
  const laptop = new ProductLeaf({
    id: 'p1', sku: 'LAP-001', name: 'Laptop Pro', description: 'High-end laptop',
    price: 1999.99, currency: 'USD', categoryId: 'cat_1', attributes: {}, stock: 50,
    createdAt: new Date(), updatedAt: new Date(),
  });
  const phone = new ProductLeaf({
    id: 'p2', sku: 'PHN-001', name: 'Smartphone X', description: 'Latest smartphone',
    price: 999.99, currency: 'USD', categoryId: 'cat_1', attributes: {}, stock: 200,
    createdAt: new Date(), updatedAt: new Date(),
  });
  electronicsCat.add(laptop);
  electronicsCat.add(phone);

  const booksCat = new CategoryComposite('cat_2', 'Books', 'All books');
  const book = new ProductLeaf({
    id: 'p3', sku: 'BK-001', name: 'TypeScript Handbook', description: 'Learn TypeScript',
    price: 39.99, currency: 'USD', categoryId: 'cat_2', attributes: {}, stock: 500,
    createdAt: new Date(), updatedAt: new Date(),
  });
  booksCat.add(book);

  const root = new CategoryComposite('cat_0', 'Root', 'Root category');
  root.add(electronicsCat);
  root.add(booksCat);

  Logger.getInstance().info(`Total products in catalog: ${root.getTotalProducts()}`);
  Logger.getInstance().info(`Electronics has ${electronicsCat.getTotalProducts()} products`);

  Logger.getInstance().info('\n--- Iterator Pattern (Depth-First) ---');
  const dfsIterator = new DepthFirstIterator(root);
  while (dfsIterator.hasNext()) {
    const component = dfsIterator.next();
    Logger.getInstance().info(`[DFS] ${component.isLeaf() ? 'Product' : 'Category'}: ${component.getName()} ($${component.getPrice()})`);
  }

  Logger.getInstance().info('\n--- Iterator Pattern (Breadth-First) ---');
  const bfsIterator = new BreadthFirstIterator(root);
  while (bfsIterator.hasNext()) {
    const component = bfsIterator.next();
    Logger.getInstance().info(`[BFS] ${component.isLeaf() ? 'Product' : 'Category'}: ${component.getName()}`);
  }
}

async function demonstrateState(): Promise<void> {
  Logger.getInstance().info('\n--- State Pattern ---');
  const order = await new OrderFacade().createOrder(
    'user_1',
    [{ productId: 'p1', productName: 'Laptop', quantity: 1, unitPrice: 1999.99, totalPrice: 1999.99 }],
    { street: '123 Main St', city: 'Portland', state: 'OR', zipCode: '97201', country: 'US' },
    PaymentMethod.CREDIT_CARD
  );
  Logger.getInstance().info(`Order created: ${order.id}, status: ${order.status}`);

  const facade = new OrderFacade();

  const cancelledOrder = await facade.cancelOrder(order);
  Logger.getInstance().info(`Order cancelled: ${cancelledOrder.id}, status: ${cancelledOrder.status}`);
}

async function demonstrateCommand(): Promise<void> {
  Logger.getInstance().info('\n--- Command Pattern ---');
  const facade = new OrderFacade();
  const order = await facade.createOrder(
    'user_cmd',
    [{ productId: 'p1', productName: 'Item', quantity: 2, unitPrice: 25.00, totalPrice: 50.00 }],
    { street: '456 Oak Ave', city: 'Seattle', state: 'WA', zipCode: '98101', country: 'US' },
    PaymentMethod.PAYPAL
  );
  Logger.getInstance().info(`Command: Order placed - ${order.id} (${order.status})`);
}

async function demonstrateFacade(): Promise<void> {
  Logger.getInstance().info('\n--- Facade Pattern (Checkout) ---');
  const checkout = new CheckoutFacade();
  const cart = {
    id: 'cart_1',
    userId: 'user_1',
    items: [
      { productId: 'p1', productName: 'Laptop Pro', quantity: 1, unitPrice: 1999.99 },
      { productId: 'p3', productName: 'TypeScript Handbook', quantity: 2, unitPrice: 39.99 },
    ],
    totalAmount: 2079.97,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const user = {
    id: 'user_1', email: 'alice@example.com', name: 'Alice',
    role: 'CUSTOMER' as any, createdAt: new Date(),
  };
  const address = {
    street: '789 Pine St', city: 'San Francisco', state: 'CA', zipCode: '94101', country: 'US',
  };

  checkout.setPaymentStrategy(new PayPalStrategy());
  const result = await checkout.initiateCheckout(cart, user, address);
  Logger.getInstance().info(`Checkout ${result.success ? 'succeeded' : 'failed'}: order ${result.order?.id}`);
}

async function demonstrateChainOfResponsibility(): Promise<void> {
  Logger.getInstance().info('\n--- Chain of Responsibility Pattern ---');
  const authMw = new AuthMiddleware();
  const validMw = new ValidationMiddleware();
  const logMw = new LoggingMiddleware();

  logMw.setNext(authMw).setNext(validMw);

  const validRequest = {
    id: 'req_1', userId: 'user_1', method: 'POST', path: '/orders',
    headers: { authorization: 'Bearer token123', 'content-type': 'application/json' },
    body: { productId: 'p1', quantity: 1 },
    timestamp: new Date(),
  };

  const response1 = await logMw.handle(validRequest);
  Logger.getInstance().info(`Chain response (valid): ${response1?.statusCode}`);

  const invalidRequest = {
    ...validRequest,
    id: 'req_2',
    headers: {},
    body: null,
  };

  const response2 = await logMw.handle(invalidRequest);
  Logger.getInstance().info(`Chain response (invalid): ${response2?.statusCode} - ${JSON.stringify(response2?.body)}`);
}

async function demonstrateDecorator(): Promise<void> {
  Logger.getInstance().info('\n--- Decorator Pattern ---');
  const handler = new RateLimitDecorator(new LoggingDecorator(new BaseHttpHandler()));

  const request = {
    id: 'req_dec_1', userId: 'user_1', method: 'GET', path: '/api/products',
    headers: {}, body: {}, timestamp: new Date(),
  };

  const response = await handler.handle(request);
  Logger.getInstance().info(`Decorator response: ${response.statusCode}`);

  for (let i = 0; i < 3; i++) {
    await handler.handle(request);
  }
}

async function demonstrateProxy(): Promise<void> {
  Logger.getInstance().info('\n--- Proxy Pattern ---');
  const realService = new RealDataService();
  const cacheProxy = new CachingProxy(realService);

  const product1 = await cacheProxy.getProduct('prod_1');
  Logger.getInstance().info(`Proxy: Got product ${product1.name} (uncached)`);

  const productCached = await cacheProxy.getProduct('prod_1');
  Logger.getInstance().info(`Proxy: Got product ${productCached.name} (cached)`);

  const accessProxy = new AccessControlProxy(realService, 'GUEST');
  try {
    await accessProxy.getUser('user_1');
  } catch (err: any) {
    Logger.getInstance().info(`Proxy access control: ${err.message}`);
  }
}

async function demonstrateMemento(): Promise<void> {
  Logger.getInstance().info('\n--- Memento Pattern ---');
  const originator = new OrderOriginator();
  const caretaker = new OrderCaretaker();

  const order = await new OrderFacade().createOrder(
    'user_memento',
    [{ productId: 'p1', productName: 'Item', quantity: 1, unitPrice: 100.00, totalPrice: 100.00 }],
    { street: '123 St', city: 'NYC', state: 'NY', zipCode: '10001', country: 'US' },
    PaymentMethod.CREDIT_CARD
  );

  const snapshot = originator.createSnapshot(order);
  caretaker.save(snapshot);
  Logger.getInstance().info(`Memento: Saved snapshot at ${snapshot.snapshotTimestamp}`);

  const restored = caretaker.restore();
  if (restored) {
    const restoredOrder = restored.toOrder();
    Logger.getInstance().info(`Memento: Restored order ${restoredOrder.id} with status ${restoredOrder.status}`);
  }
}

async function demonstrateMediator(): Promise<void> {
  Logger.getInstance().info('\n--- Mediator Pattern ---');
  registerCheckoutComponents();
  const mediator = CartMediator.getInstance();

  await mediator.onCheckoutCompleted('cart_med_1', 'order_med_1');
  await mediator.onPaymentCompleted('order_med_1');
}

async function demonstrateVisitor(): Promise<void> {
  Logger.getInstance().info('\n--- Visitor Pattern ---');
  const reportVisitor = new ReportVisitor();
  const discountVisitor = new DiscountVisitor();

  const product = new ProductBuilder()
    .withId('p_v')
    .withSku('SKU-VISITOR')
    .withName('Visitor Product')
    .withPrice(150.00)
    .withStock(200)
    .build();

  const productReport = reportVisitor.visitProduct(product);
  Logger.getInstance().info(`Visitor product report: ${JSON.stringify(productReport)}`);

  const discount = discountVisitor.visitProduct(product);
  Logger.getInstance().info(`Visitor discount for product: $${discount}`);

  const order = await new OrderFacade().createOrder(
    'user_v',
    [{ productId: 'p_v', productName: 'Visitor Product', quantity: 5, unitPrice: 150.00, totalPrice: 750.00 }],
    { street: '1 Visitor Ln', city: 'Test', state: 'CA', zipCode: '90001', country: 'US' },
    PaymentMethod.CREDIT_CARD
  );

  const orderDiscount = discountVisitor.visitOrder(order);
  Logger.getInstance().info(`Visitor discount for order: $${orderDiscount} (${order.totalAmount > 500 ? '15%' : 'none'})`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Demo failed:', err);
    process.exit(1);
  });
}
