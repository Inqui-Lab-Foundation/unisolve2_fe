let store = {};

const localStorageMock = {
  getItem: jest.fn((key) => store[key] || null),
  setItem: jest.fn((key, value) => {
    store[key] = value.toString();
  }),
  removeItem: jest.fn((key) => {
    delete store[key];
  }),
  clear: jest.fn(() => {
    store = {};
  }),
};

export default localStorageMock;
