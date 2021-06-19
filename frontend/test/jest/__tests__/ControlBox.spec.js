import { mountFactory, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex';
import ControlBox from '../../../src/components/ControlBox.vue';
import { createLocalVue } from '@vue/test-utils';
import { QDialog, QCard, QCardSection, QSpace, QForm, QInput, ClosePopup, QBtn } from 'quasar';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = mountFactory(ControlBox, {
  mount: {
    localVue,
    store: new Vuex.Store({
      state: {
				"username": null,
				"token": null,
        "tracking": false,
        "lastPoint": [0, 0]
			}
		}),
  },
  quasar: {
    components: {
      QDialog, QCard, QCardSection, QSpace, QForm, QInput, QBtn
    },
    directives: {
      ClosePopup
    }
  },
});

describe('ControlBox.vue', () => {

  const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
    expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="container flex-column">
<div class="flex-row visibility"></div>
<div class="flex-row data">
<div class="time">Tiempo <br> 00:00:00 </div>
<div class="distance"> Distancia <br> 0.000 km</div>
</div>
<div class="subtitle">Para usar esta funcionalidad tienes que estar autenticado</div>
<q-dialog-stub position="standard">
<q-card-stub tag="div" class="card">
<q-card-section-stub tag="div" class="row items-center q-pb-none">
<div class="text-h6">Ruta finalizada</div>
<q-space-stub></q-space-stub>
<q-btn-stub ripple="true" align="center" icon="close" round="true" flat="true" dense="true"></q-btn-stub>
</q-card-section-stub>
<q-card-section-stub tag="div">
<q-form-stub class="q-gutter-md form">
<p class="subtitle">Distancia</p>
<p class="data">0.000 km</p>
<p class="subtitle">Duración</p>
<p class="data">00:00:00</p>
<q-input-stub lazyrules="true" label="Nombre de la ruta" filled="true" type="text" id="title"></q-input-stub>
<q-input-stub lazyrules="true" label="Descripción de la ruta" filled="true" type="text" id="description"></q-input-stub>
<div class="form-btn">
<q-btn-stub ripple="true" align="center" type="submit" label="Guardar" icon="check" color="primary" id="submit"></q-btn-stub>
</div>
</q-form-stub>
</q-card-section-stub>
</q-card-stub>
</q-dialog-stub>
</div>
  `.replace(/ /g, "").trim());
	})

});