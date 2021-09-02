import React from "react";
import { Box } from "grommet";
import XMLForm from "./XMLForm";

const Home = () => {
  return (
    <Box align="center" pad={{ top: "none", horizontal: "medium" }} fill>
      <Box align="center">
        <Box width="large" height="xlarge" margin="small">
         <XMLForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
