import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CountTable(props: any) {
	const [page, setPage] = useState(0);
	const pageSize: number = 5;

	const paginate = (array: any[], pageNumber: number) => {
		const silcedArray = array.slice(
			pageNumber * pageSize,
			(pageNumber + 1) * pageSize
		);
		return silcedArray;
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const paginatedCountHistory = paginate(props.countHistory, page);

	return (
		<Paper
			sx={{
				mb: 2,
				background: '#98b3d133',
				borderColor: 'white',
				width: '50%',
			}}
			variant="outlined"
		>
			<TableContainer>
				<Table
					style={{ color: 'white' }}
					aria-labelledby="tableTitle"
					size={'small'}
				>
					<TableHead>
						<TableRow style={{ color: 'white' }}>
							<TableCell
								style={{ color: 'white' }}
								key={'count'}
								align={'center'}
								padding={'normal'}
							>
								Count
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedCountHistory.map((x: number | string, i: number) => {
							return (
								<TableRow tabIndex={-1} key={i}>
									<TableCell style={{ color: 'white' }} align="center">
										{x}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={props.countHistory.length}
				rowsPerPage={pageSize}
				rowsPerPageOptions={[]}
				page={page}
				onPageChange={handleChangePage}
				sx={{ color: 'white' }}
			/>
		</Paper>
	);
}
