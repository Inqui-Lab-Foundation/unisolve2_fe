import React from 'react';
import { shallow } from 'enzyme';
import { Container, Row, Col } from 'reactstrap';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders a div with class "Footer"', () => {
    const wrapper = shallow(<Footer />);
    
    const footerDiv = wrapper.find('.Footer');
    expect(footerDiv.exists()).toBe(true);
  });

  test('renders a Container component', () => {
    const wrapper = shallow(<Footer />);
    
    const container = wrapper.find(Container);
    expect(container.exists()).toBe(true);
  });

  test('renders a Row component with class "py-5"', () => {
    const wrapper = shallow(<Footer />);
    
    const row = wrapper.find(Row);
    expect(row.exists()).toBe(true);
    expect(row.hasClass('py-5')).toBe(true);
  });

  test('renders a Col component with md={12}', () => {
    const wrapper = shallow(<Footer />);
    
    const col = wrapper.find(Col);
    expect(col.exists()).toBe(true);
    expect(col.prop('md')).toBe(12);
  });

  test('renders a paragraph with copyright text', () => {
    const wrapper = shallow(<Footer />);
    
    const paragraph = wrapper.find('p');
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.text()).toContain('UNISOLVE, UNICEF');    
    expect(paragraph.text()).toContain('All Rights Reserved.');
  });
});
