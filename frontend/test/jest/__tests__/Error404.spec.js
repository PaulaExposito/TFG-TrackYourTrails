import { mountFactory, qLayoutInjections, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, createLocalVue, shallowMount } from "test-utils";
import Error404 from '../../../src/pages/Error404.vue';
import { QBtn } from 'quasar';
  
// const factory = mountFactory(Error404, {
//     mount: {
//         provide: qLayoutInjections(),
//     },
// });

describe('Error404.vue', () => {

	// const localVue = createLocalVue();
	// localVue.use(Quasar, { components: ["q-btn"] }); // , lang: langEn

	// const wrapper = shallowMount(Error404, {
	//   localVue,
	// });
	// const vm = wrapper.vm;
	
	// it('rendering index', () => {
	//     // const wrapper = mount(PageIndex, {localVue});
	//     // const vm = wrapper.vm;

	//     // console.log("hpli " + wrapper.html());
	//     // console.log("vm " + vm.html());
	//     // console.log("fdafa " + factory().vm)         // ESTE HACE ALGO
	//     // console.log("fdafa " + JSON.stringify(factory().vm))
	//     // console.log("fdafa " + factory.mountFactory)
	//     // console.log("fdafa " + factory.mount)

	//     expect(true).toBe(true);

	// });

	const wrapper = mountQuasar(Error404, {
		quasar: {
			components: {
				QBtn,
			},
		},
	});

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
		expect(wrapper.html().replace(/ /g, "")).toBe(`
<div class="fullscreen text-white text-center q-pa-md flex flex-center bg-color">
<div>
<div style="font-size: 30vh;">
404
</div>
<div class="text-h2" style="opacity: 0.4;">
Oops. Nothing here...
</div>
<q-btn-stub ripple="true" align="center" to="/" label="Ir a inicio" unelevated="true" color="white" textcolor="blue" nocaps="true" class="q-mt-xl"></q-btn-stub>
</div>
</div>
		`.replace(/ /g, "").trim());
	})

});