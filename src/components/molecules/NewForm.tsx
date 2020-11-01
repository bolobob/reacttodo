import React, { FC, FormEvent, RefObject } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  newFormShown: boolean;
  labelId: string;
  createTask: (e: FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
};

const useStyles = makeStyles({
  hidden: {
    display: "none",
  },
});

const NewForm: FC<Props> = ({
  newFormShown,
  labelId,
  createTask,
  inputRef,
}) => {
  const classes = useStyles();

  return (
    <ListItem className={newFormShown ? "" : classes.hidden} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={false}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      <form noValidate autoComplete="off" onSubmit={createTask}>
        <InputBase id="standard-basic" inputRef={inputRef} />
      </form>
    </ListItem>
  );
};

export default NewForm;
