import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, makeStyles, Theme, Slider } from '@material-ui/core';


const testGeometry = [
    {
        "size": "42cm",
        "Reach": "378.7",
        "Stack": "528.0",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "91.0",
        "Seat Tube Length": "420.0",
        "BB Drop": "66.0",
        "Wheelbase": "989.8",
        "Chainstay Length": "420.0",
        "Top Tube Length Actual": "505.0",
        "Top Tube Length Effective": "522.0",
        "Seat Tube Angle": "75.0",
        "Standover Height": "747.9",
        "Stem Length": "70",
        "Stem Angle": "12",
        "Handlebar Width": "400",
        "Crank Length": "170",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "46cm",
        "Reach": "380.8",
        "Stack": "528.0",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "91.0",
        "Seat Tube Length": "460.0",
        "BB Drop": "66.0",
        "Wheelbase": "991.9",
        "Chainstay Length": "420.0",
        "Top Tube Length Actual": "515.0",
        "Top Tube Length Effective": "528.8",
        "Seat Tube Angle": "74.5",
        "Standover Height": "766.7",
        "Stem Length": "80",
        "Stem Angle": "7",
        "Handlebar Width": "400",
        "Crank Length": "170",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "50cm",
        "Reach": "389.1",
        "Stack": "528.0",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "91.0",
        "Seat Tube Length": "500.0",
        "BB Drop": "66.0",
        "Wheelbase": "1005.2",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "535.1",
        "Top Tube Length Effective": "541.8",
        "Seat Tube Angle": "74.0",
        "Standover Height": "784.4",
        "Stem Length": "80",
        "Stem Angle": "5",
        "Handlebar Width": "400",
        "Crank Length": "170",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "52cm",
        "Reach": "389.7",
        "Stack": "528.0",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "91.0",
        "Seat Tube Length": "520.0",
        "BB Drop": "66.0",
        "Wheelbase": "1005.9",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "545.1",
        "Top Tube Length Effective": "547.1",
        "Seat Tube Angle": "73.0",
        "Standover Height": "794.4",
        "Stem Length": "100",
        "Stem Angle": "5",
        "Handlebar Width": "420",
        "Crank Length": "170",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "S54cm",
        "Reach": "394.8",
        "Stack": "538.4",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "102.0",
        "Seat Tube Length": "540.0",
        "BB Drop": "66.0",
        "Wheelbase": "1014.3",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "559.9",
        "Top Tube Length Effective": "560.0",
        "Seat Tube Angle": "2558",
        "Standover Height": "809",
        "Stem Length": "100",
        "Stem Angle": "7",
        "Handlebar Width": "420",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "56cm",
        "Reach": "394.3",
        "Stack": "556.5",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "121.0",
        "Seat Tube Length": "560.0",
        "BB Drop": "66.0",
        "Wheelbase": "1019.7",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "569.9",
        "Top Tube Length Effective": "570.0",
        "Seat Tube Angle": "72.0",
        "Standover Height": "826.7",
        "Stem Length": "100",
        "Stem Angle": "7",
        "Handlebar Width": "440",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "58cm",
        "Reach": "398.3",
        "Stack": "575.7",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "141.0",
        "Seat Tube Length": "580.0",
        "BB Drop": "66.0",
        "Wheelbase": "1029.9",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "579.8",
        "Top Tube Length Effective": "580.0",
        "Seat Tube Angle": "72.0",
        "Standover Height": "845.9",
        "Stem Length": "120",
        "Stem Angle": "5",
        "Handlebar Width": "440",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "60cm",
        "Reach": "407.3",
        "Stack": "593.6",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "160.0",
        "Seat Tube Length": "600.0",
        "BB Drop": "66.0",
        "Wheelbase": "1044.7",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "599.8",
        "Top Tube Length Effective": "600.0",
        "Seat Tube Angle": "72.0",
        "Standover Height": "863.4",
        "Stem Length": "120",
        "Stem Angle": "7",
        "Handlebar Width": "460",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "62cm",
        "Reach": "411.0",
        "Stack": "612.7",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "180.0",
        "Seat Tube Length": "620.0",
        "BB Drop": "66.0",
        "Wheelbase": "1054.7",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "609.9",
        "Top Tube Length Effective": "610.0",
        "Standover Height": "882.2",
        "Stem Length": "120",
        "Stem Angle": "7",
        "Handlebar Width": "460",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    },
    {
        "size": "64cm",
        "Reach": "424.5",
        "Stack": "630.9",
        "Head Tube Angle": "72.0",
        "Head Tube Length": "200.0",
        "Seat Tube Length": "665.0",
        "BB Drop": "66.0",
        "Wheelbase": "1074.6",
        "Chainstay Length": "425.0",
        "Top Tube Length Actual": "630.0",
        "Top Tube Length Effective": "630.0",
        "Standover Height": "901.8",
        "Stem Length": "120",
        "Stem Angle": "5",
        "Handlebar Width": "460",
        "Crank Length": "175",
        "Fork Length": "400.0",
        "Fork Rake": "44.0"
    }
];


