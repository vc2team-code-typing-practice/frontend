export default function getCharacterClass(
  currentInput,
  index,
  character,
  isColorWeaknessUser,
) {
  const currentQuestionId = document.getElementById(index);

  if (index < currentInput.split('').length) {
    if (character === currentInput.split('')[index]) {
      currentQuestionId?.classList.remove('current');

      if (!isColorWeaknessUser) {
        return 'correct';
      } else {
        return 'correct_colorWeakness';
      }
    } else {
      currentQuestionId?.classList.remove('current');

      if (!isColorWeaknessUser) {
        return 'wrong';
      } else {
        return 'wrong_colorWeakness';
      }
    }
  }
}
