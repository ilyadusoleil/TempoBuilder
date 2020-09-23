import React from 'react';

const SidebarContent = () => {
  return (
    <div>
      <h1>Hi Hamish</h1>
      <div
        role="button"
        tabIndex='0' 
        onKeyDown={() => console.log('Arban 1')}
        onClick={() => console.log('Arban 1')}
      >
        Arban 1
      </div>
      <div>Charlier 2</div>
    </div>
  );
};

export default SidebarContent;
