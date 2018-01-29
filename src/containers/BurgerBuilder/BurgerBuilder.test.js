import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it("should render <BuildControlls /> when receive ingredients", () => {
        wrapper.setProps({ings: {salad: 0, }});
        expect(wrapper.find(BuildControlls)).toHaveLength(1);
    });

});