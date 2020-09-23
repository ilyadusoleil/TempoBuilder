import React, { useState } from 'react';
import { css } from '@emotion/core';
import Sidebar from 'react-sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
        <div
          css={css`
            display: flex;
            background: peru;
            height: 50px;
            align-items: center;
            margin-bottom: 20px;
            padding-left: 15px;
          `}
        >
          <FontAwesomeIcon
            css={css`
              cursor: pointer;
              &:hover {
                transform: scale(1.3);
              }
            `}
            onClick={() => setIsSideBarOpen(true)}
            color="#black"
            size="1x"
            icon={faBars}
          />
          <div
            css={css`
              font-size: 25px;
              font-weight: 800;
              margin-left: 15px;
            `}
          >
            Tempo Builder
          </div>
        </div>
        <Metronome />
      </Sidebar>
    </div>
  );
};

export default HomePage;

// import React, { useState } from 'react';
// import Sidebar from 'react-sidebar';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

// import Metronome from '../components/Metronome';

// const HomePage = () => {
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);

//   return (
//     <div>
//       <Sidebar
//         sidebar={<b>Sidebar content</b>}
//         open={isSideBarOpen}
//         onSetOpen={setIsSideBarOpen}
//         styles={{ sidebar: { background: 'white' } }}
//       >
//         <FontAwesomeIcon
//           onClick={() => setIsSideBarOpen(true)}
//           color="#black"
//           size="1x"
//           icon={faBars}
//         />
//       </Sidebar>
//       <h1>Tempo Builder</h1>
//       <Metronome />
//     </div>
//   );
// };

// export default HomePage;
