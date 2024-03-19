import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); // Add this line

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);

      // Calculate 'last' from 'loadedData' and set it
      const sortedEvents = loadedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestEvent = sortedEvents[0];
      setLast(latestEvent);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]); // Add 'getData' to the dependency array

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // Add 'last' to the context
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;