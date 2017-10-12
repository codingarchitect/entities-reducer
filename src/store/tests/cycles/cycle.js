import { combineCycles } from 'redux-cycles';
import postsCycle from './posts.cycle';
import commentsCycle from './comments.cycle';
import { injectCycle } from '../../reducer';

const cycle = combineCycles(postsCycle, commentsCycle);

/* eslint fp/no-nil: 1 */
/* eslint better/explicit-return: 1 */
export default function register(store) {
  /* eslint fp/no-unused-expression: 1 */
  injectCycle(store, { key: 'app', cycle });
}
