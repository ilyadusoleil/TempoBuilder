import React, { useState, useContext, useEffect } from 'react';

import Sidebar from 'react-sidebar';

import Context from '../Context';
import { getPieces } from '../ApiClient';

import Header from '../components/header/Header';
import SidebarContent from '../components/header/SidebarContent';
import Metronome from '../components/metronome/Metronome';

import NewPlan from '../components/form/NewPiece';
import EditPlan from '../components/form/EditPiece';

import { background, NightModeTransitionTime } from '../colors';

const HomePage = () => {
  const ctx = useContext(Context);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    getPieces(ctx)
  }, []);

  return (
    <div>
      <Sidebar
        sidebar={SidebarContent(setIsSideBarOpen)}
        open={isSideBarOpen}
        onSetOpen={setIsSideBarOpen}
        styles={{
          sidebar: { background: 'white' },
          content: {
            background: background(ctx),
            transition: NightModeTransitionTime,
          },
        }}
      >
        <Header setIsSideBarOpen={setIsSideBarOpen} />
        {ctx.state.displayState === 'form' && <NewPlan />}
        {ctx.state.displayState === 'edit' && <EditPlan />}
        {ctx.state.displayState === 'home' && <Metronome />}
      </Sidebar>
    </div>
  );
};

export default HomePage;
