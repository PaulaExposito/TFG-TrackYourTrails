import { mountFactory } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex';
import Profile from '../../../src/pages/Profile.vue';
import { createLocalVue } from '@vue/test-utils';
import { QAvatar, QForm, QInput, QBtn } from 'quasar';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = mountFactory(Profile, {
  mount: {
    localVue,
    store: new Vuex.Store({
			state: {
				"username": null,
				"token": null
			}
		}),
  },
  quasar: {
    components: {
      QAvatar, QForm, QInput, QBtn
    },
  },
});

describe('Profile.vue', () => {
	const wrapper = factory();

	test('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	test('html to contain', () => {
		expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
<div class="container">
<div class="data">
<div class="flex">
<div class="q-pa-md q-gutter-sm image">
<q-avatar-stub size="150px"><img src="https://img.icons8.com/color/452/avatar.png"></q-avatar-stub>
</div>
<div class="names">
<h3></h3>
<h4></h4>
</div>
</div>
<div class="statistics flex">
<div class="box">Distancia<div class="number"> m</div>
</div>
<div class="line"></div>
<div class="box">Tiempo<div class="number"> min</div>
</div>
<div class="line"></div>
<div class="box">Rutas<div class="number"></div>
</div>
</div>
</div>
<q-form-stub class="q-gutter-md form">
<q-input-stub label="Username" filled="true" square="true" type="text"></q-input-stub>
<q-input-stub label="Correo electrónico" filled="true" square="true" type="text"></q-input-stub>
<q-input-stub label="Nombre" filled="true" square="true" type="text"></q-input-stub>
<q-input-stub label="Apellidos" filled="true" square="true" type="text"></q-input-stub>
<q-input-stub label="Contraseña" filled="true" square="true" type="password"></q-input-stub>
<q-input-stub label="Teléfono" filled="true" square="true" type="text"></q-input-stub>
<div class="form-btn">
<q-btn-stub ripple="true" align="center" type="submit" label="Guardar cambios" color="secondary" id="modify"></q-btn-stub>
<q-btn-stub ripple="true" align="center" type="reset" label="Reset" flat="true" color="secondary" id="reset" class="q-ml-sm"></q-btn-stub>
</div>
</q-form-stub>
<div class="logout-btn">
<q-btn-stub ripple="true" align="center" label="Cerrar sesión" rounded="true" color="primary" dense="true" id="exit-btn"></q-btn-stub>
<q-btn-stub ripple="true" align="center" label="Eliminar cuenta" rounded="true" color="dark" dense="true" id="delete-btn"></q-btn-stub>
</div>
</div>`.replace(/ /g, "").trim());
	})

});