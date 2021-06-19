import { mountFactory, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import TrailCard from '../../../src/components/TrailCard.vue';


const factory = mountFactory(TrailCard, {
  propsData: {
    trail: ["7 cañadas", "id"]
  }
});

describe('TrailCard.vue', () => {

  const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
    expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="card">
<div class="data">
<div class="title"> </div>
<div class="desc"> 0.000 km | 0 horas y 0 minutos </div>
</div>
</div>
  `.replace(/ /g, "").trim());
	})

});