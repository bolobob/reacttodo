/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import Header from "./Header";

storiesOf('Common/Header', module).add('default', () => {
  return (<Header editing={boolean('editing', false)} toggleEditing={()=>{}}/>);
});
