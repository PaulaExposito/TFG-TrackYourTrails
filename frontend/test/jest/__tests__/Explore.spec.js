import { mountFactory, qLayoutInjections, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import Explore from '../../../src/pages/Explore.vue';

describe('Register.vue', () => {
	const wrapper = mountQuasar(Explore, {});

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
		expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="container">
<h4> ¿Qué ruta quieres hacer hoy? </h4>
<div class="cards"></div>
</div>`.replace(/ /g, "").trim());
	})

});