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
