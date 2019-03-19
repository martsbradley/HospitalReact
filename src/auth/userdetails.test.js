import {UserDetails} from './userdetails.js'
import * as Cookies from 'js-cookie'

jest.mock('js-cookie');

test('authorized and in group', () => {

    Cookies.get.mockReturnValueOnce("loggedIn")
               .mockReturnValueOnce("mygroup");

    let details = new UserDetails();
    const result = details.isAuthorized("mygroup");
    expect(result).toBe(true);

})

test('authorized not in group', () => {

    Cookies.get.mockReturnValueOnce("loggedIn")
               .mockReturnValueOnce("admin");

    let details = new UserDetails();
    const result = details.isAuthorized("user");

    expect(result).toBe(false);
})

test('not authorized but in group', () => {

    Cookies.get.mockReturnValueOnce("")
               .mockReturnValueOnce("admin");

    let details = new UserDetails();
    const result = details.isAuthorized("admin");

    expect(result).toBe(false);
})

test('group arg undefined group', () => {

    Cookies.get.mockReturnValueOnce(undefined)
               .mockReturnValueOnce("admin");

    let details = new UserDetails();
    const result = details.isAuthorized();

    expect(result).toBe(false);
})

test('group arg undefined group but no groups for the user also', () => {

    Cookies.get.mockReturnValueOnce(undefined)
               .mockReturnValueOnce(undefined);

    let details = new UserDetails();
    const result = details.isAuthorized();

    expect(result).toBe(false);
})




