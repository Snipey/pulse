import Pulse from '../lib';
// import window from '../__mocks__/window';

// A fully structured instance of Pulse with correct data
const library = {
  collections: {
    exampleOne: {
      data: {
        trueTest: true,
        falseTest: false,
        arrayTest: [1, 2, 3, 4, 5],
        objectTest: {
          haha: true
        },
        integerTest: 1995
      },
      persist: [
        'trueTest',
        'falseTest',
        'arrayTest',
        'objectTest',
        'integerTest'
      ],
      filters: {},
      actions: {}
    },
    exampleTwo: {}
  }
};

test('Collections initalized', () => {
  const pulse = new Pulse.Library(library);
  const exec = () => {
    if (!pulse._collections.hasOwnProperty('exampleOne')) return false;
    if (!pulse._collections.hasOwnProperty('exampleTwo')) return false;
    if (!pulse.hasOwnProperty('exampleOne')) return false;
    if (!pulse.hasOwnProperty('exampleTwo')) return false;
    return true;
  };
  expect(exec()).toBe(true);
});
