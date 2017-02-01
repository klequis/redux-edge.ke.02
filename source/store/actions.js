import { v4 } from 'uuid';

export const addNote = (content = '', id = v4(), timestamp = Date.now()) => ({
  type: 'app/addNote',
  payload: {
    id,
    content,
    timestamp,
  },
});
