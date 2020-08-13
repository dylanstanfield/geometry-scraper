import React, { useState, useEffect } from 'react';
import { useExtract } from './useExtract';

interface TransformContext {
    fontSize: string,
    setFontSize: React.Dispatch<React.SetStateAction<string>>,
    approved: string[],
    setApproved: React.Dispatch<React.SetStateAction<string[]>>,
    overlayOffset: number,
    setOverlayOffset: React.Dispatch<React.SetStateAction<number>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
    selectedLabel: string,
}

const defaultState: TransformContext = {
    fontSize: '',
    setFontSize: () => {},
    approved: [],
    setApproved: () => {},
    overlayOffset: 0,
    setOverlayOffset: () => {},
    selectedIndex: 0,
    setSelectedIndex: () => {},
    selectedLabel: '',
}

const ctx = React.createContext<TransformContext>(defaultState);

export const TransformProvider: React.FC = ({ children }) => {
    const { url, matrix, setMatrix } = useExtract();

    const [fontSize, setFontSize] = useState('11');
    const [approved, setApproved] = useState<string[]>([])
    const [overlayOffset, setOverlayOffset] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState('');

    useEffect(() => {
        setMatrix([[]]);
        setFontSize('11');
        setApproved([]);
        setOverlayOffset(0);
        setSelectedIndex(0);
        setSelectedLabel('');
    }, [url]);

    useEffect(() => {
        setSelectedLabel(selectedIndex === 0 ? 'keys' : matrix[selectedIndex][0]);
    }, [selectedIndex, matrix]);

    const state: TransformContext = {
        fontSize,
        setFontSize,
        approved,
        setApproved,
        overlayOffset,
        setOverlayOffset,
        selectedIndex,
        setSelectedIndex,
        selectedLabel,
    }
    
   return (
      <ctx.Provider value={state}>
        {children}
      </ctx.Provider>
    );
  };

export const useTransform = () => React.useContext(ctx);
