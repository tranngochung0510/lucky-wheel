import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function LockModal(props) {
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [name,setName] = React.useState("");
  const [password,setPassword] = React.useState("");
  function handleClose() {  

      axios.post(`http://localhost:3001/auth/login`,{
        username:name,
        password:password
      }).then(res=>{
          setError(false);
          setOpen(false);
      }).catch(error=>{
          setError(true);
          console.log(error);
          return;
      })
      
  }


  function getName(e) {
    setName(e.target.value);
  }
  function getPassword(e){
    setPassword(e.target.value);
  }  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Đăng nhập </DialogTitle>
        <DialogContent>
          <TextField
            error={error}
            autoFocus
            margin="dense"
            id="name"
            label="Tên đăng nhập" 
            fullWidth
            // helperText={error === true ? 'Sai mật khẩu' : ""}
            onChange= {(e)=>{getName(e)}}
          />
          <TextField
            type="password"
            error={error}
            autoFocus
            margin="dense"
            id="name"
            label="Mật khẩu" 
            fullWidth
            helperText={error === true ? 'Sai mật khẩu' : ""}
            onChange= {(e)=>{getPassword(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
