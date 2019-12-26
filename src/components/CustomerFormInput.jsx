import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function CustomerFormInput(props) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] = React.useState("");
  const [phone,setPhone] = React.useState("");
  const [birthday,setBirthday] = React.useState("");
  const [adress,setAdress] = React.useState("");
  const [eventName,setEventName] = React.useState("");
  const [code,setCode] = React.useState("");
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function postData() {   

    axios.post(`http://localhost:3001/graphql`, {
      query: `mutation createCustomerMutation($customer:CreateCustomerInput) {
          createCustomer(createCustomerInput:$customer) { 
           name
          }
        }`,
      variables: {
        customer :{
          "name": name,
          "phone": phone,
          "birthday":"05-05-1998",
          "adress":adress,
          "eventName":eventName,
          "checkinTime": new Date(),
          "code": code
        }
      },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setOpen(false);
  }

  function getName(e) {
    setName(e.target.value);
  }
  function getPhone(e) {
    setPhone(e.target.value);
  }
  function getBirthday(e) {
    setBirthday(e.target.value);
  }
  function getAdress(e) {
    setAdress(e.target.value);
  }
  function getEventName(e) {
    setEventName(e.target.value);
  }
  function getCode(e) {
    setCode(e.target.value);
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button
        onClick={handleClickOpen}
        style={{
          // backgroundImage:`url(${setting})`,
          height:"60px",
          width:"260px",
          backgroundColor: "transparent",
          border: "none",
          marginLeft :"26%"
        }}
      >
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Điền thông tin khách hàng </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ và tên" 
            fullWidth
            onChange= {(e)=>{getName(e)}}
          />
          <TextField
            
            margin="dense"
            id="phone"
            label="Số điện thoại"
            fullWidth
            onChange= {(e)=>{getPhone(e)}}
          />
          <TextField
            
            margin="dense"
            id="birthday"
            label="Ngày sinh"
            fullWidth
            onChange= {(e)=>{getBirthday(e)}}
          />
          <TextField
            
            margin="dense"
            id="adress"
            label="Địa chỉ"
            fullWidth
            onChange= {(e)=>{getAdress(e)}}
          />
          <TextField
            
            margin="dense"
            id="eventName"
            label="Tên sự kiện"
            fullWidth
            onChange= {(e)=>{getEventName(e)}}
          />
          
          <TextField
            
            margin="dense"
            id="code"
            label="Code"
            fullWidth
            onChange= {(e)=>{getCode(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={postData} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
