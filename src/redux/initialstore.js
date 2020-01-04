const initialStore =  {"count"       : 10,
                       "patient"     : {  totalItems   : 0,
                                        pageNumber   : 1,
                                        itemsPerPage : 5,
                                        list         : [],
                                        pageLoaded   : false,
                                        current      : { forename: '',
                                                         surname: '',
                                                         dob: '',
                                                         prescription: [],
                                                         rowVersion: 0,
                                                         images: []},
                                       },
                       "error"       : "",
                       "validation"  : [],
                       "userStatus"  : { username          : "",
                                         userAuthenticated : false
                                       }
                      };

export default initialStore;