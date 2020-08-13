import React from 'react';
import { Grid, makeStyles, Theme, Slider } from '@material-ui/core';
import { useHotkeys } from 'react-hotkeys-hook';

import { useExtract, useTransform } from '../hooks';
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
        marginBottom: theme.spacing(10),
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
    const { matrix, setMatrix, url } = useExtract();
    const { fontSize, overlayOffset, setOverlayOffset, selectedIndex, selectedLabel, approved } = useTransform();
    
    const styles = useStyles({
        fontSize: fontSize,
        overlayOffset: overlayOffset,
        overlayNumChars: matrix[selectedIndex]?.reduce((len, str) => str.length > len ? str.length : len, 0) ?? 0,
        selectedLabel: selectedLabel,
        approvedLabels: approved,
    });

    useHotkeys('q', () => {
        if (overlayOffset > 1) {
            setOverlayOffset(overlayOffset - 2);
        }
    }, {}, [overlayOffset]);

    useHotkeys('e', () => {
        if (overlayOffset < 99) {
            setOverlayOffset(overlayOffset + 2);
        }
    }, {}, [overlayOffset]);

    const updateMatrix = (i1: number, i2: number, newValue: string) => {
        const newMatrix = [ ...matrix ];
        newMatrix[i1][i2] = newValue;
        setMatrix(newMatrix);
    }

    if (!url) {
        return <div className={styles.placeholder}>Enter Image URL</div>
    }
    
    return (
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="space-between" className={styles.sizesContainer}>{
                    matrix.length <= 1 ? <span>...</span> : matrix.map((row, i) => {
                        const label = i === 0 ? 'keys' : row[0];
                        const isApproved = approved.includes(label);

                        return (
                            <span key={label} style={{ color: isApproved ? colors.green : colors.red }}>{label}</span>
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
                    value={overlayOffset}
                    onChange={(_, value) => setOverlayOffset(value as number)}
                />
                <div className={styles.container}>
                    <img alt="being scraped" src={url.toString()} className={styles.image} />
                    { matrix.length > 1 && (
                        <div className={styles.overlay}>
                            {
                                matrix[selectedIndex].map(
                                    (str, i) => (
                                        <input type="text"
                                            key={i}
                                            disabled={ approved.includes(selectedLabel) }
                                            value={str}
                                            onChange={(e) => updateMatrix(selectedIndex, i, e.target.value)}
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