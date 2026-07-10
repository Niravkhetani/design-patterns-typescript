import { AuthStrategy } from './auth-strategy.interface';
import { AuthenticationTemplate } from './auth-template';
import { AuthCredentials, AuthToken, User } from '../common/interfaces';
import { Logger } from '../infrastructure/singleton/logger';

export class AuthService extends AuthenticationTemplate {
  constructor(strategy: AuthStrategy) {
    super(strategy);
  }

  async register(credentials: AuthCredentials): Promise<User> {
    Logger.getInstance().info(`Registering user: ${credentials.email}`);
    return {
      id: `user_${Date.now()}`,
      email: credentials.email,
      name: 'New User',
      role: 'CUSTOMER' as any,
      createdAt: new Date(),
    };
  }

  protected postLoginHook(token: AuthToken): void {
    Logger.getInstance().info(`User logged in, token expires: ${token.expiresAt}`);
  }

  protected postVerificationHook(user: User): void {
    Logger.getInstance().info(`Session verified for user: ${user.id}`);
  }

  protected postLogoutHook(sessionId: string): void {
    Logger.getInstance().info(`Session revoked: ${sessionId}`);
  }
}
