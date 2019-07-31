import * as requestPromise from 'request-promise';

export function createHttpClient(baseUrl: string) {
  return requestPromise.defaults({
    baseUrl,
    json: true,
  });
}
