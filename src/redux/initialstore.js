import {emptyPatient} from '../patient/emptyPatient';

const emptyMedicine = { medicineId: -1,
                        name: '',
                        manufacturer: '',
                        deliveryMethod: ''};

const initialStore =  {"count"       : 10,
                       "patient"     : {  totalItems   : 0,
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
                                       },
                       "error"       : "",
                       "validation"  : [],
                       "userStatus"  : { username          : "",
                                         userAuthenticated : false
                                       },
                       "apiCalls"    : 0,
                      };

export default initialStore;
