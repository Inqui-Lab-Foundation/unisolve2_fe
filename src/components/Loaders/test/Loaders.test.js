
import React from 'react';
import DoubleBounce from '../DoubleBounce';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('DoubleBounce Component Tests', () => {
    it('should render DoubleBounce component', () => {
        const component = shallow(<DoubleBounce />);
        expect(component.exists()).toBe(true);
    });

    it('should render DoubleBounce layout', () => {
        const component = shallow(<DoubleBounce />);
        expect(component.getElements()).toMatchSnapshot();
    });
});
