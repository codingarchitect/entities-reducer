const post1 = {
  status: 'complete',
  byId: {
    1: {
      id: 1,
      title: 'json-server',
      author: 'typicode',
    },
  },
  allIds: [1],
  message: {
    type: 'success',
    text: 'Loaded',
  },
};

const postError = {
  status: 'error',
  byId: {},
  allIds: [],
  message: {
    type: 'error',
    text: 'cannot GET /posts/2 (404)',
  },
};

const blog = {
  posts: [
    { id: 1, title: 'json-server', author: 'typicode' },
  ],
  comments: [
    { id: 1, body: 'some comment', postId: 1 },
  ],
  profile: { name: 'typicode' },
};

export default {
  post1,
  postError,
  blog,
};
