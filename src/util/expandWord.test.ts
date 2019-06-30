
import assert from 'assert';
import expandWord from './expandWord';

it('expand correctly', () => {
  const actual = expandWord('道，可道也，非恆道也。名，可名也，非恆名也。', 8, 3);
  const expected = ['道', '道也', '道也。',
    '恆道', '恆道也', '恆道也。',
    '非恆道', '非恆道也', '非恆道也。',
  ]
  assert.deepEqual(actual, expected);
});

it('expand on beginning', () => {
  const actual = expandWord('道，可道也，非恆道也。名，可名也，非恆名也。', 0, 3);
  const expected = ['道', '道，', '道，可'];
  assert.deepEqual(actual, expected);
});

it('expand on end', () => {
  const actual = expandWord('道，可道也，非恆道也。名，可名也，非恆名也。', 21, 3);
  const expected = ['。', '也。', '名也。'];
  assert.deepEqual(actual, expected);
});

it('expand with linefeed', () => {
  const actual = expandWord('道可道也非恆道也\n名可名也非恆名也', 7, 3);
  const expected = [
    '也', '道也', '恆道也'
  ];
  assert.deepEqual(actual, expected);
});
