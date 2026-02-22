import { randomUUID } from 'crypto';

/**
 * Utility class for generating dynamic test data
 * Prevents data collision on shared demo environment
 */
export class DataGenerator {
  
  /**
   * Generate unique username with timestamp
   * Format: TestUser_<timestamp>
   * @returns Unique username string
   */
  static generateUniqueUsername(): string {
    const timestamp = Date.now();
    return `TestUser_${timestamp}`;
  }

  /**
   * Generate unique username with UUID
   * Format: TestUser_<8-char-uuid>
   * @returns Unique username string
   */
  static generateUniqueUsernameWithUUID(): string {
    const uuid = randomUUID().substring(0, 8);
    return `TestUser_${uuid}`;
  }

  /**
   * Generate unique employee name
   * Format: Test Employee <timestamp>
   * @returns Unique employee name
   */
  static generateUniqueEmployeeName(): string {
    const timestamp = Date.now();
    return `TestEmp${timestamp}`;
  }

  /**
   * Generate unique email address
   * Format: testuser_<timestamp>@example.com
   * @returns Unique email string
   */
  static generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@example.com`;
  }

  /**
   * Generate random password meeting requirements
   * Requirements: 8+ chars, 1 uppercase, 1 lowercase, 1 number
   * @returns Strong password string
   */
  static generatePassword(): string {
    const timestamp = Date.now().toString();
    return `Test${timestamp}!`;
  }

  /**
   * Generate session ID for test run
   * Useful for grouping test data from same execution
   * @returns Session ID string
   */
  static generateSessionId(): string {
    return `session_${Date.now()}_${randomUUID().substring(0, 4)}`;
  }

  /**
   * Get current timestamp
   * @returns Unix timestamp
   */
  static getTimestamp(): number {
    return Date.now();
  }
}
