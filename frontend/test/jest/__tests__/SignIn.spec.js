import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
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


// jest.mock("axios", () => {
//     put: () => Promise.resolve('tokensito')
//     login: () => Promise.resolve(true)
// });

// const api_login = () => Promise.resolve(true)


const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(Quasar, { components });


describe('SignIn.vue', () => {

	let title, usernameInput, passwordInput, submitButton;

	let state;
    const $router = { push: jest.fn() };

    const wrapper = shallowMount(LogIn, {
      localVue,
	  store: new Vuex.Store({ state }),
      mocks: { $router }
    });
    const vm = wrapper.vm;


	beforeAll(() => {
		title = wrapper.find('#title');
		usernameInput = wrapper.find('#username');
		passwordInput = wrapper.find('#password');
		submitButton = wrapper.find('#submit');
	});


	// beforeEach(() => {
	// 	state = { ...initialState };
	// });

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

		// console.log(request.interceptors[0].body)

		expect(result.data).toEqual({"friends":[],"_id":"60a6857a841bc559b6e6f937","username":"paula","password":"$2a$10$dvD05aVxMnmt.dFMuy7kketNrQRGpgS/4CY1Wt.pj6S9VI425EXjG","__v":0})
		expect(request.isDone()).toBe(true);
	})

    // it('Login succesfull and redirect to homepage', async () => {
    //   api_login.mockResolvedValue();

	//   wrapper.find("#submit").trigger('click');
	//   expect(api_login).toBeCalled();
	//   await wrapper.vm.$nextTick();

	//   expect($router.push).toBeCalledWith('/');
    // });

    // it('Login a user that does not exist', async () => {

	// 	usernameInput.setValue = "paula"
	// 	passwordInput.setValue = "paula123"

    //     // await usernameInput.setValue("tester");
    //    	// await passwordInput.setValue("tester123");
	// 	await submitButton.trigger('click');
        
	// 	const request = await nock('http://localhost:3000')
	// 		.put('/api/login/')
	// 		.reply(200, {"friends":[],"_id":"60a6857a841bc559b6e6f937","username":"paula","password":"$2a$10$dvD05aVxMnmt.dFMuy7kketNrQRGpgS/4CY1Wt.pj6S9VI425EXjG","__v":0})

		
	// 	await flushPromises();

	// 	console.log($router.push)

	// 	expect($router.push).toBeCalledWith('/');

    //     // expect(wrapper.vm.token).toBe('tokensito');
    // });


	it('Reset dunctionality', async () => {
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
});