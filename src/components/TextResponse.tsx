import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function TextResponse(props: any) {
	return (
		<Typography
			fontSize={20}
			style={{
				color: '#fff',
				textShadow: `0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 5px ${props.isEvenResColor}, 0 0 22px ${props.isEvenResColor}, 0 0 27px ${props.isEvenResColor}, 0 0 35px ${props.isEvenResColor}, 0 0 40px ${props.isEvenResColor}`,
			}}
		>
			{props.isEvenResponse}
		</Typography>
	);
}
