import React, { useState } from 'react';

interface ExtractContext {
    matrix: string[][],
    setMatrix: React.Dispatch<React.SetStateAction<string[][]>>,
    url: Tesseract.ImageLike | null,
    setUrl: React.Dispatch<React.SetStateAction<Tesseract.ImageLike | null>>,
}

const defaultState: ExtractContext = {
    matrix: [],
    setMatrix: () => {},
    url: null,
    setUrl: () => {},
}

const ctx = React.createContext<ExtractContext>(defaultState);

export const ExtractProvider: React.FC = ({ children }) => {
    const [url, setUrl] = useState<Tesseract.ImageLike | null>(null);
    const [matrix, setMatrix] = useState<string[][]>([[]]);

    const state: ExtractContext = {
        matrix,
        setMatrix,
        url,
        setUrl,
    }
    
   return (
      <ctx.Provider value={state}>
        {children}
      </ctx.Provider>
    );
  };

export const useExtract = () => React.useContext(ctx);
