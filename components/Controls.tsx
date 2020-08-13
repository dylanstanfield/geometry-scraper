import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { useHotkeys } from 'react-hotkeys-hook';

import { useTransform, useExtract } from '../hooks';

export const Controls: React.FC = () => {
    const { matrix } = useExtract();
    const { selectedIndex, setSelectedIndex, approved, setApproved, selectedLabel, fontSize, setFontSize } = useTransform();

    const decrementSelectedIndex = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1)
        }
    }

    const incrementSelectedIndex = () => {
        if (selectedIndex < matrix.length - 1) {
            setSelectedIndex(selectedIndex + 1)
        }
    }

    const toggle = () => {
        const isApproved = approved.includes(selectedLabel);
        let newApproved = [];

        if (isApproved) {
            newApproved = approved.filter(str => str !== selectedLabel);
        } else {
            newApproved = Array.from(new Set([ ...approved, selectedLabel ]));
        }
        
        setApproved(newApproved);
    }

    useHotkeys('a', decrementSelectedIndex, {}, [selectedIndex])
    useHotkeys('d', incrementSelectedIndex, {}, [selectedIndex])
    useHotkeys('s', toggle, {}, [approved, selectedLabel])

    return (
        <React.Fragment>
            <Grid item md={2}>
                <TextField
                    id="standard-number"
                    label="FONT SIZE"
                    type="number"
                    fullWidth
                    defaultValue={fontSize}
                    onChange={({ target }) => setFontSize(target.value)}
                />
            </Grid>
            <Grid item md={2} />
            <Grid item md={1}>
                <Button disabled={selectedIndex <= 0}
                    variant={'outlined'}
                    fullWidth
                    onClick={() => decrementSelectedIndex()}>
                    { '<' }
                </Button>
            </Grid>
            <Grid item md={2} style={{ textAlign: 'center' }}>
                { matrix.length <= 1 ? '...' : selectedLabel }
            </Grid>
            <Grid item md={1}>
                <Button disabled={selectedIndex >= matrix.length - 1}
                    variant={'outlined'}
                    fullWidth
                    onClick={() => incrementSelectedIndex()}>
                    { '>' }
                </Button>
            </Grid>
            <Grid item md={2} />
            <Grid item md={2}>
                <Button variant={'outlined'}
                    disabled={matrix.length <= 1}
                    color={'primary'}
                    fullWidth
                    onClick={toggle}>
                    Set { matrix.length <= 1 ? '...' : selectedLabel }
                </Button>
            </Grid>
        </React.Fragment>
    )
}