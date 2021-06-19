import { mountFactory, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex';
import CreateEvent from '../../../src/components/CreateEvent.vue';
import { createLocalVue } from '@vue/test-utils';
import { QBtn, QDialog, QCard, QCardSection, QSpace, QForm, QInput, ClosePopup } from 'quasar';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = mountFactory(CreateEvent, {
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
      QBtn, QDialog, QCard, QCardSection, QSpace, QForm, QInput
    },
    directives: {
      ClosePopup
    }
  },
});

describe('CreateEvent.vue', () => {

  const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
    expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="q-pa-md q-gutter-sm container">
<q-btn-stub ripple="true" align="center" label="Crear evento" icon="add" color="primary"></q-btn-stub>
<q-dialog-stub position="standard">
<q-card-stub tag="div" class="card">
<q-card-section-stub tag="div" class="row items-center q-pb-none">
<div class="text-h6">Crear un evento</div>
<q-space-stub></q-space-stub>
<q-btn-stub ripple="true" align="center" icon="close" round="true" flat="true" dense="true"></q-btn-stub>
</q-card-section-stub>
<q-card-section-stub tag="div">
<q-form-stub class="q-gutter-md form">
<q-input-stub lazyrules="true" label="Nombre del evento" filled="true" type="text" id="title"></q-input-stub>
<q-input-stub lazyrules="true" hint="Fecha del evento" filled="true" type="date" id="date"></q-input-stub>
<q-input-stub lazyrules="true" label="Equipamiento" filled="true" type="text" id="equipment"></q-input-stub>
<div class="form-btn">
<q-btn-stub ripple="true" align="center" type="submit" label="Añadir" icon="check" color="primary" id="submit"></q-btn-stub>
<q-btn-stub ripple="true" align="center" label="Cancelar" icon="close" flat="true" color="primary" id="cancel" class="q-ml-sm"></q-btn-stub>
</div>
</q-form-stub>
</q-card-section-stub>
</q-card-stub>
</q-dialog-stub>
</div>
  `.replace(/ /g, "").trim());
	})

});