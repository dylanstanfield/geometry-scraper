import { useState } from 'react';
import { useAsync } from 'react-use';
import { createWorker } from 'tesseract.js';
import { useApp } from '.';
import { parse } from '../utils';
import { useExtract } from './useExtract';

interface WorkerLog {
    jobId: string
    progress: number
    status: string
    workerId: string
}

export const useOCR = () => {
    const { url, setMatrix } = useExtract();
    const [ progress, setProgress ] = useState(0);
    const [ progressLabel, setProgressLabel ] = useState<string | null>(null);

    useAsync(async () => {
        if (url) {
            const worker = createWorker({
                logger: ((log: WorkerLog) => {
                    setProgressLabel(log.status);
                    setProgress(Math.round(log.progress * 100));
                }),
            });
    
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
    
            const { data: { text } } = await worker.recognize(url);

            console.debug(`Scraped text:\n`, text)
    
            setMatrix(parse(text) || []);
        }
    }, [ url ]);

    return {
        progress,
        progressLabel,
    };
}