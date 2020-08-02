import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { useHotkeys } from 'react-hotkeys-hook';

import { useApp } from '../hooks';

export const Controls: React.FC = () => {
    const { controls, image } = useApp();

    const decrementSelectedIndex = () => {
        if (controls.selectedIndex > 0) {
            controls.setSelectedIndex(controls.selectedIndex - 1)
        }
    }

    const incrementSelectedIndex = () => {
        if (controls.selectedIndex < image.matrix.length - 1) {
            controls.setSelectedIndex(controls.selectedIndex + 1)
        }
    }

    const toggle = () => {
        const isApproved = controls.approved.includes(controls.selectedLabel);
        let approved = [];

        if (isApproved) {
            approved = controls.approved.filter(str => str !== controls.selectedLabel);
        } else {
            approved = Array.from(new Set([ ...controls.approved, controls.selectedLabel ]));
        }
        
        controls.setApproved(approved);
    }

    useHotkeys('a', decrementSelectedIndex, {}, [controls.selectedIndex])
    useHotkeys('d', incrementSelectedIndex, {}, [controls.selectedIndex])
    useHotkeys('s', toggle, {}, [controls.approved, controls.selectedLabel])

    return (
        <React.Fragment>
            <Grid item md={2}>
                <TextField
                    id="standard-number"
                    label="FONT SIZE"
                    type="number"
                    fullWidth
                    defaultValue={controls.fontSize}
                    onChange={({ target }) => controls.setFontSize(target.value)}
                />
            </Grid>
            <Grid item md={2} />
            <Grid item md={1}>
                <Button disabled={controls.selectedIndex <= 0}
                    variant={'outlined'}
                    fullWidth
                    onClick={() => decrementSelectedIndex()}>
                    { '<' }
                </Button>
            </Grid>
            <Grid item md={2} style={{ textAlign: 'center' }}>
                { controls.selectedLabel }
            </Grid>
            <Grid item md={1}>
                <Button disabled={controls.selectedIndex >= image.matrix.length - 1}
                    variant={'outlined'}
                    fullWidth
                    onClick={() => incrementSelectedIndex()}>
                    { '>' }
                </Button>
            </Grid>
            <Grid item md={2} />
            <Grid item md={2}>
                <Button variant={'outlined'}
                    color={'primary'}
                    fullWidth
                    onClick={toggle}>
                    Toggle { controls.selectedLabel }
                </Button>
            </Grid>
        </React.Fragment>
    )
}