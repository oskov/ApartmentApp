import {ping} from './ping';

describe('works', function() {
  it('should return pong', function() {
    expect(ping()).toBe('pong');
  });
});
