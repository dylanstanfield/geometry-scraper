import React, { useState } from 'react';
import { Container, Grid, Box, TextField, Button, LinearProgress, makeStyles } from '@material-ui/core';

import { Editor } from './components';
import { useOCR, useApp } from './hooks';

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
  const { image } = useApp();
  const { progress, progressLabel } = useOCR();
  const [ input, setInput ] = useState<string | null>(null)

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      image.setUrl(input);
      (document.activeElement as HTMLElement).blur();
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={styles.container}>
        <Grid item>
          <Box paddingTop={3}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={10}>
                <TextField
                  className={styles.input}
                  label="IMAGE URL"
                  size="small"
                  placeholder={'/images/test.png'}
                  onKeyPress={onKeyPress}
                  variant="outlined"
                  onChange={(e) => setInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" color="primary" fullWidth onClick={() => image.setUrl(input)}>Scrape</Button>
              </Grid>
            </Grid>
          </Box>
          <Box paddingBottom={2}>
            <Grid container justify="space-between">
              <Grid item>
                <p>{ progressLabel ? progressLabel : 'Ready' } { progress > 0 ? `${progress}%` : '' }</p>
              </Grid>
              <Grid item>
                <p>{ image.url ? image.url : '...' }</p>
              </Grid>
            </Grid>
            <LinearProgress value={progress} variant="determinate" />
          </Box>
          <Box>
            <Editor />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
