import { Button, Card, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useLocation } from 'react-router';
import { noteCreation } from './notesReducer';

const NoteMaker = (props) => {
  const [noteName, setNoteName] = useState()
  const [notes, setNotes] = useState(localStorage.getItem('text'))  
  useEffect(()=>{

  },[notes])

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: '90vh' }}
    >
      <Grid item xs={5}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'center', direction: 'column', alignItems: 'center', marginLeft: '7%', marginRight: '7%', marginTop: '7%' }}>
            <Typography variant="h6" component="h2" >
              Give your note a name:
            </Typography>
            <TextField value={noteName}

              onChange={(e) => setNoteName(e.target.value)}
              style={{ alignItems: 'center', marginLeft: "2%" }}
              variant="outlined" />
          </div>
          <TextField value={notes} onChange={(e) => setNotes(e.target.value)} multiline
            rows={10} style={{ width: '85%', margin: '7%' }} variant="outlined" />
          <div style={{ display: 'flex', justifyContent: 'center', padding: "25px" }}>
            <Button variant="contained" color="primary" onClick={()=>{console.log(notes);var noteDetails = {notes,noteName};props.noteCreation(noteDetails)}}>
              Save It For Later
            </Button>
            <Button variant="contained" color="primary" style={{ marginLeft: "10%" }}>
              Download
            </Button>
          </div>
        </Card>

      </Grid>
    </Grid>

  );
}
const mapStateToProps = (state) => {
  console.log(state.text)
  return {
    text: state.text
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    noteCreation:(noteDetails)=>{dispatch(noteCreation(noteDetails))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteMaker);