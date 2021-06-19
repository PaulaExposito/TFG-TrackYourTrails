// import { mountFactory, qLayoutInjections, mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
// import Trail from '../../../src/pages/Trail.vue';
// // import 'leaflet/dist/leaflet.css'

// const factory = mountFactory(Trail, {})

describe('Trail.vue', () => {

  test("nothing", () => {
    expect(true).toBe(true);
  });

  // 	// const wrapper = mountQuasar(Trail, {});
//   const wrapper = factory();

// 	test('mounts without errors', () => {
// 		expect(wrapper).toBeTruthy();
// 	});

// 	test('html to contain', () => {
// 		expect(wrapper.html().replace(/ /g, "").trim()).toBe(`
// <q-page-stub padding="true" class="flex bg">
// <q-header-stub value="true" revealoffset="250" elevated="true" heighthint="98" class="bg-primary text-white q-pt-sm q-pl-sm">
// <q-toolbar-title-stub>Track Your Trails</q-toolbar-title-stub>
// <q-tabs-stub value="login" align="center" breakpoint="600">
// <q-tab-stub ripple="true" label="LogIn" name="login"></q-tab-stub>
// <q-tab-stub ripple="true" label="SignUp" name="signup"></q-tab-stub>
// </q-tabs-stub>
// </q-header-stub>
// <login-stub></login-stub>
// </q-page-stub>`.replace(/ /g, "").trim());
});
