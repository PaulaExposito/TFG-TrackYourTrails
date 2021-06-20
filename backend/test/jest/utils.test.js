const distance = require('../../services/utils');

const coords1 = { // Toledo
  lat: 39.88532,
  lon: -4.02684
};

const coords2 = { // Bilbao
  lat: 43.25932,
  lon: -2.93217
}


describe("Calculate distance between two points", () => {  
  test("Distance is a number", () => {
    const dist = distance(coords1.lat, coords1.lon, coords2.lat, coords2.lon, "K");
    expect(typeof dist).toBe("number");
  });

  test("Is the same point", () => {
    const dist = distance(coords1.lat, coords1.lon, coords1.lat, coords1.lon, "K");
    expect(dist).toBe(0);
  });

  test("Distance in miles", () => {
    const dist = distance(coords1.lat, coords1.lon, coords2.lat, coords2.lon, "M");
    expect(dist.toFixed(3)).toBe("239.872");
  });

  test("Distance in kilometers", () => {
    const dist = distance(coords1.lat, coords1.lon, coords2.lat, coords2.lon, "K");
    expect(dist.toFixed(3)).toBe("386.036");
  });

  test("Distance in nautical miles", () => {
    const dist = distance(coords1.lat, coords1.lon, coords2.lat, coords2.lon, "N");
    expect(dist.toFixed(3)).toBe("208.304");
  });
});