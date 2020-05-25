let InitialState = {               
    categories: [],    
}

function MenusReducer(state = InitialState, action) {

  switch (action.type) {
    
    case 'CATEGORIES':        
    let { categoriesData } = action.payload;
      return {
        ...state,              
        categories: categoriesData 
      }; 
        
    default:
      return state;
  }
}

export default MenusReducer;