import React, { useContext, useState } from 'react';

import Context from '../../Context';

const EditPiece = () => {
  const ctx = useContext(Context);
  const editPiece = ctx.state.pieces[ctx.state.editIdx]
  // const [editPiece, setEditPiece] = useState(
  //   ctx.state.pieces[ctx.state.editIdx]
  // );

  return (
    <div>
      {/* <h1>hello</h1> */}
      <h1>{editPiece.name}</h1>
      <button
        onClick={() => {ctx.dispatch({ type: 'setDisplayState', payload: 'home' })}}
      >
        cancel
      </button>
    </div>
  );
};

export default EditPiece;
