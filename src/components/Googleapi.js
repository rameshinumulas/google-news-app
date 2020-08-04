import React,{Fragment}from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';



class NewsApi extends React.Component{
  constructor(){
    super()
    this.state={
      Data:[],
      number:0,
      mainDataList:[],
      search:''
    }
  }
  componentDidMount(){
    axios.get("https://newsapi.org/v2/top-headlines?pageSize=100&country=in&category=Business&apiKey=5bb8df76f578431f80c85a4c9bd311ac")
    .then(res=>{console.log(res.data.articles);
    this.setState({Data:res.data.articles})})
    .catch(responce=>{console.log(responce);})
  }
  Nextpage = ()=>{
    console.log("hello");
    var next_10=this.state.Data.slice(this.state.number,this.state.number+10)
    this.setState({mainDataList:next_10,number:this.state.number+10})
  }
  Previouspage = () =>{
    console.log("hello9834");
    var previous_10=this.state.Data.slice(this.state.number-40,this.state.number-10)
    this.setState({mainDataList:previous_10,number:this.state.number-10})
  }
  SearchFilter=(e)=>{
    console.log("okay");
    this.setState({search:e.target.value})
  }

  render() {
    const {Data}=this.state
   const filterMethod = Data.filter(each =>{
    return each.url.toLowerCase().includes(this.state.search.toLowerCase())})

            var previous;
            var nextpage;
            if (this.state.number === 10) {
                previous = ""
                nextpage = <Button variant="contained" color="primary" onClick={this.Nextpage}>Next Page</Button>
            } else if (this.state.number === 80) {
                previous = <Button variant="contained" color="primary" onClick={this.Previouspage}>previous page</Button>
                nextpage = ""
            } else {
                nextpage = <Button variant="contained" color="primary" onClick={this.Nextpage} style={{ marginLeft: "10px" }}>Next Page
              </Button>
                previous = <Button variant="contained" color="primary" onClick={this.Previouspage} >Previous Page</Button>
            }

    return(
      <Fragment>
      <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Google News
            </Typography>
            <div style={{marginLeft:"50%",display:"flex"}}>
              <div>
                <SearchIcon style={{marginTop:"50%"}}/>
              </div>

              <InputBase type="text" name="country" value={this.state.search} style={{backgroundColor:"white",width:"200px",height:"30px"}}
              onChange={(e) => this.SearchFilter(e)} placeholder="search news "/>


            </div>
            <Button color="inherit" style={{marginLeft:"10%",backgroundColor:"red"}}>Login</Button>

          </Toolbar>
        </AppBar>
      <div style={{padding:"7px"}}>

          </div>
              {filterMethod.slice(this.state.number,this.state.number+10).map((one,index)=><Typography key={index}>
              <div className="card-style">
               <Box textAlign="center" s={1}>
                <Grid container wrap="wrap">
                <Grid item wrap="nowrap">
                      <Card className="hello" style={{marginLeft:"60%",width:"650px",height:"300px", boxShadow:"3px 3px 3px 3px gray", textAlign:"center",marginTop:"0px",paddingBottom:"10px",border:'1px solid black',borderRadius:"10px", display:"flex", justifyContent:"flex-end"}}>
                        <CardActionArea >
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {one.title}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="p">
                              {one.description}
                            </Typography>
                            <Typography variant="body2" gutterBottom color="primary">
                            wrriten by  {one.author}
                            </Typography>
                            <Button size="small" color="primary">
                              <a href={one.url} >Read more</a>
                            </Button>
                        </CardContent>
                      </CardActionArea>
                      <img src={one.urlToImage} alt="" style={{width:"300px"}}/>
                    </Card>
                </Grid>
             </Grid>
            </Box>
        </div>
    </Typography>)}
        <div>
          {previous}
          {nextpage}
          </div>
      </Fragment>

    );
  }
}


export {NewsApi};
