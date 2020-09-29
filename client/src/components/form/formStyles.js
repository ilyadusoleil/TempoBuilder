import {primary, secondary} from '../../colors'

export const FORM_BUTTON = (ctx) => `cursor: pointer;
margin-top: 3px;
margin-bottom: 5px;
background: ${primary(ctx)};
padding: 4px 15px;
border-radius: 3px;
height: 20px;
&:hover {
  background: ${secondary(ctx)};
}`