export default{
   root:{
     backgroundColor:"white",
     border: "1px solid black",
     borderRadius:"5px",
     padding:"0.5rem",
     position:"relative",
     overflow:"hidden",
     transition: "all 0.3s ease",   // smooth hover animation
     "&:hover": {
         cursor: "pointer",
         boxShadow: "0 0 15px 3px rgba(255, 255, 255, 0.8)", // 🌟 white glow effect
         transform: "scale(1.03)" // optional: slight pop-out effect
       }
   },
   colors:{
       backgroundColor:"#dae1e4",
       height:"150px",
       width:"100%",
       borderRadius:"5px",
       overflow:"hidden"
   },

   title:{
      display:"flex",
      justifyContent: "space-between",
      alignItems:"center",
      margin:"0",
      color:"black",
      padding:"0.5rem",
      fontSize: ".8rem",
      position:"relative",
   },
   emoji:{
      marginLeft : "0.5rem",
      fontSize : "1.2rem",
   },
   miniColor:{
    height:"25%",
    width:"20%",
    display:"inline-block",
    margin:"0 auto",
    position:"relative",
    marginBottom: " -3.5px"
   }
};