export type WordsWithIndex = {
  word: string,
  begin: number,
  end: number,
};

const expandWord = (str: string, index: number, length: number): WordsWithIndex[] => {
  let expanded: WordsWithIndex[] = [];
  for (let begin = 0; begin < length; ++begin) {
    if (index - begin < 0) {
      break;
    }
    for (let end = 0; end < length; ++end) {
      if (index + end >= str.length) {
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