import { shallowMount } from '@vue/test-utils'
import ShipStat from 'components/atoms/ship/stat';

describe('atoms:ShipStat', () => {
    describe('with module enhancement', () => {
        const wrapper = shallowMount(ShipStat, {
            propsData: { stat: 'armor', frameStat: 20, finalStat: 60 },
            mocks: { $t: () => {} }
        });

        it('displays the frame stat', () => {
            expect(wrapper.find('.stat-details > span:first-child').text()).toBe('20');
        });

        it('displays the modular stat', () => {
            expect(wrapper.find('.stat-details > span:last-child').text()).toBe('40');
        });

        it('displays the final stat', () => {
            expect(wrapper.find('strong').text()).toBe('60');
        });
    });

    describe('without module enhancement', () => {
        const wrapper = shallowMount(ShipStat, {
            propsData: { stat: 'armor', frameStat: 20, finalStat: 20 },
            mocks: { $t: () => {} }
        });

        it('displays the frame stat', () => {
            expect(wrapper.find('.stat-details > span:first-child').text()).toBe('20');
        });

        it('does not display further data', () => {
            expect(wrapper.findAll('.stat-details > span').length).toBe(1);
        });

        it('displays the final stat', () => {
            expect(wrapper.find('strong').text()).toBe('20');
        });
    });
});