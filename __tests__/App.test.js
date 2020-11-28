import React from 'react';
import App from '../App.js';
import renderer from 'react-test-renderer';
import { render } from 'react-dom';

it('renders correctly',()=>{
    renderer.create(<App/>);
});