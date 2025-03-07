import { useEffect, useState } from 'react';
import axios from 'axios';
import { Site, Test } from '../types';
import { API, APIRoute } from '../constant';
import { getNameUrl } from '../utils';

export const useGetData = (id = '') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getSites(), getTests()])
      .then(([sitesResponse, testsResponse]) => {
        const tests = testsResponse.map((test) => {
          const site = sitesResponse.find((site) => site.id === test.siteId);
          test.site = site?.url && getNameUrl(site.url);
          return test;
        });

        setTests(tests);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getSites = async () => {
    const { data } = await axios.get<Site[]>(`${API}/${APIRoute.Sites}`);
    return data;
  };

  const getTests = async () => {
    const { data } = await axios.get<Test[]>(`${API}/${APIRoute.Tests}/${id}`);
    return Array.isArray(data) ? data : [data];
  };

  return { tests, loading };
};
