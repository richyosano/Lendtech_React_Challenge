import * as React from 'react';
import Button from '@mui/material/Button';

export default function Buttons(props: any) {
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				size="large"
				disableElevation
				onClick={props.multiplyCount}
				style={{ margin: 16 }}
				disabled={isNaN(Number(props.count))}
			>
				Multiply
			</Button>
			<Button
				variant="contained"
				color="warning"
				size="large"
				disableElevation
				onClick={props.squareCount}
				style={{ margin: 16 }}
				disabled={isNaN(Number(props.count))}
			>
				Square
			</Button>
			<Button
				variant="contained"
				color="secondary"
				size="large"
				disableElevation
				onClick={props.getRandomCount}
				style={{ margin: 16 }}
				disabled={isNaN(Number(props.count))}
			>
				Random
			</Button>
		</div>
	);
}
