// src/contexts/SchoolYearContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import mainAxios from '../../apis/main-axios';

export type YearContextType = {
  idYear: number | null;
  setIdYear: (year: number | null) => void;
  schoolYears: any[]; // Consider specifying
};

export const YearContext = createContext<YearContextType>({
  idYear: null,
  setIdYear: () => {},
  schoolYears: [],
});

interface Props {
  children: ReactNode;
}

const YearProvider: React.FC<Props> = ({ children }) => {
  const [idYear, setIdYear] = useState<number | null>(() => {
    const storedYear = localStorage.getItem('idYear');
    return storedYear ? parseInt(storedYear, 10) : null;
  });
  const [schoolYears, setSchoolYears] = useState<any[]>([]);

  const fetchData = (id: number) => {
    mainAxios
      .get(`/api/v1/school/school-year`)
      .then((response) => {
        setSchoolYears(response.data);
        const defaultOption = response.data.find((year: any) => year.id === id);
        if (defaultOption) {
          setIdYear(defaultOption.id);
          console.log(defaultOption.id);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (idYear !== null) {
      localStorage.setItem('idYear', idYear.toString());
      fetchData(idYear);
    }
  }, [idYear]);

  const value = useMemo(
    () => ({
      idYear,
      setIdYear,
      schoolYears,
    }),
    [idYear, schoolYears]
  );

  return <YearContext.Provider value={value}>{children}</YearContext.Provider>;
};

export default YearProvider;
