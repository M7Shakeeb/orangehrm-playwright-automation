import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

// Scenario-specific data stored per World instance (safe for parallel execution)
export interface ScenarioData {
  // Admin module data
  testUsername?: string;
  testPassword?: string;
  // PIM module data
  testFirstName?: string;
  testLastName?: string;
  testUpdatedFirstName?: string;
  testEmployeeId?: string;
  // Leave module
  testLeaveType?: string;
  testLeaveFromDate?: string;
  testLeaveToDate?: string;
  testLeaveComment?: string;
  testLeaveId?: string;
}

// CustomWorld interface - defines the shape of 'this' in step definitions
export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  scenarioData: ScenarioData;
}

// CustomWorldImpl - concrete implementation with default values
export class CustomWorldImpl extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  scenarioData: ScenarioData = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorldImpl);