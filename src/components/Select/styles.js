export const customStyles = {
  control: (base, state) => {
    console.log('Esse é o state => ', state);
    return {
      ...base,
      background: '#3db0f7',
      cursor: 'not-allowed',
      color: state.isSelected || state.isDisabled ? '#fff' : '#fff',
      padding: '10px 10px 10px 5px',
      height: 62,
      width: '100%',
      marginBottom: '8px',
      // font-family: 'Roboto Slab', serif;
      // match with the menu
      borderRadius: state.isFocused ? '10px 10px 10px 10px' : 10,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#007fff' : 'transparent',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#007fff' : 'none',
      },
    };
  },
  placeholder: defaultStyles => {
    return {
      ...defaultStyles,
      color: '#ffffff',
    };
  },
  menu: (base, state) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base, state) => {
    return {
      ...base,
      backgroundColor: '#3db0f7',
      color: '#fff',
      borderRadius: 0,
      padding: 0,
      border: 0,
    };
  },
};
