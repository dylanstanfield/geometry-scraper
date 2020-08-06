import React, { useState, useEffect } from 'react';

interface AppContext {
    image: {
        matrix: string[][],
        setMatrix: React.Dispatch<React.SetStateAction<string[][]>>,
        url: Tesseract.ImageLike | null,
        setUrl: React.Dispatch<React.SetStateAction<Tesseract.ImageLike | null>>,
        input: string,
        setInput: React.Dispatch<React.SetStateAction<string>>,
    },
    controls: {
        fontSize: string,
        setFontSize: React.Dispatch<React.SetStateAction<string>>,
        approved: string[],
        setApproved: React.Dispatch<React.SetStateAction<string[]>>,
        overlayOffset: number,
        setOverlayOffset: React.Dispatch<React.SetStateAction<number>>,
        selectedIndex: number,
        setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
        selectedLabel: string,
    },
}

const defaultState: AppContext = {
    image: {
        matrix: [],
        setMatrix: () => {},
        url: null,
        setUrl: () => {},
        input: '',
        setInput: () => {},
    },
    controls: {
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
}

const ctx = React.createContext<AppContext>(defaultState);

export const AppProvider: React.FC = ({ children }) => {
    // image
    const [imageUrl, setImageUrl] = useState<Tesseract.ImageLike | null>(null);
    const [imageInput, setImageInput] = useState<string>('');
    const [imageMatrix, setImageMatrix] = useState<string[][]>([[]]);

    // controls
    const [editorFontSize, setEditorFontSize] = useState('11');
    const [editorApproved, setEditorApproved] = useState<string[]>([])
    const [editorOverlayOffset, setEditorOverlayOffset] = useState(0);
    const [editorSelectedIndex, setEditorSelectedIndex] = useState(0);
    const [editorSelectedLabel, setEditorSelectedLabel] = useState('');

    useEffect(() => {
        setImageMatrix([[]]);
        setEditorFontSize('11');
        setEditorApproved([]);
        setEditorOverlayOffset(0);
        setEditorSelectedIndex(0);
        setEditorSelectedLabel('');
    }, [imageUrl]);

    useEffect(() => {
        setEditorSelectedLabel(editorSelectedIndex === 0 ? 'keys' : imageMatrix[editorSelectedIndex][0]);
    }, [editorSelectedIndex, imageMatrix]);

    const state: AppContext = {
        image: {
            matrix: imageMatrix,
            setMatrix: setImageMatrix,
            url: imageUrl,
            setUrl: setImageUrl,
            input: imageInput,
            setInput: setImageInput,
        },
        controls: {
            fontSize: editorFontSize,
            setFontSize: setEditorFontSize,
            approved: editorApproved,
            setApproved: setEditorApproved,
            overlayOffset: editorOverlayOffset,
            setOverlayOffset: setEditorOverlayOffset,
            selectedIndex: editorSelectedIndex,
            setSelectedIndex: setEditorSelectedIndex,
            selectedLabel: editorSelectedLabel,
        }
    }
    
   return (
      <ctx.Provider value={state}>
        {children}
      </ctx.Provider>
    );
  };

export const useApp = () => React.useContext(ctx);
