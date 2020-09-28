import React, { useState, useContext, useEffect } from 'react';

import Sidebar from 'react-sidebar';

import Context from '../Context';

import Header from '../components/header/Header';
import SidebarContent from '../components/header/SidebarContent';
import Metronome from '../components/metronome/Metronome';

import NewPlan from '../components/form/NewPiece';
import EditPlan from '../components/form/EditPiece';

import { SERVER } from '../constants';

import { background, NightModeTransitionTime } from '../colors';

const HomePage = () => {
  const ctx = useContext(Context);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // if (isLoading) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;
  useEffect(() => {

    fetch(`${SERVER}/piece`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => (res.status != 204 ? res.json() : res))
      .then((res) => {
        res.forEach((piece) => {
          ctx.dispatch({ type: 'addNewPiece', payload: piece });
        });
      });
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
