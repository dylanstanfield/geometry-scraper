import { measurementTerms } from '../data';

const isNumeric = (str: string) => {
    return !isNaN(+str);
}

const isData = (str: string) => {
    const allowlist = ['700c', '650b'];

    return isNumeric(str) || allowlist.includes(str.toLowerCase());
}

const isMeasurement = (str: string) => {
    return measurementTerms.includes(str.toLowerCase());
}

export const parse = (text: string | null): Record<string, any>[] | null => {
    if (!text) {
        return null;
    }

    const [ sizeRow, ...rows ] = text.split('\n');

    const sizes = sizeRow.split(' ').map((str) => str.trim()).filter(str => !!str);
    const measurements: string[] = [];
    const matrix: string[][] = []

    rows.forEach((row) => {
        const strings = row
            .split(' ')
            .map(str => str.replace(/[^0-9a-z.]/gi, ''))
            .filter(str => !!str);

        let measurementsParts: string[] = [];
        let data: string[] = [];

        strings.forEach((str) => {
            if(isData(str)) {
                data.push(str);
            } else if (isMeasurement(str)) {
                measurementsParts.push(str);
            } else {
                console.warn(`skipping string: "${str}"`)
            }
        });

        measurements.push(measurementsParts.join(' '));
        matrix.push(data);
    });

    const geos: Record<string, any>[] = [];
  
    sizes.forEach((size, sizeIndex) => {
        const geo: Record<string, any> = { size };
        
        measurements.filter(str => !!str).forEach((measurement, measurementIndex) => {
            geo[measurement] = matrix[measurementIndex][sizeIndex] || 'n/a';
        })

        geos.push(geo);
    });

    return geos;
}