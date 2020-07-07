const participant = (state = null, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_PARTICIPANT':
      return payload;
    default:
      return state;
  }
};

export default participant;
