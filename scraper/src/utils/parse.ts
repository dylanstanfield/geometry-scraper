import Fuse from 'fuse.js';

import { measurementTerms } from '../data';

const fuse = new Fuse(measurementTerms, {
    includeScore: true,
    threshold: 0.2, // 20%
});

const isNumeric = (str: string) => {
    return !isNaN(+str);
}

const isData = (str: string) => {
    const allowlist = ['700c', '650b'];

    return isNumeric(str) || allowlist.includes(str.toLowerCase());
}

const getMeasurement = (str: string) => {
    const results = fuse.search(str);
    return results.length ? results[0]?.item : null;
}

export const parse = (text: string | null): string[][] | null => {
    if (!text) {
        return null;
    }

    const [ sizeRawRow, ...rawRows ] = text.split('\n');

    const sizes = sizeRawRow.split(' ').map((str) => str.trim()).filter(str => !!str);
    const rows: string[][] = []

    rawRows.forEach((row) => {
        const strings = row
            .split(' ')
            .map(str => str.replace(/[^0-9a-z.]/gi, ''))
            .filter(str => !!str);

        let measurementsParts: string[] = [];
        let data: string[] = [];

        if (!strings.some((str) => isData(str))) {
            console.debug(`Skipping (no data): ${strings.join(' ')}`)
            return;
        }

        strings.forEach((str) => {
            if(isData(str)) {
                data.push(str);
            } else {
                const measurement = getMeasurement(str);

                if (measurement) {
                    measurementsParts.push(measurement);
                } else {
                    console.debug(`Skipping (not measurement): "${str}"`)
                }
            }
        });

        rows.push([ measurementsParts.join(' '), ...data ]);
    });

    // change rows to columns
    return [
        [ ...rows.map(row => row[0]) ],
        ...sizes.map((size, i) => {
            return [ size, ...rows.map(row => row[i + 1])]
        }),
    ];
}