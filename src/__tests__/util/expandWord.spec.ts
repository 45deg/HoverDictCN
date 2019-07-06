
import assert from 'assert';
import expandWord from '../../util/expandWord';

const TEXT = '道，可道也，非恆道也。名，可名也，非恆名也。';
const parameters: [string, number, string, string[]][] = [
  ['expand correctly', 8, TEXT, ['道', '道也', '道也。',
    '恆道', '恆道也', '恆道也。',
    '非恆道', '非恆道也', '非恆道也。',
  ]],
  ['expand on beginning', 0, TEXT, ['道', '道，', '道，可']],
  ['expand on end', 21, TEXT, ['。', '也。', '名也。']],
];

describe('expandWord test', () => {

  it.each(parameters)
    ('%s', (_, index: number, text: string, expected: string[]) => {
      const actual = expandWord(text, index, 3);

      assert.equal(actual.length, expected.length);
      for (let i = 0; i < actual.length; i++) {
        assert.equal(actual[i].word, expected[i]);
        assert.equal(text.substring(actual[i].begin, actual[i].end + 1), expected[i]);
      }
    });
});