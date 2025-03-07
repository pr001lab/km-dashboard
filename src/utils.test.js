import {
  getFilterData,
  getNameUrl,
  getSortData,
  getTextTransformCapitalize,
} from './utils';
import { mockSites, mockTests } from '../mocks/mocks';
import { fieldSort, SortEnum } from './constant';

describe('validate Capitalized word', () => {
  test('getTextTransformCapitalize', () => {
    expect(getTextTransformCapitalize('word')).toBe('Word');
  });
});

describe('getFilterData', () => {
  it('should return correct filtered data based on name (case insensitive)', () => {
    const result = getFilterData(mockTests, 'prototype');
    expect(result).toEqual([
      mockTests[0], // 'Prototype of the new map'
      mockTests[5], // 'Prototype of a new header'
    ]);
  });

  it('should return correct filtered data when search term is case-insensitive', () => {
    const result = getFilterData(mockTests, 'DARK THEME TEST');
    expect(result).toEqual([mockTests[1]]); // 'Dark theme test'
  });

  it('should return empty array if no items match the search term', () => {
    const result = getFilterData(mockTests, 'non-existent name');
    expect(result).toEqual([]);
  });

  it('should return all data if search term is empty', () => {
    const result = getFilterData(mockTests, '');
    expect(result).toEqual(mockTests); // All data must be returned
  });

  it('should handle special characters in the search term', () => {
    const result = getFilterData(mockTests, "new year's sale");
    expect(result).toEqual([
      mockTests[2], // "New Year's Sale"
      mockTests[6], // "New Year's Sale Copy 1"
    ]);
  });

  it('should handle search with spaces correctly', () => {
    const result = getFilterData(mockTests, 'order basket');
    expect(result).toEqual([mockTests[3]]); // 'Order basket redesing'
  });

  it('should return correct filtered data when search term matches part of name', () => {
    const result = getFilterData(mockTests, 'sale');
    expect(result).toEqual([
      mockTests[2], // "New Year's Sale"
      mockTests[6], // "New Year's Sale Copy 1"
    ]);
  });

  it('should return an empty array for an empty data array', () => {
    const result = getFilterData([], 'prototype');
    expect(result).toEqual([]); // An empty array if there is no data
  });
});

describe('getSortData', () => {
  // Tests for sorting by STATUS field
  describe('when sorting by STATUS', () => {
    it('should sort by status in ascending order', () => {
      const sortFunction = getSortData(fieldSort.STATUS, SortEnum.Ascending);

      const a = { status: 'PAUSED' };
      const b = { status: 'STOPPED' };

      expect(sortFunction(a, b)).toBeLessThan(0); // PAUSED must be before STOPPED

      const c = { status: 'ONLINE' };
      const d = { status: 'DRAFT' };

      expect(sortFunction(c, d)).toBeLessThan(0); // ONLINE must be before DRAFT
    });

    it('should sort by status in descending order', () => {
      const sortFunction = getSortData(fieldSort.STATUS, SortEnum.Descending);

      const a = { status: 'PAUSED' };
      const b = { status: 'STOPPED' };

      expect(sortFunction(a, b)).toBeGreaterThan(0); // PAUSED must be after STOPPED

      const c = { status: 'ONLINE' };
      const d = { status: 'DRAFT' };

      expect(sortFunction(c, d)).toBeGreaterThan(0); // ONLINE must be after DRAFT
    });

    it('should return 0 when statuses are the same', () => {
      const sortFunction = getSortData(fieldSort.STATUS, SortEnum.Ascending);

      const a = { status: 'ONLINE' };
      const b = { status: 'ONLINE' };

      expect(sortFunction(a, b)).toBe(0); // The statuses are the same, the result is 0
    });
  });

  // Tests for sorting by string field (for example, url)
  describe('when sorting by a string field', () => {
    it('should sort by url in ascending order', () => {
      const sortFunction = getSortData('url', SortEnum.Ascending);
      mockSites[0].url = getNameUrl(mockSites[0].url);
      mockSites[1].url = getNameUrl(mockSites[1].url);
      const a = mockSites[0]; // { id: 1, url: 'market.company.com' }
      const b = mockSites[1]; // { id: 2, url: 'delivery.company.com' }

      expect(sortFunction(a, b)).toBeGreaterThan(0); // 'www.delivery.company.com' must be before 'market.company.com'

      mockSites[2].url = getNameUrl(mockSites[2].url);
      const c = mockSites[2]; // { id: 3, url: 'games.company.com' }
      const d = mockSites[0]; // { id: 1, url: 'market.company.com' }

      expect(sortFunction(c, d)).toBeLessThan(0); // 'market.company.com' must be after 'games.company.com'
    });

    it('should sort by url in descending order', () => {
      const sortFunction = getSortData('url', SortEnum.Descending);

      const a = mockSites[0]; // { id: 1, url: 'market.company.com' }
      const b = mockSites[1]; // { id: 2, url: 'delivery.company.com' }

      expect(sortFunction(a, b)).toBeLessThan(0); // 'games.company.com' must be before 'market.company.com'

      const c = mockSites[2]; // { id: 3, url: 'games.company.com' }
      const d = mockSites[0]; // { id: 1, url: 'market.company.com' }

      expect(sortFunction(c, d)).toBeGreaterThan(0); // 'market.company.com' must be after 'www.delivery.company.com'
    });

    it('should return 0 when urls are the same', () => {
      const sortFunction = getSortData('url', SortEnum.Ascending);

      const a = { url: 'https://market.company.com' };
      const b = { url: 'https://market.company.com' };

      expect(sortFunction(a, b)).toBe(0); // The URLs are the same, the result is 0
    });
  });

  // Tests for sorting when using SortEnum.None
  describe('when sort order is None', () => {
    it('should return 0 for any comparison', () => {
      const sortFunction = getSortData('url', SortEnum.None);

      const a = { url: 'https://market.company.com' };
      const b = { url: 'https://www.delivery.company.com' };

      expect(sortFunction(a, b)).toBe(0); // Regardless of the URL values, the result is 0
    });

    it('should return 0 when sorting by status and order is None', () => {
      const sortFunction = getSortData(fieldSort.STATUS, SortEnum.None);

      const a = { status: 'PAUSED' };
      const b = { status: 'STOPPED' };

      expect(sortFunction(a, b)).toBe(0); // Regardless of the STATUS values, the result is 0
    });
  });
});

describe('getNameUrl', () => {
  // Test: URL with the www. prefix
  it('should remove "www." from the hostname', () => {
    const result = getNameUrl('https://www.example.com');
    expect(result).toBe('example.com');
  });

  // Test: URL without the www. prefix
  it('should return the hostname without modification if "www." is not present', () => {
    const result = getNameUrl('https://example.com');
    expect(result).toBe('example.com');
  });

  // Test: URL with a different prefix (for example, with http)
  it('should return the correct hostname when the URL starts with "http://"', () => {
    const result = getNameUrl('http://www.example.com');
    expect(result).toBe('example.com');
  });

  // Test: URL with subdomain
  it('should return the correct hostname even with subdomains', () => {
    const result = getNameUrl('https://sub.example.com');
    expect(result).toBe('sub.example.com');
  });

  // Test: Does it work with URLs containing the port
  it('should return the hostname correctly when the URL contains a port', () => {
    const result = getNameUrl('https://example.com:8080');
    expect(result).toBe('example.com');
  });
});
