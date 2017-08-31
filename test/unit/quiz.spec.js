const chai = require('chai');
const MarvelService = require('../../src/app/services/quiz.service.js');

const expect = chai.expect;

const marvelService = MarvelService();

describe('Unit test for Marvel Quiz', () => {
  describe('\nFAIL Cases - Quiz', () => {
    it('should return false when user do not answer correctly', (done) => {
      marvelService.checkAnswer('a', 'b').catch(done);
    });
  });

  describe('\nSuccess Cases - Tokens', () => {
    it('should return true when user has answer correctly', (done) => {
      marvelService.checkAnswer('a', 'a').catch(done);
    });
  });
});
