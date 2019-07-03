export type WordsWithIndex = {
  word: string,
  begin: number,
  end: number,
};

const expandWord = (str: string, index: number, length: number): WordsWithIndex[] => {
  let expanded = [];
  for (let begin = 0; begin < length; ++begin) {
    if (/^[\s\r\n]*$/.test(str.charAt(index - begin))) {
      break;
    }
    for (let end = 0; end < length; ++end) {
      if (/^[\s\r\n]*$/.test(str.charAt(index + end))) {
        break;
      }
      expanded.push({
        word: str.substring(index - begin, index + end + 1),
        begin: index - begin,
        end: index + end
      });
    }
  }
  return expanded;
};

export default expandWord;