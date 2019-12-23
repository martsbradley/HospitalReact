const initialStore =  {"count"   : 10,
                       "patient" :{  totalItems   : 0,
                                     pageNumber   : 1,
                                     itemsPerPage : 5,
                                     list         : [],
                                     pageLoaded   : false},
                      };


console.log("initialStore " + typeof(initialStore["dime"]));
console.log("initialStore " + Array.isArray(initialStore["dime"]));

export default initialStore;