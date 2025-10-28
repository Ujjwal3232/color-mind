import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import chroma from "chroma-js";
import { withStyles } from '@mui/styles';
import "./ColorBox.css";

const styles ={
     ColorBox: {
       width: "20%",
       height: props => (props.showingFullPalette? "25%":"50%"),
       margin: "0 auto",
       display: "inline-block",
       position: "relative",
       cursor: "pointer",
       marginBottom: "-3.5px",
       "&:hover $copyButton": { // ✅ reference JSS class instead of "button"
        opacity:"1"
       }
       },

     copyText:{
       color: props => 
        chroma(props.background).luminance()>=0.7 ? "black": "white"
     },
     colorName:{
      color: props =>
        chroma(props.background).luminance()<=0.08? 'white' : "black"
     },
     seeMore:{
      color: props => 
        chroma(props.background).luminance()>=0.5 ? "black": "white",
      background: props => 
        chroma(props.background).luminance()>=0.5 ? "rgba(0,0,0, 0.3)": "rgba(255, 255, 255, 0.3)",
      position: 'absolute',
      border: 'none',
      right: '0px',
      bottom: '0px',
      width: '60px',
      height:'30px',
      textAlign: 'center',
      lineHeight: '30px',
      textTransform: 'uppercase'
     },
     copyButton: {
  width: "100px",
  height: "30px",
  position: "absolute",
  display: "inline-block",
  top: "50%",
  left: "50%",
  marginLeft: "-50px",
  marginTop: "-15px",
  textAlign: "center",
  outline: "none",
   background: props => 
        chroma(props.background).luminance()>=0.5 ? "rgba(0,0,0, 0.3)": "rgba(255, 255, 255, 0.3)",
  fontSize: "1rem",
  lineHeight: "30px",
  color: props => 
        chroma(props.background).luminance()>=0.5 ? "black": "white",
  textTransform: "uppercase",
  border: "none",
  opacity: 0,
  textDecoration: 'none',
  transition: "opacity 0.3s ease" // ✨ smoother fade-in
}

}

 class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state={copied:false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied:true} , ()=>{
           setTimeout(()=> this.setState({copied:false}),1500)
        });
    }
  render() {
    const { name, background, paletteId, id, showingFullPalette,classes } = this.props;
    const {copied} =this.state;
   
    const isLightColor = chroma(background).luminance()>=0.5;


    return (
       <CopyToClipboard text={background} onCopy={this.changeCopyState}> 
      <div style={{background}} className={classes.ColorBox}>
      <div style={{background}} className={`copy-overlay ${copied && "show"}`} />
      <div className={`copy-msg ${copied && "show"} `} >
        <h1 className={` ${isLightColor && "dark-text"}`}>copied!</h1>
        <p className={classes.copyText}>{this.props.background}</p>
      </div>
      <div className='copy-container'>
        <div className='box-content'>
            <span className={classes.colorName}>{name}</span>
        </div>
        <button className={classes.copyButton}>Copy</button>
      </div>
      {showingFullPalette && (
       <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
       <span className={classes.seeMore}>MORE</span>
       </Link>
         )}

      </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);