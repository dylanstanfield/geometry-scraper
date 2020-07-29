import React from 'react';
import { useMount } from 'react-use';

import { useOCR } from './useOCR';

function App() {
  const { progress, text, url, setUrl } = useOCR();

  useMount(() => {
    setUrl('/images/giant.png');
  });

  const [ sizes, ...rows ] = text.split('\n');
  const labels: string[] = [];
  const matrix: number[][] = []

  rows.forEach((row) => {
    const strings = row
      .split(' ')
      .map(str => str.replace(/[^0-9a-z.]/gi, ''))
      .filter(str => !!str);

    let labelParts: string[] = [];
    let data: number[] = [];

    strings.forEach((str) => {
      if(isNaN(+str)) {
        if (str.length > 3) {
          labelParts.push(str);
        }
      } else {
        data.push(parseFloat(str));
      }
    })

    const label = labelParts.join(' ');

    labels.push(label);
    matrix.push(data);
  });

  const geometry: Record<string, any> = {}

  sizes.split(' ').forEach((size, sizeIndex) => {
    geometry[size] = {};
    labels.forEach((label, labelIndex) => {
      geometry[size][label] = matrix[labelIndex][sizeIndex];
    })
  })

  return (
    <div>
      <img src={url?.toString()} />
      <div>progress: { progress }%</div>
      <pre>{ JSON.stringify(geometry, null, 4) }</pre>
    </div>
  );
}

export default App;
