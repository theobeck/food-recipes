import { ReactNode, createContext, useContext, useState } from 'react';

interface GlobalState {
  searchTerm: string;
  selectedSort: string;
  tags: string[];
  setSearchTerm: (searchTerm: string) => void;
  setSelectedSort: (selectedSort: string) => void;
  setTags: (tags: string[]) => void;
}

const initialState: GlobalState = {
  searchTerm: '',
  selectedSort: '',
  tags: [],
  setSearchTerm: () => {},
  setSelectedSort: () => {},
  setTags: () => {},
};
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalState>(initialState);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialState.searchTerm);
  const [selectedSort, setSelectedSort] = useState<string>(initialState.selectedSort);
  const [tags, setTags] = useState<string[]>(initialState.tags);

  const value = {
    searchTerm,
    setSelectedSort,
    setTags,
    setSearchTerm,
    selectedSort,
    tags,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
