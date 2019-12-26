const initialStore =  {"count"   : 10,
                       "patient" :{  totalItems   : 0,
                                     pageNumber   : 1,
                                     itemsPerPage : 5,
                                     list         : [],
                                     pageLoaded   : false},
                       "error"     : "",
                       "userStatus": { username          : "",
                                       userAuthenticated : false}
                      };

export default initialStore;