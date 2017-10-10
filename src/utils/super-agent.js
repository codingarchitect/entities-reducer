import superagent from 'superagent';
import { optionsToSuperagent } from '@cycle/http/lib/http-driver';
import superagentMock from 'superagent-mock';
function mockSuperAgentFactory() {
  const request = optionsToSuperagent({ url: '' });
  return function mockSuperAgent(config) {
    return superagentMock({
      Request: request.constructor,
      Response: superagent.Response,
    }, config);
  };
}
export default mockSuperAgentFactory();
