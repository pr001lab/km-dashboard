import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetData } from './useGetData';
import { mockSites, mockTests } from '../../mocks/mocks';

jest.mock('axios');

const mockOriginalTests = [
  {
    'id': 1,
    'name': 'Prototype of the new map',
    'type': 'CLASSIC',
    'status': 'PAUSED',
    'siteId': 2,
    'site': 'delivery.company.com',
  },
  {
    'id': 2,
    'name': 'Dark theme test',
    'type': 'MVT',
    'status': 'DRAFT',
    'siteId': 3,
    'site': 'games.company.com',
  },
  {
    'id': 3,
    'name': "New Year's Sale",
    'type': 'MVT',
    'status': 'STOPPED',
    'siteId': 1,
    'site': 'market.company.com',
  },
  {
    'id': 4,
    'name': 'Order basket redesing',
    'type': 'CLASSIC',
    'status': 'ONLINE',
    'siteId': 1,
    'site': 'market.company.com',
  },
  {
    'id': 5,
    'name': 'Spring promotion',
    'type': 'SERVER_SIDE',
    'status': 'DRAFT',
    'siteId': 2,
    'site': 'delivery.company.com',
  },
  {
    'id': 6,
    'name': 'Prototype of a new header',
    'type': 'SERVER_SIDE',
    'status': 'ONLINE',
    'siteId': 3,
    'site': 'games.company.com',
  },
  {
    'id': 7,
    'name': "New Year's Sale Copy 1",
    'type': 'MVT',
    'status': 'DRAFT',
    'siteId': 1,
    'site': 'market.company.com',
  },
];

const mockOriginalData = { 'loading': false, tests: mockOriginalTests };

describe('useGetData tests', () => {
  it('Correct value test', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: mockSites }),
    );

    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: mockTests }),
    );

    const { result } = renderHook(() => useGetData());

    await waitFor(() => {
      expect(result.current).toEqual(mockOriginalData);
    });
  });
});
