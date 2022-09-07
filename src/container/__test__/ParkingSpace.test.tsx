import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import ParkingSpace from "../ParkingSpace";
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';


const ParkSpaceComponent = (component: any) => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            {component}
        </BrowserRouter>

    </Provider>
)
test('heading sould be in the document', () => {
    ParkSpaceComponent(<ParkingSpace />);
    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
});


test('heading sould be match the text', () => {
    ParkSpaceComponent(<ParkingSpace />);
    const heading = screen.getByTestId("heading");
    expect(heading).toHaveTextContent("Parking Slots");
});

test('button to in the document', () => {
    ParkSpaceComponent(<ParkingSpace />);
    const btn = screen.getByTestId("allocat-btn");
    expect(btn).toBeInTheDocument()
});
