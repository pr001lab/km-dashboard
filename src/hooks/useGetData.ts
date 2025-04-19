import { useEffect, useState } from 'react';
import axios from 'axios';
import { Site, Test } from '../types';
import { API, APIRoute } from '../constant';
import { getNameUrl } from '../utils/utils';

export const useGetData = (id = '') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      return await Promise.all([getSites(), getTests()])
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
    };
    fetchData();
  }, []);

  const getSites = async () => {
    const { data } = await axios.get<Site[]>(
      `${API}/${APIRoute.SitesJSONFile}`,
    );
    return data;
  };

  const getTests = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    let { data } = await axios.get<Test[]>(`${API}/${APIRoute.TestsJSONFile}`);
    if (id !== '') {
      data = data.filter((test) => test.id === parseInt(id, 10));
    }

    return Array.isArray(data) ? data : [data];
  };

  return { tests, loading };
};
