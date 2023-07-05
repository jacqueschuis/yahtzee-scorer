import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow, Paper } from "@mui/material";

const Game = ({playerList, isGameOver, setGameOver, setWinner}) => {
    return ( 
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Move</TableCell>
                        {playerList.map((player) => {
                            return(
                                <TableCell>{player}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
     );
}
 
export default Game;

// 1.9% on select new subarus see dealer for details
