import { jest } from '@jest/globals';
import * as helpers from './index.js';

// TODO: This times out for some reason I do not understand
test('get NY state code from county fips', (t) => {
  const helperStateCode = helpers.getStateCodeFromCountyFips('36001')
  expect(helperStateCode).toBe('36')
})