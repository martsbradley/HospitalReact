import {UserDetails} from './userdetails.js'
import  * as cook from '../cookie.js'


test('authorized and in group', () => {

    cook.getCookie = jest.fn()
                         .mockImplementationOnce(() => {return true})
                         .mockImplementationOnce(() => {return "mygroup"});

    let details = new UserDetails();
    const result = details.isAuthorized("mygroup");

    expect(result).toBe(true);
})

test('authorized not in group', () => {

    cook.getCookie = jest.fn()
                         .mockImplementationOnce(() => {return true})
                         .mockImplementationOnce(() => {return "admin"});

    let details = new UserDetails();
    const result = details.isAuthorized("user");

    expect(result).toBe(false);
})

test('not authorized but in group', () => {

    cook.getCookie = jest.fn()
                         .mockImplementationOnce(() => {return false})
                         .mockImplementationOnce(() => {return "admin"});

    let details = new UserDetails();
    const result = details.isAuthorized("admin");

    expect(result).toBe(false);
})

test('group arg undefined group', () => {

    cook.getCookie = jest.fn()
                         .mockImplementationOnce(() => {return false})
                         .mockImplementationOnce(() => {return "admin"});

    let details = new UserDetails();
    const result = details.isAuthorized();

    expect(result).toBe(false);
})

test('group arg undefined group but no groups for the user also', () => {

    cook.getCookie = jest.fn()
                         .mockImplementationOnce(() => {return false})
                         .mockImplementationOnce(() => {return undefined});

    let details = new UserDetails();
    const result = details.isAuthorized();

    expect(result).toBe(false);
})