interface EditorProps {
    url: Tesseract.ImageLike | null;
    geometry: Record<string, any>[] | null;
}

interface StylesProps {
    fontSize: string,
    overlayOffset: number,
    overlayNumChars: number,
}

const useStyles = makeStyles<Theme, StylesProps>((theme: Theme) => ({
    container: {
        position: 'relative',
    },
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
    overlay: {
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.6)',
        border: `1px solid ${theme.palette.primary.main}`,
        position: 'absolute',
        top: 0,
        minWidth: '10px',
        left: (props) => `${props.overlayOffset}%`,
        height: 'calc(100% - 8px)',
        backdropFilter: 'blur(3px)',
        overflow: 'hiden',
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
}));

const getMatrix = (geometry: Record<string, any>[]) => {
    const keys = Object.keys(geometry[0]);
    const values = geometry.map(row => Object.values(row));

    return [ keys, ...values ];
}

export const Editor: React.FC<EditorProps> = ({ url, geometry }) => {
    const [fontSize, setFontSize] = useState('11');
    const [overlayOffset, setOverlayOffset] = useState(0);
    const [maxtrixIndex, setMatrixIndex] = useState(0);
    const [matrix, setMatrix] = useState(getMatrix(geometry || [[]]));

    useEffect(() => {
        if (geometry) {
            setMatrix(getMatrix(geometry))
        }
    }, [geometry])

    const overlayNumChars = matrix[maxtrixIndex].reduce((len, str) => str.length > len ? str.length : len, 0);
    const styles = useStyles({ fontSize, overlayOffset, overlayNumChars });

    const updateMatrix = (i1: number, i2: number, newValue: string) => {
        const newMatrix = [ ...matrix ];
        newMatrix[i1][i2] = newValue;
        console.log(newMatrix);
        setMatrix(newMatrix);
    }
    
    if (!url) {
        return <div className={styles.placeholderImage}>Enter Image URL</div>
    }
    
    const selectedLabel = maxtrixIndex === 0 ? 'KEYS' : matrix[maxtrixIndex][0];

    return (
        <div>
            <div className={styles.container}>
                <img alt="being scraped" src={url.toString()} className={styles.image} />
                <div className={styles.overlay}>
                    {
                        matrix[maxtrixIndex].map(
                            (str, i) => (
                                <input type="text"
                                    value={str}
                                    onChange={(e) => updateMatrix(maxtrixIndex, i, e.target.value)}
                                    className={styles.overlayInput} />
                            )
                        )
                    }
                </div>
            </div>
            <Slider
                defaultValue={0}
                min={0}
                max={100}
                onChange={(_, value) => setOverlayOffset(value as number)}
            />

            <Grid container spacing={2} justify="center" alignItems="center">
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
                <Grid item md={1}>
                    <Button disabled={maxtrixIndex <= 0}
                        variant={'outlined'}
                        fullWidth
                        onClick={() => setMatrixIndex(maxtrixIndex - 1)}>
                        { '<' }
                    </Button>
                </Grid>
                <Grid item md={1} style={{ textAlign: 'center' }}>
                    { selectedLabel }
                </Grid>
                <Grid item md={1}>
                    <Button disabled={maxtrixIndex >= matrix.length - 1}
                        variant={'outlined'}
                        fullWidth
                        onClick={() => setMatrixIndex(maxtrixIndex + 1)}>
                        { '>' }
                    </Button>
                </Grid>
                <Grid item md={2}>
                    <Button variant={'outlined'}
                        color={'primary'}
                        fullWidth
                        onClick={() => {}}>
                        Save { selectedLabel }
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}