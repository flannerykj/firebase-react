const CREATE_WORK = 'CREATE_WORK';
const DELETE_WORK = 'DELETE_WORK';
const UPDATE_WORK = 'UPDATE_WORK';

const CREATE_ARTIST = 'CREATE_ARTIST';
const DELETE_ARTIST = 'DELETE_ARTIST';
const UPDATE_ARTIST = 'UPDATE_ARTIST';


export const submitWork = (work) => (
  action: CREATE_WORK,
  work: work
);


