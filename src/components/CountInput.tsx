import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CountInput(props: any) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '20vh',
			}}
		>
			<TextField
				autoFocus
				autoComplete="off"
				style={{ width: '50vw' }}
				id="outlined-input"
				variant="outlined"
				placeholder="Enter a value for count"
				onChange={(e) => props.setInputValue(e.target.value)}
				onKeyDown={props.handleEnterKeyPressOnInput}
				error={props.inputValueError}
				helperText={props.inputValueError ? 'Please enter a numeric value' : ''}
			/>
			<Button
				disableElevation
				color="primary"
				variant="contained"
				sx={{ marginLeft: 2 }}
				size="large"
				onClick={() => props.handleSubmitInput()}
			>
				Submit
			</Button>
		</div>
	);
}
