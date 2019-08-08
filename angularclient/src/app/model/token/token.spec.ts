import { Token } from './token';

describe('Token', () => {
  it('should create an instance', () => {
    expect(new Token(0, "Test")).toBeTruthy();
  });
});
