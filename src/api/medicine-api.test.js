import {loadMedicines} from './medicine-api';
import fetchMock from 'fetch-mock';

describe('medicines-api', () => {

    let fail = () => {
        throw new Error('I have failed you, Anakin')
    };

    it('Neg: no information in body', async (done) => {

        fetchMock.mock('*', 200);

        let resp;
        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            resp = await loadMedicines(pageToShow, itemsOnPage);
            fail();
        }
        catch (e){
            console.log("Resp");
            console.log(resp);
            console.log("e");
            console.log(e);
            done();
            fetchMock.reset();
        }
        //resp.then( (r) => {console.log(`then ${r}`);})
            //.catch((e) => {console.log(`catch ${e}`);})
    });

    it('Neg: 404', async (done) => {

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
            console.log(e.message);
            done();
            fetchMock.reset();
        }
    });

    it('Neg: http 400, without validation errors', async (done) => {

        fetchMock.mock('*', 400);

        try {
            const pageToShow = 1;
            const itemsOnPage = 5;
            await loadMedicines(pageToShow, itemsOnPage);
            fail();
        }
        catch (e){ 
            console.log(e.message);
            expect(e.message).toContain('Unexpected end of JSON input');
            fetchMock.reset();
        }
        done();
    });
    it('Pos: http 400, include validation error', async (done) => {

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
            console.log(e.message);
            //expect(e.message).toContain(');
        }
        done();
    });
});