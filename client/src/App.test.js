import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('renders Quiz App made with React and Redux', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Quiz App made with React and Redux/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.App')).toEqual(true);
  });
});