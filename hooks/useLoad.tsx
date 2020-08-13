import React, { useState } from 'react';
import { useExtract } from './useExtract';

interface LoadContext {
    submit: () => void,
    make: string,
    setMake: React.Dispatch<React.SetStateAction<string>>,
    model: string,
    setModel: React.Dispatch<React.SetStateAction<string>>,
    year: number | null,
    setYear: React.Dispatch<React.SetStateAction<number | null>>,
}

const defaultState: LoadContext = {
    submit: () => {},
    make: '',
    setMake: () => {},
    model: '',
    setModel: () => {},
    year: null,
    setYear: () => {},
};

const ctx = React.createContext<LoadContext>(defaultState);

export const LoadProvider: React.FC = ({ children }) => {
    const { matrix } = useExtract();

    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<number | null>(null);

    function submit() {
      const [ keys, ...data ] = matrix;
      const geometries = [];
      
      data.forEach((row) => {
        const geometry = {};

        keys.forEach((k, i) => {
          geometry[k] = row[i]
        })

        geometries.push(geometry);
      })

      console.log(geometries);
    }

    const state: LoadContext = {
        make,
        setMake,
        model,
        setModel,
        year,
        setYear,
        submit,
    }
    
   return (
      <ctx.Provider value={state}>
        {children}
      </ctx.Provider>
    );
  };

export const useLoad = () => React.useContext(ctx);
