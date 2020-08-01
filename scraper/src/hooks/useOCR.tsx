import { useState } from 'react';
import { useAsync } from 'react-use';
import { createWorker } from 'tesseract.js';

interface WorkerLog {
    jobId: string
    progress: number
    status: string
    workerId: string
}

export const useOCR = () => {
    const [ progress, setProgress ] = useState(0);
    const [ progressLabel, setProgressLabel ] = useState<string | null>(null);
    const [ text, setText ] = useState<string | null>(null);
    const [ url, setUrl ] = useState<Tesseract.ImageLike | null>(null);

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

            console.log(text);
    
            setText(text);
        }
    }, [ url ]);

    return {
        progress,
        progressLabel,
        text,
        setUrl,
        url
    };
}