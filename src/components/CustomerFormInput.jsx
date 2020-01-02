import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import "../App.css"
const statisticQuery = `{getStatisticals{
  id
  eventName
  cost
  numberOfParticipants
  revenue
  note
}}`
export default function CustomerFormInput(props) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] = React.useState("");
  const [phone,setPhone] = React.useState("");
  const [birthday,setBirthday] = React.useState(new Date(1990,1,1));
  const [adress,setAdress] = React.useState("");
  const [eventName,setEventName] = React.useState("");
  const [job,setJob] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [CMND,setCMND] = React.useState("");
  const [code,setCode] = React.useState("");
  const [statistical,setStatistical] = React.useState([]);
  const [openEvent,setOpenEvent] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const [nameEvent ,setNameEvent] =React.useState('');
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function postData() {   
    // console.log(birthday,"birthday");
    // console.log(code,"code");
    axios.post(`http://localhost:3001/graphql`, {
      query: `mutation createCustomerMutation($customer:CreateCustomerInput) {
              createCustomer(createCustomerInput:$customer) { 
              eventName
              }
            }`,
      variables: {
        customer :{
          "idNumber" : CMND,
          "name": name,
          "phone": phone,
          "birthday":birthday,
          "adress":adress,
          "job" : job,
          "email" : email,
          "code" : code,
          "eventName":eventName,
        }
      },
      })
      .then(res => 
        {
          for(let i =0 ;i<statistical.length ;i++){
            if(statistical[i].eventName === nameEvent){
              axios.post(`http://localhost:3001/graphql`, {
                query: `mutation updateStatisticalMutation ($statistical : UpdateStatisticalInput) {
                  updateStatistical ( updateStatisticalInput : $statistical ){
                      eventName
                  }
               }`,
                variables: {
                  statistical :{
                    "id" :  statistical[i].id,
                    "eventName": statistical[i].eventName,
                    "cost":  statistical[i].cost,
                    "numberOfParticipants":  statistical[i].numberOfParticipants + 1,
                    "revenue":  statistical[i].revenue,
                    "note": statistical[i].note
                  }
                },
                })
            }
          }
          
        })
      .catch(err => console.log(err))
    setOpen(false);
  }
  useEffect(() => {
    
    axios.get(`http://localhost:3001/graphql?query=${statisticQuery}`).then(res=>{
      console.log(res.data);
    setStatistical(res.data.data.getStatisticals)
  })
    
  }, [])
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
  function getEmail(e) {
    setEmail(e.target.value);
  }

  function getCMND(e) {
    setCMND(e.target.value);
  }

  function getJob(e) {
    setJob(e.target.value);
  }

  function getCode(e) {
    setCode(e.target.value);
  }
  function fopenEvent(e) {
    // setTarget(e.currentTarget);
    setTarget(e.currentTarget);
		setOpenEvent(true);
  }
  function handleMenuCLick(e) {

    console.log(e.target.dataset);
		let eventName = e.target.dataset.name;
    setNameEvent(eventName);
    // setIdEvent(e.target.dataset.id)
		// props.getCustomers(eventName);
		handleCloseEvent();
  }
  function handleCloseEvent (){
    // console.log("handleCloseEvent");
    setOpenEvent(false);
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
            autoFocus
            margin="dense"
            id="CMND"
            label="CMND" 
            fullWidth
            onChange= {(e)=>{getCMND(e)}}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Số điện thoại"
            fullWidth
            onChange= {(e)=>{getPhone(e)}}
          />

          <div style={{paddingBottom:"20px",paddingTop:"20px",display:"flex"}}>
              <p >Chọn ngày bắt đầu</p>
              <div style={{marginLeft:"15px",marginTop:"15px"}}>
                <DatePicker 
                
                placeholderText="Nhấn để chọn ngày"
                  selected={birthday} onChange={date => setBirthday(date)} 
                />
              </div>
              
            </div>

          <TextField
            margin="dense"
            id="adress"
            label="Địa chỉ"
            fullWidth
            onChange= {(e)=>{getAdress(e)}}
          />
          <div>
          <button
              onClick={fopenEvent}
              className="btn-start"
              style={{
                // backgroundImage:`url(${setting})`,
                marginTop: '30px'
                // marginLeft :"26%"
              }}
            >
              Chọn sự kiện
          </button>
          <p className="event">{nameEvent || ''}</p>
          <Poppers open={openEvent} transition disablePortal anchorEl={target}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom'
                      ? 'left top'
                      : 'left bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseEvent}>
                    <MenuList role="menu">
                      {statistical.map(statistical => (
                        <MenuItem
                          onClick={handleMenuCLick}
                          key={statistical.id}
                          data-name={statistical.eventName}
                          data-id ={statistical.id}
                        >
                          {statistical.eventName}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
		    	</Poppers>
          </div>
          <TextField
            margin="dense"
            id="job"
            label="Nghề nghiệp"
            fullWidth
            onChange= {(e)=>{getJob(e)}}
          />

          <TextField   
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            onChange= {(e)=>{getEmail(e)}}
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
