import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, Grid, IconButton} from '@material-ui/core';
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js';
import { mdiRefresh } from '@mdi/js';
import { mdiFolderSearchOutline } from '@mdi/js';
import { getText } from './speechToTextReducer';
import {connect} from  'react-redux'

function CardUI(props) {
  const [file, setFile] = React.useState();
  const [src, setSrc] = React.useState(localStorage.getItem('src') ? localStorage.getItem('src') : null);
  const [base64,setBase64] = React.useState();
  console.log(file)
 
  function handleFileSelect(evt) {
    evt.target.files = null
    localStorage.removeItem('src')
    var f = evt.target.files[0];
    setFile(f)
    var reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        var binaryData = e.target.result;
        var base64String = window.btoa(binaryData);
        console.log(base64String)
        setBase64(base64String)
        setSrc(`data:audio/wav;base64,${base64String}`)
        localStorage.setItem('src', "data:audio/wav;base64," + base64String)
        console.log(src);
      };
    })(f);
    reader.readAsBinaryString(f);
  }




  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '90vh' }}
    >
      <Grid item xs={3}>
        <Card variant="outlined" raised key={src} style={{ minWidth: '60vh' }}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{ display: 'flex', justifyContent: 'center' }}>
              Upload The Audio File
            </Typography>
          </CardContent>
          
          <CardActions style={{ display: 'flex' }}>
            {file && props.purpose === "TRANSCRIPT A NEW AUDIO" ? <div style={{ marginLeft: "15px" }}>
              <p >File Name: {file.name}</p>
              <p >File Type: {file.type}</p>
              <div style={{ alignItems: "center" }}><audio controls><source src={src}></source></audio></div>
            </div> : null}

          </CardActions>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton variant="contained"
              component="label" >
              {props.purpose === "TRANSCRIPT A NEW AUDIO" ? <div><input
                id="audio"
                value={""}
                key={src}
                onChange={(e) => { handleFileSelect(e) }}
                type={"file"}
                style={{ display: "none" }}
              /></div> : null
              }
              <Icon path={props.purpose === "TRANSCRIPT A NEW AUDIO" ? !file ? mdiPlus : mdiRefresh : mdiFolderSearchOutline} size={1.5} color="red" />
            </IconButton>
          </div>
          <Divider />
          {props.purpose === "TRANSCRIPT A NEW AUDIO" && file ?
            <div style={{ display: 'flex', justifyContent: 'center', padding: "25px" }}>
                <Button variant="contained" color="primary" onClick={()=>{props.getText(base64)}}>
                  Create
            </Button>

            </div> : null}

        </Card>
      </Grid>
    </Grid>

  );
}
const mapStateToProps = (state) =>{
  return {text:state.text}
}
const mapDispatchToProps = (dispatch) =>{
  return{
    getText:(base64)=>{dispatch(getText(base64))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardUI);

