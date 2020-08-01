import React, { useState } from 'react';
import { Container, Grid, Box, TextField, Button, LinearProgress, makeStyles } from '@material-ui/core';

import { Editor } from './components';
import { parse } from './parse';
import { useOCR } from './hooks/useOCR';

const useStyles = makeStyles({
  image: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  placeholderImage: {
    minWidth: '100%',
    background: 'rgba(0, 0, 0, 0.1)',
    height: '500px',
    textAlign: 'center',
    lineHeight: '500px',
    textTransform: 'uppercase',
  },
  container: {
    width: '100%',
  }
});

function App() {
  const styles = useStyles();
  const { progress, progressLabel, text, url, setUrl } = useOCR();
  const [ input, setInput ] = useState<string | null>(null)

  const geometry = parse(text);

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setUrl(input);
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={styles.container}>
        <Grid item>
          <Box paddingBottom={2} paddingTop={4}>
            <Grid container alignItems="center" spacing={ 2 }>
              <Grid item xs={12} md={10}>
                <TextField
                  className={styles.input}
                  label="IMAGE URL"
                  defaultValue={'/images/giant.png'}
                  onKeyPress={ onKeyPress }
                  variant="outlined"
                  onChange={(e) => setInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" color="primary" fullWidth size="large" onClick={() => setUrl(input)}>Scrape</Button>
              </Grid>
            </Grid>
          </Box>
          <Box paddingBottom={2}>
            <Grid container justify="space-between">
              <Grid item>
                <p>{ progressLabel ? progressLabel : 'Ready' } { progress > 0 ? `${progress}%` : '' }</p>
              </Grid>
              <Grid item>
                <p>{ url ? url : '...' }</p>
              </Grid>
            </Grid>
            <LinearProgress value={progress} variant="determinate" />
          </Box>
          <Box>
            <Editor url={url} geometry={geometry} />
            <pre>{ JSON.stringify(geometry, null, 4) }</pre>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
