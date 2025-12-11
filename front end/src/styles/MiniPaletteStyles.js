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
       },       
       
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
   },
   delete: {
  position: "absolute",
  right: 0,
  top: 0,
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  backgroundColor: "rgba(222, 169, 219, 0.7)",
  borderBottomLeftRadius: "5px",
  cursor: "pointer",
  
  transition: "opacity 0.3s ease",
  "&:hover $lid": {
          transform: "rotate(-35deg)"
        }
},

trash: {
  position: "relative",
  width: "20px",
  height: "20px",
},
can: {
  width: "16px",
  height: "14px",
  backgroundColor: "#e63946",
  borderRadius: "3px",
  position: "absolute",
  bottom: 0,
  left: "2px",
},
lid: {
  width: "18px",
  height: "4px",
  backgroundColor: "#e63946",
  borderRadius: "2px",
  position: "absolute",
  top: "-2px",
  left: "1px",
  transformOrigin: "left bottom",
  transition: "transform 0.3s ease",
},

deleteIcon: {
  fontSize: "18px",
  fontWeight: "bold",
  pointerEvents: "none"
},

};