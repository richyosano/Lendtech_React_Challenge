import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Counter(props: any) {
	return (
		<Typography
			fontSize={100}
			fontWeight={500}
			style={{
				width: '60%',
				color: '#fff',
				textShadow: `0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 5px ${props.textColor}, 0 0 22px ${props.textColor}, 0 0 27px ${props.textColor}, 0 0 35px ${props.textColor}, 0 0 40px ${props.textColor}`,
			}}
		>
			{isNaN(Number(props.count))
				? props.count
				: Number(props.count).toLocaleString(undefined, {
						maximumFractionDigits: 5,
				  })}
		</Typography>
	);
}
