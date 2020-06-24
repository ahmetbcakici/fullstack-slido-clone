import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JoinAsParticipantArea from '../components/JoinAsParticipantArea';

function Welcome() {
  return (
    <div>
      <Navbar />
      <JoinAsParticipantArea/>
      <Footer />
    </div>
  );
}

export default Welcome;
