export default function checkKoreanInput(currentInput) {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const isKoreanWord = regex.test(currentInput);

  return isKoreanWord;
}
