import { mountFactory } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex';
import Events from '../../../src/pages/Events.vue';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = mountFactory(Events, {
  mount: {
    localVue,
    store: new Vuex.Store({
			state: {
				"username": null,
				"token": null
			}
		}),
  },
	// quasar: { components: { QBtn }}
});

describe('Events.vue', () => {
	// const wrapper = mountQuasar(Events, {});
	const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
		expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="container">
<div class="content">
<div class="header">
<h3> Eventos </h3>
<createevent-stub></createevent-stub>
</div>
<hr>
<h4>Mis eventos</h4>
<div class="cards"></div>
<h4>Todos los eventos</h4>
<div class="cards"></div>
</div>
</div>`.replace(/ /g, "").trim());
	})

});