import {loadMedicines,savePrescription} from './medicine-api';
import fetchMock from 'fetch-mock';

describe('medicines-api', () => {

    let fail = () => {
        throw new Error('I have failed you, Anakin')
    };

    it('Neg: loadMedicines no information in body', async (done) => {

        fetchMock.mock('*', 200);

        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            await loadMedicines(pageToShow, itemsOnPage);
            fail();
        }
        catch (e){
          //console.log("Resp");
          //console.log(resp);
          //console.log("e");
          //console.log(e);
            done();
            fetchMock.reset();
        }
        //resp.then( (r) => {console.log(`then ${r}`);})
            //.catch((e) => {console.log(`catch ${e}`);})
    });

    it('Neg: 404 loadMedicines', async (done) => {

        fetchMock.mock('*', 404);

        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            await loadMedicines(pageToShow, itemsOnPage);
            fail();
        }
        catch (e){
            // Should reach here because 404 is not handled
            // by the normal path.
            //console.log(e.message);
            done();
            fetchMock.reset();
        }
    });

    it('Neg: http 400 loadMedicines without validation errors', async (done) => {

        fetchMock.mock('*', 400);

        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            await loadMedicines(pageToShow, itemsOnPage);
            fail();
        }
        catch (e){ 
            //console.log(e.message);
            expect(e.message).toContain('Unexpected end of JSON input');
            fetchMock.reset();
        }
        done();
    });
    it('Pos: http 400 loadMedicines include validation error', async (done) => {

        fetchMock.mock('*', { status: 400,
                              body: {label: 'marty',
                                      message: 'woz here'}});
        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            const result = await loadMedicines(pageToShow, itemsOnPage);
            expect(result.isError).toEqual(true);
            expect(result.data.label).toEqual('marty');
            fetchMock.reset();
        }
        catch (e){ 
            fail();
            //console.log(e.message);
            //expect(e.message).toContain(');
        }
        done();
    });
    it('Pos: http 200 loadMedicines', async (done) => {

        const pageInfo = {page: 1,
                          pageSize: 5,
                          nameFilter: "",
                          _dataSize: 20}

        fetchMock.mock('*', { status: 200,
                              body: {'medicines': [],
                                     'pageInfo': pageInfo}});
        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            const result = await loadMedicines(pageToShow, itemsOnPage);
            expect(result.isError).toEqual(false);
            //console.log(result);
            expect(result.data.medicines).toEqual([]);
            
            expect(result.data.total).toEqual(20);
           
            fetchMock.reset();
        }
        catch (e){ 
            //console.log('e');
            //console.log(e);
            fail();
            //expect(e.message).toContain(');
        }
        done();
    });

    const prescription = {any: "thing",
                          goes: "here",}

    it('Pos: http 200 savePrescription', async (done) => {

 
        fetchMock.mock('*', { status: 200,
                              body: {}});
        try {
            const result = await savePrescription(prescription);

            expect(result.isError).toEqual(false);
            expect(result.data).toEqual({});
            
            fetchMock.reset();
        }
        catch (e){ 
            fail();
        }
        done();
    });

    it('Neg: http 400 savePrescription', async (done) => {
        const validationMsg = {msg: "This is invalid"};

        fetchMock.mock('*', { status: 400,
                              body: validationMsg});
        try {
            const result = await savePrescription(prescription);

            expect(result.isError).toEqual(true);
            expect(result.data).toEqual(validationMsg);
            
            fetchMock.reset();
        }
        catch (e){ 
            fail();
        }
        done();
    });
});
