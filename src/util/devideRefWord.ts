type GroupType =
  [string | undefined, string | undefined, string];

type ResultType =
  (string | GroupType)[];

const REF_REGEXP = /([^\s!-\/:-@\[-`{-~]+)?(?:\|([^\s!-\/:-@\[-`{-~]+))?\[([\w\s]+)\]/;

function devideRefWord(string: string): ResultType {
  let list: ResultType = [];
  let res;
  let lastIndex = 0;
  let regex = new RegExp(REF_REGEXP, 'g');
  while ((res = regex.exec(string)) != null) {
    list.push(string.substring(lastIndex, res.index));
    list.push(res.slice(1) as GroupType);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < string.length) {
    list.push(string.substring(lastIndex))
  }
  return list;
}

export default devideRefWord;