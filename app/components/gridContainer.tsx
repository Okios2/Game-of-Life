'use client'
import {ChangeEvent, SetStateAction, useRef, useState} from "react";
import {Drawer, IconButton} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RedoIcon from '@mui/icons-material/Redo';

import ActionButton from "./actionbutton";
import GameBoard from "../components/grid";
import styles from "../page.module.css";
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
    const reset = () => patterns[patternIndex].reset();
    
    const handleEnterPressed = (e: React.KeyboardEvent) => {
        if(e.key === "Enter" && !isRunning){
            const active = document.activeElement as HTMLElement;
            const excludedTags = ["BUTTON", "INPUT", "SELECT"];
            if (excludedTags.includes(active.tagName)) {return;}
            patterns[patternIndex].reset();
            setPatternIndex((patternIndex+1)%patterns.length);
        }
    };

    const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: SetStateAction<number>) => void) => {
        const {min, max, value} = e.target;
        setter(Math.min(Number(max), Math.max(Number(min), Number(value))));
    }

    const handlePatternClick = (index: number) => {
        setPatternIndex(index);
        patterns[index].reset();
    };

    return (
        <div className={styles.center} onKeyDown={handleEnterPressed} tabIndex={0}>
            <div className={styles.buttonscontainer}>   
                <IconButton color="inherit" onClick={reset} disabled={isRunning}><RedoIcon/></IconButton>
                <IconButton color="inherit" onClick={setNextGeneration} disabled={isRunning}><SkipNextIcon/></IconButton>
                <IconButton color="inherit" onClick={handleSimulation}>
                    {isRunning ? <PauseIcon/> : <PlayArrowIcon/>}
                </IconButton>
                <div className={styles.iconbutton}>
                    <IconButton color="inherit" onClick={toggleDrawer}>
                        <SettingsIcon></SettingsIcon>
                    </IconButton>
                </div>
                <Drawer anchor='right' open={isOpen} onClose={toggleDrawer} classes={{paper: styles.drawer}}>
                    <label htmlFor="rowsInput" >Number of rows:</label>
                        <input
                            id="rowsInput"
                            name="rowsInput"
                            type="number"
                            value={rows}
                            onChange={(e) => handleGridSizeChange(e, setRows)}
                            min={1}
                            max={50}
                            disabled={isRunning}
                        />
                        <label htmlFor="colsInput" >Number of colums:</label>
                        <input
                            id="colsInput"
                            name="colsInput"
                            type="number"
                            value={cols}
                            onChange={(e) => handleGridSizeChange(e, setCols)}
                            min={1}   
                            max={50}
                            disabled={isRunning}                    
                        />
                        <label>Example Patterns</label>
                        {patterns.map((pattern, index) => (
                            <ActionButton
                                key={pattern.name}
                                onClick={handlePatternClick}
                                name={pattern.name}
                                disabled={isRunning}
                                index={index}
                            />
                        ))}
                        <input 
                            type="range"
                            id="speed-animation"
                            name="speed-animation"
                            value={fps}
                            onChange={(e) => {setFps(Number(e.target.value))}}
                            min={1}
                            max={60}
                        />
                    <label htmlFor="speed-animation">Animation Speed</label>
                </Drawer>
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard key={`${rows}x${cols}`} isRunning={isRunning} rows={rows} cols={cols} ref={gridRef} fps={fps}/>
            </div>
        </div>
    )
}

export default GridContainer;
