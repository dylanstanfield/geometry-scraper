import React from 'react';
import { Container, Grid, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import { useQuery } from 'react-query';

import { Editor, FileBrowser } from '../components';
import { useOCR, useApp } from '../hooks';
import { getScreenshots } from '../data';
import { DirectoryTree } from 'directory-tree';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
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
  },
  inputContainer: {
    paddingTop: theme.spacing(3),
  }
}));

export async function getStaticProps() {
  const { screenshots } = await getScreenshots()
  return { props: { screenshots } }
}

const Home: React.FC<{ screenshots: DirectoryTree }> = ({ screenshots }) => {
  const styles = useStyles();
  const { data } = useQuery([screenshots], getScreenshots, { initialData: { screenshots }})
  const { image } = useApp();
  const { progress, progressLabel } = useOCR();

  return (
    <Container maxWidth="md">
      <Grid container direction="column" className={styles.container}>
        <Grid item>
          <FileBrowser screenshots={data.screenshots} />
        </Grid>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <p>{ progressLabel ? progressLabel : 'Ready' } { progress > 0 ? `${progress}%` : '' }</p>
            </Grid>
            <Grid item>
              <p>{ image.url ? image.url : '...' }</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <LinearProgress value={progress} variant="determinate" />
        </Grid>
        <Grid item>
          <Editor />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
