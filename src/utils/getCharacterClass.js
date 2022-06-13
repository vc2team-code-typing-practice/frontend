export default function getCharacterClass(currentInput, index, character) {
  const currentQuestionId = document.getElementById(index);
  console.log(currentQuestionId);
  if (index < currentInput.split('').length) {
    if (character === currentInput.split('')[index]) {
      currentQuestionId.classList.remove('current');
      return 'correct';
    } else {
      currentQuestionId.classList.add('current');
      return 'wrong';
    }
  }
}
