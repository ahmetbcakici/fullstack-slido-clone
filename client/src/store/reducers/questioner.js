const questioner = (state = null, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_QUESTIONER':
      return payload;
    default:
      return state;
  }
};

export default questioner;
