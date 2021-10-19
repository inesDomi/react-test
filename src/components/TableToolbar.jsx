import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import GlobalFilter from "./GlobalFilter";


const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    deleteUserHandler,
    setGlobalFilter,
    globalFilter
  } = props;
  return (
    <Toolbar className={classes.highlight}>
      <Typography className={classes.title} color="inherit" variant="h5">
        Manage Users
      </Typography>

      {numSelected > 0 ? (
        <React.Fragment>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteUserHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};


const useToolbarStyles = makeStyles((theme) => ({
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    display: "flex",
    flex: "1 1 100%"
  }
}));

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  deleteUserHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  globalFilter: PropTypes.string
};

export default TableToolbar;
