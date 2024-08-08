'use client'
import {ChangeEvent, SetStateAction, useRef, useState} from "react";
import {Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Slider, TextField, InputLabel} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';

import GameBoard from "../components/grid";
import styles from "./gridContainer.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rows, setRows] = useState(50);
    const [cols, setCols] = useState(50);
    const [fps, setFps] = useState(30);
    const [patternIndex, setPatternIndex] = useState(0);
    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void, nextGrid: () => void}>();
    const resetToQeenBeeGrid = () => gridRef.current?.setPattern(queenBeePattern);
    const resetToRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const resetToTumblerGrid = () => gridRef.current?.setPattern(tumblerPattern);
    const resetToBlank = () => gridRef.current?.setPattern([[]]);
    const setNextGeneration = () => gridRef.current?.nextGrid();
    const handleSimulation = () => setIsRunning(!isRunning);
    const toggleDrawer = () => setIsOpen(!isOpen);
    const patterns = [
        {reset: resetToBlank, name: "Clear Board"},
        {reset: resetToQeenBeeGrid, name: "Queen Bee Pattern"},
        {reset: resetToTumblerGrid, name: "Tumbler Pattern"},
        {reset: resetToRandomGrid, name: "Random Pattern"}
    ];
    const reset = patterns[patternIndex].reset;
    
    const handleKeyPressed = (e: React.KeyboardEvent) => ["Enter", " ", "Escape"].includes(e.key) && (() =>{
        e.preventDefault();
        if(e.key === " "){
            handleSimulation();
        } else if(e.key === "Escape"){
            reset();
            setIsRunning(false);
        } else if (!isRunning){
            setNextGeneration();
        }
    })();

    const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: SetStateAction<number>) => void) => {
        const {min, max, value} = e.target;
        setter(Math.min(Number(max), Math.max(Number(min), Number(value))));
    }

    const handlePatternChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPatternIndex(Number(e.target.value));
    };

    const handleFpsChange = (e: Event, fps: number | number[]) => {
        setFps(fps as number);
    };

    return (
        <div className={styles.center} onKeyDown={handleKeyPressed} tabIndex={0}>
            <div className={styles.buttonscontainer}>
                <div></div>
                <div>
                    <IconButton color="inherit" onClick={reset} disabled={isRunning}><StopIcon/></IconButton>
                    <IconButton color="inherit" onClick={setNextGeneration} disabled={isRunning}><SkipNextIcon/></IconButton>
                    <IconButton color="inherit" onClick={handleSimulation}>
                        {isRunning ? <PauseIcon/> : <PlayArrowIcon/>}
                    </IconButton>
                </div>
                <div>
                    <IconButton color="inherit" onClick={toggleDrawer}>
                        <SettingsIcon></SettingsIcon>
                    </IconButton>
                </div>
                <Drawer anchor='right' open={isOpen} onClose={() => setIsOpen(false)} classes={{paper: styles.drawer}}>
                    <TextField
                        id="rowsInput"
                        name="rowsInput"
                        label="Number of rows"
                        type="number"
                        value={rows}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleGridSizeChange(e, setRows)}
                        inputProps={{
                            min: Math.max(tumblerPattern.length, queenBeePattern.length),
                            max: 110,
                        }}
                        disabled={isRunning}
                        fullWidth
                        margin="normal"
                        sx={{ 
                            '& .MuiInputBase-input': { color: 'white' }, 
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiFormLabel-root': { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                            },
                        }}
                    />
                     <TextField
                        id="colsInput"
                        name="colsInput"
                        label="Number of cols"
                        type="number"
                        value={cols}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleGridSizeChange(e, setCols)}
                        inputProps={{
                            min: Math.max(tumblerPattern[0].length, queenBeePattern[0].length),
                            max: 110,
                        }}
                        disabled={isRunning}
                        fullWidth
                        margin="normal"
                        sx={{ 
                            '& .MuiInputBase-input': { color: 'white' }, 
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiFormLabel-root': { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                            },
                        }}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={styles.radiolabel}>Starting Pattern</FormLabel>
                        <RadioGroup
                            name="patterns"
                            value={patternIndex}
                            onChange={handlePatternChange}
                        >
                            {patterns.map((pattern, index) => (
                                <FormControlLabel
                                    key={pattern.name}
                                    value={index}
                                    control={<Radio />}
                                    label={pattern.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Slider
                        value={fps}
                        onChange={handleFpsChange}
                        min={1}
                        max={60}
                        aria-label="speed-animation"
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value} fps`}
                    >
                    </Slider>
                    <InputLabel htmlFor="speed-animation" className={styles.radiolabel}>Animation Speed</InputLabel>
                </Drawer>
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard key={`${rows}x${cols}`} isRunning={isRunning} rows={rows} cols={cols} ref={gridRef} fps={fps}/>
            </div>
        </div>
    )
}

export default GridContainer;