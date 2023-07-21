
import { compareDates, getCurrentUser } from '../Utils';

describe('Verify Helper methods', () => {
    it('Verify compareDates method return false when date are same ', () => {
        let dates = {
            start_date: new Date(),
            end_date: new Date()
        };
        expect(compareDates(dates)).toBe(false);
    });
});
describe('getCurrentUser', () => {
    beforeEach(() => {
      localStorage.clear(); // Clear localStorage before each test
    });
  
    test('returns null if localStorage does not have "current_user"', () => {
      const result = getCurrentUser();
      expect(result).toBeNull();
    });
  
    test('returns parsed user object from localStorage', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      localStorage.setItem('current_user', JSON.stringify(user));        
      const result = getCurrentUser();
      expect(result).toEqual(user);
    });
  
    xtest('returns null if there is an error while parsing localStorage data', () => {
      const error = new Error('Parsing error');
      jest.spyOn(localStorage, 'getItem').mockReturnValue('invalid json');
      jest.spyOn(console, 'log').mockImplementation();
  
      const result = getCurrentUser();
  
      expect(result).toBeNull();
      expect(console.log).toContain(
        '>>>>: src/helpers/Utils.js  : getCurrentUser ->',
        error
      );
    });
  });