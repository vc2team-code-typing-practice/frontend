export default function getCharacterClass(currentInput, index, character) {
  const currentQuestionId = document.getElementById(index);

  if (index < currentInput.split('').length) {
    if (character === currentInput.split('')[index]) {
      currentQuestionId?.classList.remove('current');
      return 'correct';
    } else {
      currentQuestionId?.classList.remove('current');
      return 'wrong';
    }
  }
}
