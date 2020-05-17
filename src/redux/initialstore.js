export const emptyMedicine = { id: -1,
                               name: '',
                               manufacturer: '',
                               deliveryMethod: ''};

export const emptyPatient = { forename     : '',
                              surname      : '',
                              dateOfBirth  : '',
                              prescriptions: [],
                              rowVersion   : 0,
                              images       : []
};

const initialStore =  {"count"       : 10,
                       "patient"     : {totalItems   : 0,
                                        pageNumber   : 1,
                                        itemsPerPage : 5,
                                        list         : [],
                                        pageLoaded   : false,
                                        current      : emptyPatient,
                                       },
                       "medicine"    : {totalItems   : 0,
                                        pageNumber   : 1,
                                        itemsPerPage : 5,
                                        list         : [],
                                        pageLoaded   : false,
                                        current      : emptyMedicine,
                                        filter       : ''
                                       },
                       "error"       : "",
                       "validation"  : [],
                       "userStatus"  : { username          : "",
                                         userAuthenticated : false
                                       },
                       "apiCalls"    : 0,
                      };

export default initialStore;
