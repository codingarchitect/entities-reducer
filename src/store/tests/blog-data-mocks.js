import testData from './blog-test-data';

export default function fixtures(match) {
  switch (match[1]) {
    case '/posts/1': {
      return testData.blog.posts.find(p => p.id === 1);
    }
    case '/posts/2': {
      return {
        error: {
          message: 'cannot GET /posts/2 (404)',
        },
      };
    }
    default:
      break;
  }
  return {};
}
