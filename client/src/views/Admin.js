import React, {Fragment} from 'react';

import {Events, Navbar} from '../components/Admin';

function Admin() {
  return (
    <Fragment>
      <Navbar />
      <Events />
    </Fragment>
  );
}

export default Admin;
