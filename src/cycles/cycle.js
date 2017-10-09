import { combineCycles } from 'redux-cycles';
import postsCycle from './posts.cycle';
import commentsCycle from './comments.cycle';
import pingPongCycle from './ping-pong-cycle';

export default combineCycles(postsCycle, commentsCycle, pingPongCycle);
