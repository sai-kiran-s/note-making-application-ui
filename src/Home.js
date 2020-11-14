import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { logoutHandler } from './userReducer';
import {connect} from 'react-redux'
import Appbar from './Appbar'


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Audio to Notes',
    price: '0',
    description: ['Upload a .wav file', 'After conversion edit the text if you wish to modify'],
    buttonText: 'Convert',
    buttonLink:"/transcript",
    buttonVariant: 'outlined',
  },
  {
    title: 'Create A New Note',
    price: '15',
    description: [
      'Type the notes',
      'save it for later',
      'Everything free of cost',
    ],
    buttonText: 'Get started',
    buttonLink:"/createnotes",
    buttonVariant: 'contained',
  },
  {
    title: 'Show Old Notes',
    price: '30',
    description: [
      'Check your previous work',
      'edit and save them again if you wish to change'
    ],
    buttonText: 'View',
    buttonLink:"/viewsavednotes",
    buttonVariant: 'outlined',
  },
];


function Home(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar/>
      
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        
        <Typography variant="h3" align="center"  component="p">
          Create Notes At Ease
        </Typography>
      </Container>
      <br/>
      <br/>
      <br/>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions style={{display:'flex',justifyContent:'center'}}>
                  <Link to={tier.buttonLink} style={{textDecoration:'none'}}>
                  <Button href={tier.buttonLink} fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                  </Link>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    
    </React.Fragment>
  );
}

const mapStateToProps = (state) =>{
  return{

  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    logoutHandler:()=>{dispatch(logoutHandler())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);