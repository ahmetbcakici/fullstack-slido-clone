import React, {Fragment, useState} from 'react';

function NameArea({questioner, anonFunc, isAnon}) {
  const isQuestionerAnon = questioner.name === 'Anon' ? true : false;

  //const [isAnon, setIsAnon] = useState(false);

  /* const handleSetIsAnon = () => setIsAnon(!isAnon); */

  const renderAskingAs = () => {
    if (isQuestionerAnon) return <p>Asking as Anon</p>;

    if (isAnon)
      return (
        <Fragment>
          <p>Asking as Anon</p>
          <p onClick={anonFunc}>Switch to {questioner.name}</p>
        </Fragment>
      );

    /* if(!isAnon) */
    return (
      <Fragment>
        <p>Asking as {questioner.name}</p>
        <p onClick={anonFunc}>Switch to Anon</p>
      </Fragment>
    );
  };

  return <Fragment>{renderAskingAs()}</Fragment>;
}

export default NameArea;
