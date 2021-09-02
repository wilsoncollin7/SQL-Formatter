import * as React from 'react';
import { Box, Container, Grid, TextField, Paper, Button, makeStyles, Fab, Typography, Popover, Card, CardHeader, CardContent, CardMedia } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { format, getDownload } from '../utils';
import demoGif from '../static/images/demoGif.gif';

const today = new Date();

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 10
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  typography: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}))

const Form = () => {
  const classes = useStyles();
  const [outPut, setOutPut] = React.useState('');
  const [discontinueDate, setDiscontinueDate] = React.useState('2999-01-01');
  const [effectiveDate, setEffectiveDate] = React.useState(today.toISOString().split('T')[0]);
  const [data, setData] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDiscChange = (e) => {
    setDiscontinueDate(e.target.value);
  };

  const handleEffChange = (e) => {
    setEffectiveDate(e.target.value);
  };

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
    format(discontinueDate, effectiveDate, data).then(res => {
      setOutPut(res);
    });
  };

  const handleClear = () => {
    setData('');
    setOutPut('');
  };

  const handleDownload = () => {
    getDownload(effectiveDate, outPut);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mt={5}>
      <Container maxWidth='md'>
        <Grid container spacing={3} component={Paper}>
          <Grid item xs={6}>
            <TextField
              label='Discontinue Date'
              helperText='YYYY-MM-DD'
              variant='outlined'
              fullWidth
              onChange={handleDiscChange}
              value={discontinueDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Effective Date'
              helperText='YYYY-MM-DD'
              variant='outlined'
              fullWidth
              onChange={handleEffChange}
              value={effectiveDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Excel Data'
              helperText='Copy from Excel'
              variant='outlined'
              fullWidth
              multiline
              value={data}
              onChange={handleDataChange}
              rows={20}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign='center'>
              <Button
                color='secondary'
                variant='outlined'
                onClick={handleSubmit}
                disabled={data === ''}
              ><FormatAlignLeftIcon style={{ marginRight: 5 }} fontSize='small' /> Format</Button>
              <Button
                className={classes.button}
                color='secondary'
                variant='outlined'
                onClick={handleDownload}
                disabled={outPut === ''}
              ><ArrowDownwardOutlinedIcon style={{ marginRight: 5 }} fontSize='small' /> DownLoad</Button>
              <Button
                className={classes.button}
                color='secondary'
                variant='outlined'
                onClick={handleClear}
              ><ClearOutlinedIcon style={{ marginRight: 5 }} fontSize='small' /> Clear</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {outPut !== ''
              && <TextField
                variant='outlined'
                fullWidth
                multiline
                rows={30}
                value={outPut}
                inputProps={{
                  'readOnly': true
                }}
              />}
          </Grid>
        </Grid>
      </Container>
      <Box className={classes.helpButton}>
        <Fab color='primary' onClick={handleClick}>
          <HelpOutlineIcon />
        </Fab>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Card className={classes.card}>
            <CardHeader
              title='How To Use'
            />
            <CardMedia
              className={classes.media}
              image={demoGif}
            />
            <CardContent>
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
              >First copy the data from the Excel spreadsheet. Make sure NOT to copy the headers. Include the group type name in the first column. Then paste into the Excel Data textbox!</Typography>
            </CardContent>
          </Card>
        </Popover>
      </Box>
    </Box>
  );
};

export default Form;
