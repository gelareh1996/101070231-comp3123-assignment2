import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Container,Grid,Typography,TextField,Button,Box,Alert,} from "@mui/material";
import axios from "axios";

export default function SimpleContainer() {
    const params = useParams();
  const navigate = useNavigate();
  const [alert, setalert] = useState({
    visible: false,
    msg: "",
    type: "success",
  });
  const [state, setstate] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitUser = await axios.put(
        `http://localhost:9090/api/v1/employees/${params.id}`,
        state
      );
      setalert({
        visible: true,
        msg: submitUser.data.message,
        type: "success",
      });
    } catch (error) {
      if (error.response.data) {
        return setalert({
          visible: true,
          msg: error.response.data.message,
          type: "error",
        });
      }
      console.log(error);
    }
  };
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
    <Container maxWidth="sm">
      <Grid container padding="15px">
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between"
       
        >
          <Typography><h1>Add Employee</h1></Typography>
          <Button onClick={() => navigate("/")}>
            View All
          </Button>
        </Grid>
        <Grid>
          {alert.visible && (
            <Alert
            
              severity={alert.type}
              onClose={() => setalert({ ...alert, visible: false })}
            >
              {alert.msg}
            </Alert>
          )}
          <Box onSubmit={handleSubmit} component="form" Validate>
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              value={state.firstname}
              margin="normal"
              
              onChange={(e) =>
                setstate({ ...state, firstname: e.target.value })
              }
              required
            />
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
            
              margin="normal"
              value={state.lastname}
              required
              onChange={(e) => setstate({ ...state, lastname: e.target.value })}
            />
            <TextField
              id="email"
              type="email"
              margin="normal"
              label="Email"
              variant="outlined"
              value={state.email}
              required
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />
            <Button
              style={{ minHeight: "56px", marginTop: "15px" }}
              type="submit"
              variant="outlined"
            >
              Add Emplyee
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}