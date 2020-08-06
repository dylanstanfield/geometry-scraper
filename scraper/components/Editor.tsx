import React from 'react';
import { Grid, makeStyles, Theme, Slider } from '@material-ui/core';
import { useHotkeys } from 'react-hotkeys-hook';

import { useApp } from '../hooks';
import { Controls } from '.';

const colors = {
    green: '#00e676',
    red: '#ef9a9a',
}

interface StylesProps {
    fontSize: string,
    overlayOffset: number,
    overlayNumChars: number,
    selectedLabel: string,
    approvedLabels: string[],
}

const useStyles = makeStyles<Theme, StylesProps>((theme: Theme) => ({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
    },
    placeholder: {
        minWidth: '100%',
        border: `2px solid ${colors.red}`,
        height: '400px',
        lineHeight: '400px',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: theme.spacing(3),
    },
    overlay: {
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.6)',
        border: ({ approvedLabels, selectedLabel }) => `2px solid ${approvedLabels.includes(selectedLabel) ? colors.green : colors.red}`,
        position: 'absolute',
        top: 0,
        minWidth: '10px',
        left: (props) => `${props.overlayOffset}%`,
        height: 'calc(100% - 12px)',
        backdropFilter: 'blur(3px)',
        overflow: 'hidden',
    },
    overlayInput: {
        flex: 1,
        padding: theme.spacing(0.5, 2),
        fontSize: (props) => `${props.fontSize}px`,
        border: 'none',
        borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
        outline: 'none',
        width: ({ fontSize, overlayNumChars }) => `${(parseInt(fontSize, 10) - 4) * overlayNumChars}px`,
        background: 'transparent',
    },
    sizesContainer: {
        paddingTop: theme.spacing(2),
    }
}));

export const Editor: React.FC = () => {
    const { controls, image } = useApp();
    
    const styles = useStyles({
        fontSize: controls.fontSize,
        overlayOffset: controls.overlayOffset,
        overlayNumChars: image.matrix[controls.selectedIndex]?.reduce((len, str) => str.length > len ? str.length : len, 0) ?? 0,
        selectedLabel: controls.selectedLabel,
        approvedLabels: controls.approved,
    });

    useHotkeys('q', () => {
        if (controls.overlayOffset > 1) {
            controls.setOverlayOffset(controls.overlayOffset - 2);
        }
    }, {}, [controls.overlayOffset]);

    useHotkeys('e', () => {
        if (controls.overlayOffset < 99) {
            controls.setOverlayOffset(controls.overlayOffset + 2);
        }
    }, {}, [controls.overlayOffset]);

    const updateMatrix = (i1: number, i2: number, newValue: string) => {
        const newMatrix = [ ...image.matrix ];
        newMatrix[i1][i2] = newValue;
        image.setMatrix(newMatrix);
    }

    if (!image.url) {
        return <div className={styles.placeholder}>Enter Image URL</div>
    }
    
    return (
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="space-between" className={styles.sizesContainer}>{
                    image.matrix.length <= 1 ? <span>...</span> : image.matrix.map((row, i) => {
                        const label = i === 0 ? 'keys' : row[0];
                        const approved = controls.approved.includes(label);

                        return (
                            <span key={label} style={{ color: approved ? colors.green : colors.red }}>{label}</span>
                        )
                    })
                }</Grid>
            </Grid>
            <Controls />
            <Grid item xs={12}>
                <Slider
                    defaultValue={0}
                    min={0}
                    max={100}
                    value={controls.overlayOffset}
                    onChange={(_, value) => controls.setOverlayOffset(value as number)}
                />
                <div className={styles.container}>
                    <img alt="being scraped" src={image.url.toString()} className={styles.image} />
                    { image.matrix.length > 1 && (
                        <div className={styles.overlay}>
                            {
                                image.matrix[controls.selectedIndex].map(
                                    (str, i) => (
                                        <input type="text"
                                            key={i}
                                            disabled={ controls.approved.includes(controls.selectedLabel) }
                                            value={str}
                                            onChange={(e) => updateMatrix(controls.selectedIndex, i, e.target.value)}
                                            className={styles.overlayInput} />
                                    )
                                )
                            }
                        </div>
                    ) }
                </div>
            </Grid>
        </Grid>
    )
}