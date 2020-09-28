import {secondary} from '../../colors'

export const sidebarButtonStyle = (ctx) => `margin: 10px 0px;
&:hover {
  background: ${secondary(ctx)};
}
border-radius: 1px;
padding: 5px 20px;
cursor: pointer;
display: flex;`;