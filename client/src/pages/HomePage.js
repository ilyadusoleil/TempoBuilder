import React, { useState } from 'react';
import { css } from '@emotion/core';
import Sidebar from 'react-sidebar';

import Header from '../components/header/Header'
import SidebarContent from '../components/header/SidebarContent'
import Metronome from '../components/Metronome';

const HomePage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div>
      <Sidebar
        sidebar={SidebarContent()}
        open={isSideBarOpen}

        onSetOpen={setIsSideBarOpen}
        styles={{ sidebar: { background: 'white' } }}
      >
        <Header setIsSideBarOpen={setIsSideBarOpen}/>
        <Metronome />
      </Sidebar>
    </div>
  );
};

export default HomePage;
