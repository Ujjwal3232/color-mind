import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import chroma from "chroma-js";
import { withStyles } from '@mui/styles';
import styles from "./styles/ColorBoxStyles"




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
        <div style={{background}} className={`${classes.copyOverlay} ${copied && classes.copyOverlayShow}`} />
      <div className={`${classes.copyMsg} ${copied && classes.copyMsgShow} `} >
        <h1 className={`${classes.copyMsgH1} ${isLightColor && "dark-text"}`}>copied!</h1>
        <p className={`${classes.copyMsgP} ${classes.copyText}`}>{this.props.background}</p>
      </div>
      <div className='copy-container'>
        <div className={classes.boxContent}>
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