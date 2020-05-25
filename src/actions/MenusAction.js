import Config from './../../Config';//Get the API_KEY_URL

/*Fetch the List of Categories*/
export const categoriesList = (id) => dispatch => {           
  
        fetch(''+Config[0].API_KEY_URL+'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `                
                query{
                    category(id: 2) {
                      children_count
                      children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                        children {
                          id
                          level
                          name
                          path
                          url_path
                          url_key
                        }
                      }
                    }
                  }
                `,
                variables: null
            })
        }).then(r => r.json()).then((result) => {
          console.log(result.data.category);
        let datas = {
                      categoriesData: result.data.category,
                    }
        return dispatch({
            type: 'CATEGORIES',
            payload: datas
        });
      }).catch((error) => {
        console.error(error);
        let datas = {
            categoriesData: []
          }
        return dispatch({
            type: 'CATEGORIES',
            payload: datas
        });
    });

};

