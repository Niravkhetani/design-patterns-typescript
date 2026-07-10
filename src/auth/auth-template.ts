import { AuthCredentials, AuthToken, User } from '../common/interfaces';
import { AuthStrategy } from './auth-strategy.interface';

export abstract class AuthenticationTemplate {
  protected strategy: AuthStrategy;

  constructor(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  async login(credentials: AuthCredentials): Promise<AuthToken> {
    this.preLoginHook(credentials);
    const token = await this.strategy.authenticate(credentials);
    this.postLoginHook(token);
    return token;
  }

  async verifySession(token: string): Promise<User> {
    const user = await this.strategy.validateToken(token);
    this.postVerificationHook(user);
    return user;
  }

  async logout(sessionId: string): Promise<void> {
    this.preLogoutHook(sessionId);
    await this.strategy.revokeSession(sessionId);
    this.postLogoutHook(sessionId);
  }

  protected preLoginHook(_credentials: AuthCredentials): void {
    // subclasses may override
  }

  protected postLoginHook(_token: AuthToken): void {
    // subclasses may override
  }

  protected postVerificationHook(_user: User): void {
    // subclasses may override
  }

  protected preLogoutHook(_sessionId: string): void {
    // subclasses may override
  }

  protected postLogoutHook(_sessionId: string): void {
    // subclasses may override
  }
}
