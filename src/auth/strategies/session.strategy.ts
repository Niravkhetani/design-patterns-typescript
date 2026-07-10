import { AuthCredentials, AuthToken, Session, User } from '../../common/interfaces';
import { AuthStrategy } from '../auth-strategy.interface';
import { UserRole } from '../../common/enums';

const sessions = new Map<string, Session>();

export class SessionStrategy implements AuthStrategy {
  readonly type = 'SESSION';

  async authenticate(credentials: AuthCredentials): Promise<AuthToken> {
    const session: Session = {
      id: `sess_${Date.now()}`,
      userId: `user_${Date.now()}`,
      token: `sess_token_${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000),
      createdAt: new Date(),
    };
    sessions.set(session.id, session);
    return {
      accessToken: session.token,
      refreshToken: session.id,
      expiresAt: session.expiresAt,
    };
  }

  async validateToken(token: string): Promise<User> {
    for (const session of sessions.values()) {
      if (session.token === token && session.expiresAt > new Date()) {
        return {
          id: session.userId,
          email: 'session@example.com',
          name: 'Session User',
          role: UserRole.CUSTOMER,
          createdAt: session.createdAt,
        };
      }
    }
    throw new Error('Invalid or expired session');
  }

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    const session = sessions.get(refreshToken);
    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid refresh token');
    }
    session.token = `sess_token_${Date.now()}`;
    session.expiresAt = new Date(Date.now() + 86400000);
    return {
      accessToken: session.token,
      refreshToken: session.id,
      expiresAt: session.expiresAt,
    };
  }

  async revokeSession(sessionId: string): Promise<void> {
    sessions.delete(sessionId);
  }
}
