import postActions from './post-actions';
import commentActions from './comment-actions';
import testData from '../blog-test-data';

describe('makeActionCreators', () =>{
  const validationPredicate = {
    predicate1: () => true,
    predicate2: () => false,
  };
  it('should be able to create loadXXXAction', () => {
    const loadPostsActionCreator = postActions.creators.loadPosts;
    expect(loadPostsActionCreator(1, validationPredicate)).toEqual({
      type: 'LOAD_POSTS',
      payload: {
        id: 1,
        validationPredicate,
      },
    });
  });
  it('should be able to create loadXXXCompletedAction', () => {
    const loadPostsCompletedActionCreator = postActions.creators.loadPostsCompleted;
    expect(loadPostsCompletedActionCreator(testData.post1)).toEqual({
      type: 'LOAD_POSTS_COMPLETED',
      payload: {
        posts: testData.post1,
      },
    });
  });
  it('should be able to create loadXXXErrorAction', () => {
    const loadPostsErrorActionCreator = postActions.creators.loadPostsError;
    expect(loadPostsErrorActionCreator(testData.postError.message.text)).toEqual({
      type: 'LOAD_POSTS_ERROR',
      payload: {
        message: testData.postError.message.text,
      },
    });
  });
  it('should be able to create clearXXXAction', () => {
    const clearPostsActionCreator = postActions.creators.clearPosts;
    expect(clearPostsActionCreator(testData.postError.message.text)).toEqual({
      type: 'CLEAR_POSTS',
    });
  });
  it('should be able to create loadXXXValidationWarningAction', () => {
    const loadPostsValidationWarningActionCreator = postActions.creators.loadPostsValidationWarning;
    expect(loadPostsValidationWarningActionCreator(testData.post1, 'warning message')).toEqual({
      type: 'LOAD_POSTS_VALIDATION_WARNING',
      payload: {
        posts: testData.post1,
        message: 'warning message',
      },
    });
  });
  it('action creators are isolated and do not interfere with other', () => {
    const loadCommentsActionCreator = commentActions.creators.loadComments;
    expect(loadCommentsActionCreator(2, validationPredicate)).toEqual({
      type: 'LOAD_COMMENTS',
      payload: {
        id: 2,
        validationPredicate,
      },
    });
  });
});