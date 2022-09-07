import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import LandingPage from "../LandingPage";
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';


const LandingComponent = (component: any) => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            {component}
        </BrowserRouter>

    </Provider>
)
test('heading sould be in the document', () => {
    LandingComponent(<LandingPage />);
    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
});


test('heading sould be match the text', () => {
    LandingComponent(<LandingPage />);
    const heading = screen.getByTestId("heading");
    expect(heading).toHaveTextContent("ADD SLOTS NUMBER");
});


test('heading sould be in the document', () => {
    LandingComponent(<LandingPage />);
    const btn = screen.getByTestId("sub-btn");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("add slots");

});


test('heading sould be match the text', () => {
    LandingComponent(<LandingPage />);
    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument()
});
