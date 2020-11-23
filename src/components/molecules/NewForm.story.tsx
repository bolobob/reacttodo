/** @jsx jsx */
import { useRef } from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import NewForm from "./NewForm";

storiesOf("Common/NewForm", module).add("default", () => {
  return (
    <NewForm
      newFormShown={boolean("newFormShown", true)}
      labelId={text("labelId", "labelid")}
      createTask={action("createTask")}
      inputRef={useRef<HTMLInputElement>(null)}
    />
  );
});
