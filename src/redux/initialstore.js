import {emptyPatient} from '../patient/emptyPatient';

const initialStore =  {"count"       : 10,
                       "patient"     : {  totalItems   : 0,
                                        pageNumber   : 1,
                                        itemsPerPage : 5,
                                        list         : [],
                                        pageLoaded   : false,
                                        current      : emptyPatient,
                                       },
                       "error"       : "",
                       "validation"  : [],
                       "userStatus"  : { username          : "",
                                         userAuthenticated : false
                                       }
                      };

export default initialStore;
