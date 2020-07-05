import React, {Fragment} from 'react';

function PollList() {
  return (
    <Fragment>
      <p>
        <b>poll list</b>
      </p>
      <ul>
        <li>
          {' '}
          (oynat/durdur) unboxing mi game development mı? (katılımcı sayısı) ...
          (edit,duplicate,reset results,delete)
        </li>
        <li>
          {' '}
          (oynat/durdur) bir mola verelim mi? (katılımcı sayısı) ...
          (edit,duplicate,reset results,delete)
        </li>
      </ul>
    </Fragment>
  );
}

export default PollList;
