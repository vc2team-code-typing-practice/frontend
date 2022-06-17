import paragraphsMock from '../mock/paragraphs.json';
import sentenceMock from '../mock/sentences.json';
import wordsMock from '../mock/words.json';

export default function loadMockData(language, type) {
  const data = [];
  let targetData = null;

  if (type === 'word') {
    targetData = wordsMock;
  } else if (type === 'sentence') {
    targetData = sentenceMock;
  } else if (type === 'paragraph') {
    targetData = paragraphsMock;
  }

  if (targetData) {
    targetData
      .filter((element) => element.language === language)
      .map((element) => data.push(element.content));
  }

  return data;
}
