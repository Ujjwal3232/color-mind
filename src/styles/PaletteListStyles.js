import { border, borderRadius, width } from "@mui/system";

export default {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "auto", // ✅ allows scrolling when more palettes are added
  },
  container: {
    width: "70%", // ✅ widened to fit grid better
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: "2rem", // ✅ spacing from bottom
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    marginBottom: "1rem",
    alignItems: "center",
    '& a': {
      color: "white",
      textDecoration: "none",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // ✅ responsive grid
    gridGap: "1.5rem", // ✅ consistent spacing
  },
};
