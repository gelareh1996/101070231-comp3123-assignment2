import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid,Typography, TextField, Button,Box,} from "@mui/material";
import axios from "axios";

export default function SimpleContainer() {
  const navigate = useNavigate();
  const [alert, setalert] = useState({
    visible: false,
    type: "success",
  });
  const [state, setstate] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { const submitUser = await axios.post( "http://localhost:9090/api/v1/employees",state );
      setstate({ firstname: "", lastname: "", email: "" });
    } 
    catch (error) {
      if (error.response.data) {
        return setalert({
          visible: true,
          msg: error.response.data.message,
        });
      }
      console.log(error);
    }
  };
  return (
    <Container>
      <Grid >
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography ><h3>Add Employee</h3></Typography>
          <Button onClick={() => navigate("/")}>
            View All
          </Button>
        </Grid>
        <Grid >
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
              style={{ minHeight: "56px" }}
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
