import React from 'react';
import { render, waitForElement, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import QuizForm from './QuizForm';
import { getQuestions } from '../../../actions/questions';

const mockStore = configureStore([]);
describe('My Connected React-Redux Component', () => {
  let store;
  let component;
  afterEach(cleanup)
  beforeEach(() => {
    store = mockStore({
      questions: {
        questions: []
      },
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <QuizForm />
      </Provider>
    );
  });
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should dispatch an action on button click', async () => {
    
    const quizCategory = await waitForElement(() => getByTestId("category-test-quiz-form"))
    console.log('QUIZ CATEGORYYYYYYY', quizCategory);

    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });

    renderer.act(() => {
      component.root.findByType('input')
        .props.onChange({ target: { value: 2 } });
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      getQuestions({ payload: 'sample text' })
    );
  });
});