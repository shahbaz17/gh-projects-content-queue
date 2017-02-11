import test from 'ava';
import DataStoreHolder from '../lib/data-store-holder';
import sinon from 'sinon';

test.todo('constructor');

test('update updates data stores', async (t) => {
    const updateStore = sinon.spy();
    const h = new DataStoreHolder({
        store: updateStore
    });

    t.false(updateStore.called);

    await h.update();

    t.true(updateStore.calledOnce);
});

test.todo('update fires updated event');