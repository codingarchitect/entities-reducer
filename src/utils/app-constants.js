const baseUrl = 'http://localhost:3000';

export default {
  service: {
    urls: {
      base: baseUrl,
      posts: `${baseUrl}/posts/`,
      comments: `${baseUrl}/comments/`,
    },
  },
};
