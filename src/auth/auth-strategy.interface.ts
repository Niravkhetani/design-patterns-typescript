import { AuthCredentials, AuthToken, Session, User } from '../common/interfaces';

export interface AuthStrategy {
  readonly type: string;
  authenticate(credentials: AuthCredentials): Promise<AuthToken>;
  validateToken(token: string): Promise<User>;
  refreshToken(refreshToken: string): Promise<AuthToken>;
  revokeSession(sessionId: string): Promise<void>;
}
