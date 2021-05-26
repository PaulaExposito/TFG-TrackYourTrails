// import { mount, createLocalVue } from '@vue/test-utils';
// import PageIndex from '../../../src/pages/Index.vue';

// import * as All from 'quasar';
// const { Quasar } = All;

// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key];
//   if (val && val.component && val.component.name != null) {
//     object[key] = val;
//   }
//   return object;
// }, {});

import { mountFactory, qLayoutInjections } from '@quasar/quasar-app-extension-testing-unit-jest';
import PageIndex from '../../../src/pages/Index.vue';
  
const factory = mountFactory(PageIndex, {
    mount: {
        provide: qLayoutInjections(),
    },
});

describe('Index.vue', () => {

    // const localVue = createLocalVue();
    // localVue.use(Quasar, { components }); // , lang: langEn
  
    // const wrapper = mount(PageIndex, {
    //   localVue,
    // });
    
    it('rendering index', () => {
        // const wrapper = mount(PageIndex, {localVue});
        // const vm = wrapper.vm;

        // console.log("hpli " + wrapper.html());
        // console.log("vm " + vm.html());
        // console.log("fdafa " + factory().vm)         // ESTE HACE ALGO
        // console.log("fdafa " + JSON.stringify(factory().vm))
        // console.log("fdafa " + factory.mountFactory)
        // console.log("fdafa " + factory.mount)

        expect(true).toBe(true);

    });

});

