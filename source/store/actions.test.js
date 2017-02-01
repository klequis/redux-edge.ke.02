import test from 'tape';
import * as actions from './actions';

test('action creator | addNote :: Create correct action',
({ deepEqual, end }) => {
    const actualAction = actions.addNote('Hi', 'id-123', 1);
    const expectedAction = {
      type: 'app/addNote',
      payload: {
        id: 'id-123',
        content: 'Hi',
        timestamp: 1,
      },
    };
    deepEqual(actualAction, expectedAction);
    end();
  }
);
