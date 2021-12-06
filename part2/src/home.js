
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container,Grid,Typography,Button, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Alert,IconButton} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";

export default function SimpleContainer() {
  const navigate = useNavigate();
  const [refresh, setrefresh] = useState(false)
  const [alert, setalert] = useState({
    visible: false,
    msg: "",
    type: "success",
  });
  const [data, setdata] = useState([]);

  const deleteEmplyee = async (id) => {
    const confirmd = confirm("do you want to delet this employee");
    if (confirmd) {
      try {
        const { data } = await axios.delete(
          `http://localhost:9090/api/v1/employees/${id}`
        );
        setalert({
          visible: true,
          msg: data.message,
          type: "success",
        });
        setrefresh(true)
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
    }
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9090/api/v1/employees"
      );
      setdata(data);
    } catch (error) {
      console.log(error);
    }
    setrefresh(false)
  }, [refresh]);
  return (
    <Container maxWidth="lg">
      <Grid container padding="15px">
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between" >
          <Typography><h1>Employees</h1></Typography>
          <Button
            onClick={() => navigate("/add-emplyee")}
            variant="contained"
            startIcon={<AddOutlinedIcon />}>
            Add New
          </Button>
        </Grid>
        <Grid marginTop="50px">
          {alert.visible && (
            <Alert
             style={{marginBottom:'20px'}}
              severity={alert.type}
              onClose={() => setalert({ ...alert, visible: false })} >
              {alert.msg}
            </Alert>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="right">
                      <IconButton  onClick={() => navigate(`/update-emplyee/${row._id}`)}><CreateIcon /></IconButton>
                      <IconButton  onClick={() => deleteEmplyee(row._id)}><DeleteIcon /></IconButton>
                      <IconButton  onClick={() => navigate(`/emplyee-detail/${row._id}`)}><VisibilityIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
