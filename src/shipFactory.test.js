import { createShip } from './shipFactory.js';

test('should return ship object', () => {
  const expected = {
    shipLength: 4,
    shipSunk: false,
  };

  expect(createShip(4)).toMatchObject(expected);
});

test('isSunk function runs when whereHit length is equal to shipLength', () => {
  const expectedShip = {
    shipLength: 4,
    shipSunk: true,
    whereHit: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  };

  let testShip = createShip(4);

  testShip.whereHit = [
    [1, 1],
    [1, 2],
    [1, 3],
  ];

  testShip.hit([1, 4]);

  expect(testShip).toMatchObject(expectedShip);
});
