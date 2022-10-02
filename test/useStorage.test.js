import store from './build/useStorage.js'

describe('setItem', function () {
  it('setItem(): should return true if value was stored', function () {
      setItem('test', 1);
      chai.expect(window.localStorage.getItem('test')).to.equal('1');
  });
});

describe('getItem', function () {
  it('getItem(): should return true if value return in correct type', function () {
      setItem('test', 1);
      chai.expect(getItem('test')).to.equal(1);
  });
});

describe('set', function () {
  it('store.set(): should return true if value was stored', function () {
      store.set('storeTest', 1);
      chai.expect(store).to.have.property('storeTest');
      //chai.expect(window.localStorage.getItem('storeTest')).to.equal('1');
  });
});

