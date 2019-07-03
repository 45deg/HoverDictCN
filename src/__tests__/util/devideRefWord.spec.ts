
import assert from 'assert';
import devideRefWord from '../../util/devideRefWord';


describe('devideRefWord test', () => {
  it.each([
    ['CL:個|个[ge4],位[wei4]', ['CL:', ['個', '个', 'ge4'], ',', ['位', undefined, 'wei4']]],
    ['Tang poet Du Fu 杜甫[Du4 Fu3]) with', ['Tang poet Du Fu ', ['杜甫', undefined, 'Du4 Fu3'], ') with']]
  ] as [string, ReturnType<typeof devideRefWord>][])('match test: %s', (text, expected) => {
    let actual = devideRefWord(text);
    assert.deepEqual(actual, expected);
  })
});