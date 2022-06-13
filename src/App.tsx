import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Fraction from 'fraction.js';
import CountInput from './components/CountInput';
import CountTable from './components/CountTable';
import Grid from '@mui/material/Grid';
import Counter from './components/Counter';
import TextResponse from './components/TextResponse';
import Buttons from './components/Buttons';

const baseUrl = 'https://cors-anywhere.herokuapp.com/';
const rainbowColors = [
    '#f00',
    '#ff8f34',
    '#e0e722',
    '#0f0',
    '#5271ff',
    '#6a0dad',
    '#8d38c9',
];

function App() {
    const [count, setCount] = useState<string | number>(2);
    const [countHistory, setCountHistory] = useState<string[] | number[]>([]);
    const [isEvenResponse, setIsEvenResponse] = useState<string>('');
    const [isEvenResColor, setIsEvenResColor] = useState<string>('#f00');
    const [openDataSet, setOpenDataSet] = useState<string[] | number[]>([]);
    const [inputValue, setInputValue] = useState<string | number>('');
    const [inputValueError, setInputValueError] = useState<boolean>(false)

    const isEvenNumber = async () => {
        const url = new URL(`api.isevenapi.xyz/api/iseven/${count}`, baseUrl);
        const res = await fetch(url);
        const isEvenRes = await res.text();
        setIsEvenResponse(isEvenRes);
    };

    useEffect(() => {
        getDataFromCSVFile();
    }, [])

    useEffect(() => {
        isEvenNumber();
        let array: any[] = countHistory;
        array.push(count);
        setCountHistory(array);
    }, [count]);

    const multiplyCount = () => {
        const newCount = Number(count) * 2;
        setCount(newCount);
    };

    const squareCount = () => {
        const newCount = Number(count) ** 2;

        setCount(newCount);
    };

    const getDataFromCSVFile = async () => {
        try {
            const target = 'cereal.csv';
            const res = await fetch(target, {
                method: 'GET',
                headers: {
                    'content-type': 'text/csv;charset=UTF-8',
                },
            });

            if (res.ok) {
                const data = await res.text();
                const dataArray = data.replace(/\n/g, ',').split(',');
                return setOpenDataSet(dataArray);
            } else {
                console.log(`Error code: ${res.status}`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getRandomCount = async () => {
        if (openDataSet.length > 0) {
            const randomIndex = Math.floor(Math.random() * openDataSet.length);
            const newCount = openDataSet[randomIndex];
            setCount(newCount);
        }
        else return;
    };

    const isRationalNumber = () => {
        const countFraction = new Fraction(count);
        const decimalValue = countFraction.n / countFraction.d;

        if (Number(count) === decimalValue) {
            return true;
        } else {
            return false;
        }
    };

    const getTextColor = () => {
        if (isNaN(Number(count))) {
            return '#f00';
        }
        else if (Number(count) % 1 === 0) {
            return '#0f0';
        }
        else if (isRationalNumber() === true) {
            return '#bc13fe';
        }
        else {
            return '#5271ff';
        }
    };

    const handleSubmitInput = () => {
        if (isNaN(Number(inputValue))) {
            setInputValueError(true);
        }
        else {
            setInputValueError(false);
            setCount(Number(inputValue));
        }
    }

    const handleEnterKeyPressOnInput = (e: any) => {
        if (e.keyCode === 13) {
            handleSubmitInput();
        }
    }

    useEffect(() => {
        let colors: string[] = rainbowColors;
        let rotationInterval = setInterval(() => {
            setIsEvenResColor((prevColor) => {
                const indexOfCurrentColor = colors.indexOf(prevColor);
                if (indexOfCurrentColor === colors.length - 1) {
                    colors = [...colors, ...rainbowColors];
                }
                return colors[indexOfCurrentColor + 1];
            });
        }, 1000);

        if (isEvenResponse.length === 0) {
            return () => {
                clearInterval(rotationInterval);
            };
        }
    }, []);

    const textColor = getTextColor();

    return (
        <div
            className="container"
            style={{ textAlign: 'center' }}
        >
            <Paper
                variant="outlined"
                style={{
                    display: 'grid',
                    alignContent: 'space-evenly',
                    height: '70vh',
                    background: 'black',
                }}
            >
                <Grid container>
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                        <Counter count={count} textColor={textColor} />
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                        <CountTable countHistory={countHistory} />
                    </Grid>
                </Grid>
                <TextResponse isEvenResColor={isEvenResColor} isEvenResponse={isEvenResponse} />
            </Paper>
            <div style={{ marginTop: 50 }}>
                {isNaN(Number(count)) ?
                    <CountInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputValueError={inputValueError}
                        handleEnterKeyPressOnInput={handleEnterKeyPressOnInput}
                        handleSubmitInput={handleSubmitInput} 
                    />
                    :
                    <Buttons
                        count={count}
                        multiplyCount={multiplyCount}
                        squareCount={squareCount}
                        getRandomCount={getRandomCount} 
                    />
                }
            </div>
        </div>
    );
}

export default App;
