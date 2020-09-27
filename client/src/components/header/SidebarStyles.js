import {secondary} from '../../colors'

export const sidebarButtonStyle = (ctx) => `margin: 10px 0px;
&:hover {
  background: ${secondary(ctx)};
}
border-radius: 5px;
padding: 5px;
cursor: pointer;
display: flex;`;