export const text = (ctx = { state: { isNightMode: false } }) =>
  ctx.state.isNightMode ? 'white' : '#19180A';

export const primary = (ctx = { state: { isNightMode: false } }) =>
  ctx.state.isNightMode ? '#C5C1BE' : '#C5C1BE';
export const secondary = (ctx = { state: { isNightMode: false } }) =>
  ctx.state.isNightMode ? '#0078A3' : '#00ABE7';
export const background = (ctx = { state: { isNightMode: false } }) =>
  ctx.state.isNightMode ? 'black' : '#FFFFFA';
export const header = (ctx = { state: { isNightMode: false } }) =>
  ctx.state.isNightMode ? '#1A1A1B' : '#FFFFFA';

export const NightModeTransitionTime = '500ms';
