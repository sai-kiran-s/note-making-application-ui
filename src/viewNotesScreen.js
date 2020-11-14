import Grid from '@material-ui/core/Grid';
import FeaturedPost from './noteTile';
import { connect } from 'react-redux'
import { noteFetcher } from './notesReducer';
import { useEffect } from 'react';
const ViewNotesScreen = (props) => {
  const noteFetcher = () =>{
    props.noteFetcher()
  }
  useEffect(()=>{
    noteFetcher()
  },[])

  return ( 
    <Grid container spacing={4}>
            {props.notes.map((note) => (
              <FeaturedPost key={note.title} note={note} />
            ))}
    </Grid>
   );
}
const mapStateToProps = (state) => {
  return {
    notes: [...state.notes]
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    noteFetcher:()=>{dispatch(noteFetcher())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewNotesScreen);