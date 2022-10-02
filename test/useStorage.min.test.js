import store, { setItem, getItem } from '../build/useStorage.min.js';

describe('min: setItem()', function () {
  it('setItem(): should return true if value was stored', function () {
      setItem('test', 1);
      chai.expect(window.localStorage.getItem('test')).to.equal('1');
  });
});

describe('min: getItem()', function () {
  it('getItem(): should return true if value return in correct type', function () {
      setItem('test', 1);
      chai.expect(getItem('test')).to.equal(1);
  });
});

describe('min: store object', function () {
  it('store set() & get() & clear()', function () {
      store.set('storeTest', 1);
      chai.expect(store).to.have.property('storeTest');
      chai.expect(store.get('storeTest')).to.equal(1);
      chai.expect(store.storeTest).to.equal(1);
      store.storeTest = 2;
      chai.expect(store.storeTest).to.equal(2);
      store.clear();
      chai.expect(store).to.have.property('get');
      chai.expect(store).to.not.have.property('storeTest');
  });
});