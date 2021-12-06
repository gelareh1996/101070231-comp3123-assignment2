
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Container,Grid,Typography,Button, Box,} from "@mui/material";
import axios from "axios";
export default function SimpleContainer() {
  const navigate = useNavigate();
  const params = useParams();
  const [state, setstate] = useState();

  useEffect( async () => {
    try {
      const {data} = await axios.get(`http://localhost:9090/api/v1/employees/${params.id}`)
      setstate(data)
    } catch (error) {
      navigate('/')
      console.log(error)
    }
  },[params])
  return (
    <Container>
      <Grid container padding="15px">
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between">
          <Typography ><h1>Employee Detail</h1></Typography>
          <Button onClick={() => navigate("/")} variant="contained">
            View All
          </Button>
        </Grid>
        <Grid>
          <Box >
              <Typography><h2>First Name: </h2> <span>{state?.firstname}</span></Typography>
              <Typography ><h2>Last Name: </h2><span>{state?.lastname}</span></Typography>
              <Typography ><h2>Email: </h2> <span>{state?.email}</span></Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
