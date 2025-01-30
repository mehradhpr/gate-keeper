import { AuthService } from '../src/core/auth-service';
import { MockAdapter } from './mock-adapter';
import { UserAlreadyExistsError } from '../src/core/errors';

describe('AuthService', () => {
  const jwtSecret = 'test-secret';
  let authService: AuthService;
  let mockAdapter: MockAdapter;

  beforeEach(() => {
    mockAdapter = new MockAdapter();
    authService = new AuthService(mockAdapter, jwtSecret);
  });

  test('register new user', async () => {
    const user = await authService.register('test@example.com', 'password');
    expect(user.email).toBe('test@example.com');
  });

  test('prevent duplicate registration', async () => {
    await authService.register('test@example.com', 'password');
    await expect(authService.register('test@example.com', 'password'))
      .rejects.toThrow(UserAlreadyExistsError);
  });
});