import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Sidebar from 'react-sidebar';

import Context from '../Context'

import Header from '../components/header/Header';
import SidebarContent from '../components/header/SidebarContent';
import Metronome from '../components/Metronome';

import NewPlan from '../components/form/NewPiece';

const HomePage = () => {
  const ctx = useContext(Context);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div>
      <Sidebar
        sidebar={SidebarContent()}
        open={isSideBarOpen}
        onSetOpen={setIsSideBarOpen}
        styles={{ sidebar: { background: 'white' } }}
      >
        <Header setIsSideBarOpen={setIsSideBarOpen} />
        {ctx.state.displayState === 'form' ? <NewPlan /> : <Metronome />}
      </Sidebar>
    </div>
  );
};

export default HomePage;
