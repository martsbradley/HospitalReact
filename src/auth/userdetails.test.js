import {UserDetails} from './userdetails.js'
import  * as cook from '../cookie.js'

cook.getCookie = jest.fn();

test('auth checks cookie authOisLoggedIn', () => {
    let details = new UserDetails();
    details.isAuthorized();
    expect(cook.getCookie).toHaveBeenCalledWith('authOisLoggedIn');
})
