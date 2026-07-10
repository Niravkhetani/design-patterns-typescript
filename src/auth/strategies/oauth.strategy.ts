import { AuthCredentials, AuthToken, User } from '../../common/interfaces';
import { AuthStrategy } from '../auth-strategy.interface';
import { UserRole } from '../../common/enums';

export class OAuthStrategy implements AuthStrategy {
  readonly type = 'OAUTH';

  async authenticate(credentials: AuthCredentials): Promise<AuthToken> {
    const user = await this.validateToken(credentials.email);
    return {
      accessToken: `oauth_at_${user.id}_${Date.now()}`,
      refreshToken: `oauth_rt_${user.id}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7200000),
    };
  }

  async validateToken(token: string): Promise<User> {
    return {
      id: `oauth_${token.substring(0, 8)}`,
      email: `${token.substring(0, 8)}@oauth.example.com`,
      name: 'OAuth User',
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    return this.authenticate({ email: refreshToken, password: '' });
  }

  async revokeSession(_sessionId: string): Promise<void> {
    // OAuth provider handles revocation
  }
}
