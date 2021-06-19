import { mountFactory, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex';
import EventCard from '../../../src/components/EventCard.vue';
import { createLocalVue } from '@vue/test-utils';
import { QDialog, QCardSection, QCard, QSpace, QBtn, QForm, ClosePopup } from 'quasar';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = mountFactory(EventCard, {
  mount: {
    localVue,
    store: new Vuex.Store({
      state: {
				"username": null,
				"token": null,
			}
		}),
  },
  quasar: {
    components: {
      QDialog, QCardSection, QCard, QSpace, QBtn, QForm
    },
    directives: {
      ClosePopup
    }
  },
  propsData: {
    id: ['title', 'id'],
  },
});

describe('EventCard.vue', () => {

  const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
    expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="container"><img src="../assets/event_logo.png">
<p class="card-name">title</p>
<q-dialog-stub position="standard">
<q-card-stub tag="div" class="card">
<q-card-section-stub tag="div" class="row items-center q-pb-none">
<div class="text-h6"></div>
<q-space-stub></q-space-stub>
<q-btn-stub ripple="true" align="center" icon="close" round="true" flat="true" dense="true"></q-btn-stub>
</q-card-section-stub>
<q-card-section-stub tag="div">
<q-form-stub class="q-gutter-md form">
<p class="date"></p>
<p class="subtitle">Equipamiento</p>
<p class="data"></p>
<p class="subtitle">Van a ir...</p>
<p class="data"></p>
<div class="form-btn">
<q-btn-stub ripple="true" align="center" type="submit" label="Me apunto" icon="check" color="primary" id="submit"></q-btn-stub>
</div>
</q-form-stub>
</q-card-section-stub>
</q-card-stub>
</q-dialog-stub>
</div>
  `.replace(/ /g, "").trim());
	})

});