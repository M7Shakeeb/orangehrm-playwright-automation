import * as fs from 'fs';
import * as path from 'path';

/**
 * Defining the structure of users.json
 */
export interface UserData {
  validUser: {
    username: string;
    password: string;
    role: string;
  };
  invalidUsers: Array<{
    username: string;
    password: string;
    expectedError: string;
  }>;
  userRoles: string[];
  userStatuses: string[];
}

/**
 * Utility class for loading test data from JSON files
 */
export class DataLoader {
  
  // Load JSON file from test-data directory
  static loadJSON<T>(filename: string): T {
    try {
      const filePath = path.join(process.cwd(), 'test-data', filename);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Test data file not found: ${filePath}`);
      }
      
      const rawData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(rawData) as T;
      
    } catch (error) {
      console.error(`Failed to load test data from ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Load complete user data structure from users.json
   * @returns UserData object with all user test data
   */
  static getUsersData(): UserData {
    return this.loadJSON<UserData>('users.json');
  }

  /**
   * Get valid user credentials
   * @returns Valid user object
   */
  static getValidUser() {
    return this.getUsersData().validUser;
  }

  /**
   * Load invalid user test cases
   * @returns Array of invalid user objects
   */
  static getInvalidUsers() {
    return this.getUsersData().invalidUsers;
  }

  /**
   * Load admin user roles
   * @returns Array of user role options
   */
  static getUserRoles() {
    return this.getUsersData().userRoles;
  }

  /**
     Get available user statuses
   */
  static getUserStatuses() {
    return this.getUsersData().userStatuses;
  }
}
