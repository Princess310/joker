const Test = (state = [], action) => {
  console.log("state", state);
  switch (action.type) {
    case 'TEST':
      return state
    default:
      return state
  }
}

export default Test