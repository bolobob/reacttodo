import React, { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  editing: boolean;
  toggleEditing: () => void;
};

const useStyles = makeStyles({
  toolBar: {
    justifyContent: "space-between",
  },
});

const Header: FC<Props> = ({ editing, toggleEditing }) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" component="h1" align="center">
          ToDo
        </Typography>
        <Button color="inherit" onClick={toggleEditing}>
          {editing ? "完了" : "編集"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
