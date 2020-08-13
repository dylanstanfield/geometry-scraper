import React, { useState } from 'react';

interface LoadContext {
    make: string,
    setMake: React.Dispatch<React.SetStateAction<string>>,
    model: string,
    setModel: React.Dispatch<React.SetStateAction<string>>,
    year: number | null,
    setYear: React.Dispatch<React.SetStateAction<number | null>>,
}

const defaultState: LoadContext = {
    make: '',
    setMake: () => {},
    model: '',
    setModel: () => {},
    year: null,
    setYear: () => {},
};

const ctx = React.createContext<LoadContext>(defaultState);

export const LoadProvider: React.FC = ({ children }) => {
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<number | null>(null);

    const state: LoadContext = {
        make,
        setMake,
        model,
        setModel,
        year,
        setYear,
    }
    
   return (
      <ctx.Provider value={state}>
        {children}
      </ctx.Provider>
    );
  };

export const useLoad = () => React.useContext(ctx);
