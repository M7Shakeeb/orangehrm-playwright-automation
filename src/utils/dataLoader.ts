/**
 * ============================================================================
 * DEPRECATED AS OF WEEK 3
 * ============================================================================
 * 
 * Context: 
 * This DataLoader was built to drive data-driven testing via external JSON.
 * 
 * Decision: 
 * I officially pivoted away from this approach in favor of native Gherkin 
 * `Scenario Outlines` and `Examples` tables (see src/features/pim.feature).
 * 
 * Reason: 
 * If the OrangeHRM add employee form had 45 fields (address, tax info, 
 * emergency contacts, dependents, etc.), putting 45 columns in a Gherkin 
 * Examples table would be unreadable. In that case, JSON is mandatory.
 * But for simple data like firstName and lastName, the Gherkin table is
 * far superior because of the reporting benefits.
 * 
 * Status: 
 * Code is preserved in the repository to demonstrate TypeScript file-system 
 * and generic interface handling, but is not actively wired into the step definitions.
 * ============================================================================
 */


import * as fs from 'fs';
import * as path from 'path';

// User Data Interfaces
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

// Employee Data Interfaces
export interface SearchTestCase {
  searchName: string;
  expectResults: boolean;
  description: string;
}

export interface InvalidEmployee {
  firstName: string;
  lastName: string;
  expectedError: string;
}

export interface EmployeeData {
  searchTestCases: SearchTestCase[];
  invalidEmployees: InvalidEmployee[];
}

// DataLoader Class
export class DataLoader {
  
  // Generic type-safe JSON loader with error handling
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

  // User Data Methods
  static loadUserData(): UserData {
    return this.loadJSON<UserData>('users.json');
  }

  static getValidUser() {
    return this.loadUserData().validUser;
  }

  static getInvalidUsers() {
    return this.loadUserData().invalidUsers;
  }

  static getUserRoles() {
    return this.loadUserData().userRoles;
  }

  static getUserStatuses() {
    return this.loadUserData().userStatuses;
  }

  // Employee Data Methods
  static getEmployeeData(): EmployeeData {
    return this.loadJSON<EmployeeData>('employees.json');
  }

  static getSearchTestCases(): SearchTestCase[] {
    return this.getEmployeeData().searchTestCases;
  }

  static getInvalidEmployees(): InvalidEmployee[] {
    return this.getEmployeeData().invalidEmployees;
  }
}