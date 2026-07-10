import { AuthCredentials, AuthToken, User } from '../../common/interfaces';
import { AuthStrategy } from '../auth-strategy.interface';
import { UserRole } from '../../common/enums';

const fakeJwtSign = (payload: Record<string, unknown>): string =>
  Buffer.from(JSON.stringify(payload)).toString('base64');

const fakeJwtVerify = (token: string): Record<string, unknown> =>
  JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

export class JwtStrategy implements AuthStrategy {
  readonly type = 'JWT';

  async authenticate(credentials: AuthCredentials): Promise<AuthToken> {
    const payload = {
      sub: `user_${Date.now()}`,
      email: credentials.email,
      role: UserRole.CUSTOMER,
      iat: Date.now(),
      exp: Date.now() + 3600000,
    };
    const accessToken = fakeJwtSign(payload);
    const refreshToken = fakeJwtSign({ ...payload, type: 'refresh', exp: Date.now() + 86400000 });
    return {
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 3600000),
    };
  }

  async validateToken(token: string): Promise<User> {
    const payload = fakeJwtVerify(token);
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: 'JWT User',
      role: payload.role as UserRole,
      createdAt: new Date(),
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    return this.authenticate({ email: 'refreshed@example.com', password: '' });
  }

  async revokeSession(_sessionId: string): Promise<void> {
    // stateless JWT — revocation handled via blacklist in production
  }
}
