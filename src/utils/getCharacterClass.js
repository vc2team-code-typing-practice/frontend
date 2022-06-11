export default function getCharacterClass(currentInput, index, character) {
  if (index < currentInput.split('').length) {
    if (character === currentInput.split('')[index]) {
      return 'correct';
    } else {
      return 'wrong';
    }
  }
}
