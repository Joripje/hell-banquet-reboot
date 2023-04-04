import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./pages";
import Grid from "@mui/system/Unstable_Grid/Grid";

function App() {
  return (
    <Grid container>
      <Grid item sm={3} md={4}></Grid>
      <Grid item xs={12} sm={6} md={4} style={{ backgroundColor: "#EDEBE9" }}>
        <RouterProvider router={router} />
      </Grid>
      <Grid item sm={3} md={4}></Grid>
    </Grid>
  );
}

export default App;
