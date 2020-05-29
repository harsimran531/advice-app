import React, { Component } from "react";
import BackgroundImageOnLoad from "background-image-on-load";
import './App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  state = {
    bgIsLoaded: false,
    advice: '',
  };
  componentDidMount() {
     this.fetchAdvice();
    }
    fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
        console.log(advice);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  loadPage(){
    console.log('clicked')
    window.location.reload();
  }
  render() {
    const { bgIsLoaded,advice } = this.state;
    return (
      
      <div
        style={{
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${
            !bgIsLoaded
              ? "https://unsplash.it/1200?nature"
              : "https://unsplash.it/1200?city"
          })`
        }}>
        <BackgroundImageOnLoad
          src={"https://unsplash.it/1200?random"}
          onLoadBg={() =>
            this.setState({
              bgIsLoaded: true
            })
          }
          onError={err => console.log("error", err)}
        />
        <div className="app">
        <div className="card">
          <Card>
           <CardActionArea>
             <CardContent>
               <Typography variant="h5" component="h5" className="heading">
                 {advice}
               </Typography>
             </CardContent>
           </CardActionArea>
           <CardActions>
             <Button size="medium" color="primary" className="button" variant="outlined" onClick={() => {
          this.fetchAdvice();
          this.loadPage();
          }}>
               GET AN ADVICE!
         </Button>
           </CardActions>
         </Card>
      </div>
      </div>
      </div>
    );
  }
}


export default App;



