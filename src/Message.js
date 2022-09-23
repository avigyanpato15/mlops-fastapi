import React, {useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Box, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    background: {
        background: '#00695c',
    },
    para:{
        color:'ffffff'
    },
    tabletitle:{
       paddingLeft: 20,
       paddingTop: 20,
       fontWeight: '600',
       fontSize: '18px',
    },
    tablecontainer:{
        maxWidth: '90vw',
        margin : 20,
        marginLeft: 55,
        marginRight: 55,
     },
     inputcontainer:{
        maxWidth: '95vw',
        margin : 10,
        marginLeft: 30,
        marginRight: 30
     },
     submitbutton:{
        background: '#00695c',
        color: '#ffffff',
        "&:hover, &:focus": {
            background: '#004d40',
          },
     },
  }));

export default function Message (){
const [result, setResult] = useState([]);
const [input, setInput] = useState(0);

const message =async () => {
    try{
    let res = await axios.get('http://127.0.0.1:8000');
    let result = res.data;
    console.log(result)
    setResult(result)
    }catch (e) {
        console.log(e);
    }
};
const createUser =async () => {
    try{
        console.log(input)
    await axios.post('http://127.0.0.1:8000/predict', input);
    await message()
    await setInput({variance: 0, skewness: 0,curtosis: 0,entropy: 0})
    console.log(input)
    }catch (e) {
        console.log(e);
    }
};
const deleteUser =async (id) => {
    try{
        console.log(id)
    await axios.delete(`http://127.0.0.1:8000/${id}`);
    await message()
    console.log(input)
    }catch (e) {
        console.log(e);
    }
};
useEffect (() => {
message ()
console.log(typeof(result))
},[])

const classes = useStyles();

return(
    <div>
        <AppBar position="static" className={classes.background}>
            <Toolbar >
                <Typography className={classes.title} >
                    Note Authenticity Predictor 💸
                </Typography>
          </Toolbar>
      </AppBar>
      <Box className={classes.inputcontainer}>
      <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
                <TextField   onChange={(e) => setInput ({ ...input, variance:parseFloat(e.target.value)}) } id='standard-basic' label='Variance'></TextField>
            </TableCell>
            <TableCell align="center">
                <TextField  onChange={(e) => setInput ({ ...input, skewness:parseFloat(e.target.value)}) } id='standard-basic' label='Skewness'></TextField>
            </TableCell>
            <TableCell align="center">
                <TextField  onChange={(e) => setInput ({ ...input, curtosis:parseFloat(e.target.value)}) } id='standard-basic' label='Curtosis'></TextField>
            </TableCell>
            <TableCell align="center">
                <TextField  onChange={(e) => setInput ({ ...input, entropy:parseFloat(e.target.value)}) } id='standard-basic' label='Entropy'></TextField>
            </TableCell>
            <TableCell align="center">
                <Button onClick={()=> createUser() } variant='contained' className={classes.submitbutton}>
                    Submit
                </Button>
              </TableCell>
          </TableRow>
        </TableHead>
        </Table>
        </TableContainer>
        </Box>

        <Box className={classes.tablecontainer}>
      <TableContainer component={Paper} >
        <Typography className={classes.tabletitle}>
            Results
        </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Variance</TableCell>
            <TableCell align="center">Skewness</TableCell>
            <TableCell align="center">Curtosis</TableCell>
            <TableCell align="center">Entropy</TableCell>
            <TableCell align='center'>Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <TableRow key={row.Id}>
              <TableCell align="center">{row.variance}</TableCell>
              <TableCell align="center">{row.skewness}</TableCell>
              <TableCell align="center">{row.curtosis}</TableCell>
              <TableCell align="center">{row.entropy}</TableCell>
              <TableCell align='center'>
                {row.prediction}
              </TableCell>
              <TableCell align="center">
                <Button onClick={()=> deleteUser(row.Id) } variant='contained' color='secondary'>
                    Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </div>
)
}