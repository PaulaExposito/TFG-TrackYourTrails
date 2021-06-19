import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import SignUp from '../../../src/components/SignUp.vue'

import * as All from 'quasar';
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});


// jest.mock("axios", () => {
//     put: () => Promise.resolve('tokensito')
// })


describe('SignUp.vue', () => {

    const localVue = createLocalVue();
    localVue.use(Quasar, { components }); // , lang: langEn
  
    const wrapper = mount(SignUp, {
      localVue,
    });
    const vm = wrapper.vm;


    it('Is login component', () => {
      expect(wrapper.text()).toMatch("Regístrate");
    })

    test('mounts without errors', () => {
      expect(wrapper).toBeTruthy();
    });
  
    test('html to contain', () => {
      expect(wrapper.html()).not.toBe(null);
    })
})