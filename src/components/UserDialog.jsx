import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const propTypes = {
  open: PropTypes.bool.isRequired,
  detail: PropTypes.object,
  setOpen: PropTypes.func.isRequired,
};

const defaultProps = {
  detail: undefined,
};


const UserDialog = ({ detail, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {detail && (
              <ul>
                <li>Email: {detail.user?.email}</li>
                <li>
                  Albuns title
                  <ul>
                    {detail?.albuns.map((item) => (
                      <li key={item.id}>{item?.title}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}
          </DialogContentText>

          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

UserDialog.propTypes = propTypes;
UserDialog.defaultProps =defaultProps;

export default UserDialog;
