import renderer from 'react-test-renderer';
import { shallow, configure, render } from 'enzyme';
import BadgesComp from '../Badges';

describe('BadgesComp Component Tests', () => {
    it('should render BadgesComp component', () => {
        const component = shallow(<BadgesComp />);
        expect(component.exists()).toBe(true);
    });

    it('should render BadgesComp layout', () => {
        const component = shallow(<BadgesComp />);
        expect(component.getElements()).toMatchSnapshot();
    });
    it('renders an h2 tag with the correct text', () => {
        const headingText = 'Available Badges';
        const wrapper = shallow(<BadgesComp />);

        const h2Element = wrapper.find('h2');
        expect(h2Element.exists()).toBe(true);
        expect(h2Element.text()).toEqual(headingText);
    });
});
