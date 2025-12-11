import chroma from "chroma-js";


export default{
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
        chroma(props.background).luminance()>=0.5 ? "black": "white"
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
     },
     boxContent: {
       position: "absolute",
       padding: "10px",
       width: "100%",
       left: "0px",
       bottom: "0px",
       color: "black",
       letterSpacing: "1px",
       textTransform: "uppercase",
       fontSize: "12px"
     },
     copyOverlay: {
       opacity: 0,
       zIndex: 0,
       width: "100%",
       height: "100%",
       transition: "transform 0.8s ease-in-out",
       transform: "scale(0.1)"
     },
     copyOverlayShow: {
        opacity: 1,
        transform: "scale(50)",
        zIndex: 10,
        position: "absolute"
      },
      copyMsg: {
       position: "fixed",
       left: 0,
       right: 0,
       top: 0,
       bottom: 0,
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       justifyContent: "center",
       fontSize: "4rem",
       transform: "scale(0.1)",
       opacity: 0,
       color: "white"
     },
     copyMsgShow: {
       opacity: 1,
       transform: "scale(1)",
       zIndex: 25,
       transition: "all 0.4s ease-in-out",
       transitionDelay: "0.3s"
     },                                      
     copyMsgH1: {
        fontWeight: 400,
        textShadow: "1px 2px black",
        background: "rgba(255, 255, 255, 0.2)",
        width: "100%",
        textAlign: "center",
        marginBottom: 0,
        padding: "1rem",
        textTransform: "uppercase",
        color: (props) =>
          chroma(props.background).luminance() >= 0.5 ? "black" : "white",
        backgroundColor: (props) =>
          chroma(props.background).luminance() >= 0.5
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(255, 255, 255, 0.2)"
      },

      copyMsgP: {
        fontSize: "2rem",
        fontWeight: 100,
        textTransform: "uppercase"
      }
                                                                   
}