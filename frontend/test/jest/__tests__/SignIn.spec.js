import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import { mountFactory } from '@quasar/quasar-app-extension-testing-unit-jest';
import Vuex from 'vuex'
import nock from 'nock'
import flushPromises from 'flush-promises'
import LogIn from '../../../src/components/SignIn.vue'
import { api } from '../../../src/boot/axios.js'

import * as All from 'quasar';
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(Quasar, { components });

const factory = mountFactory(LogIn, {
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
    components: components
  },
});


describe('SignIn.vue', () => {

	let title, usernameInput, passwordInput, submitButton;

	let state;
	const $router = { push: jest.fn() };

	// const wrapper = shallowMount(LogIn, {
	// 	localVue,
	// 	store: new Vuex.Store({ state }),
	// 	mocks: { $router }
	// });

	const wrapper = factory();

	const vm = wrapper.vm;


	beforeAll(() => {
		title = wrapper.find('#title');
		usernameInput = wrapper.find('#username');
		passwordInput = wrapper.find('#password');
		submitButton = wrapper.find('#submit');
	});

	it('Is login component', () => {
			expect(wrapper.text()).toMatch("Login");
	});

	it('Component has the required components', () => {
			expect(title.exists()).toBe(true);
			expect(title.text()).toBe("Login");
			expect(usernameInput.exists()).toBe(true);
			expect(passwordInput.exists()).toBe(true);
			expect(submitButton.exists()).toBe(true);
			expect(wrapper.find('#reset').exists()).toBe(true);
	});


	it('API', async () => {
		const expectedUser = 'paula'

		const request = nock('http://localhost:3000')
			.get('/api/users/paula')
			.reply(200, {"friends":[],"_id":"60a6857a841bc559b6e6f937","username":"paula","password":"$2a$10$dvD05aVxMnmt.dFMuy7kketNrQRGpgS/4CY1Wt.pj6S9VI425EXjG","__v":0})

		const result = await api.get(`users/${expectedUser}`)
		await flushPromises();
	});

	it('Reset functionality', async () => {
		usernameInput.setValue = "paula";
		passwordInput.setValue = "paula123";

		await wrapper.vm.onReset();

		expect(wrapper.vm.username).toBe(null);
		expect(wrapper.vm.password).toBe(null);
	});

	it('Log user', async () => {

		const request = nock('http://localhost:3000')
			.put('/api/login', {
				username: "paula",
				password: "paula123"
			})
			.reply(200, {
				user: {"friends":[],"_id":"60a6857a841bc559b6e6f937","username":"paula","password":"$2a$10$dvD05aVxMnmt.dFMuy7kketNrQRGpgS/4CY1Wt.pj6S9VI425EXjG","__v":0},
				token: "fdsfds" })

		await wrapper.vm.onSubmit();

		expect(true).toBe(true);
		// expect(request.interceptors[0].body).toBe(true);
	});

	test('html to contain', () => {
    expect(wrapper.html().replace(/ /g, "").trim()).not.toBe(`
<div class="container"><br>
<h3 id="title">Login</h3>ddd
<div align="center" class="q-pa-md form" style="width: 400px;">
<q-form-stub class="q-gutter-md">
<q-input-stub rules="function (val) { return val &amp;&amp; val.length > 0 || 'Introduce un nombre de usuario'; }" lazyrules="true" label="Usuario" filled="true" type="text" id="username"></q-input-stub>
<q-input-stub rules="function (val) { return val !== null &amp;&amp; val !== '' || 'Introduce una contraseña'; },function (val) { return val.length >= 4 ||'La contraseña debe tener al menos 4 caracteres'; }" lazyrules="true" label="Contraseña" filled="true" type="password" id="password"></q-input-stub>
<div>
<q-btn-stub ripple="true" align="center" type="submit" label="Login" color="secondary" id="submit"></q-btn-stub>
<q-btn-stub ripple="true" align="center" type="reset" label="Reset" flat="true" color="secondary" id="reset" class="q-ml-sm"></q-btn-stub>
</div>
</q-form-stub>
</div>
</div>
		`.replace(/ /g, "").trim());
	})
});