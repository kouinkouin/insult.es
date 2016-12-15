import handlePost from './ui/handlePost';
import handleKeyboard from './ui/handleKeyboard';
import handleClickMenu from './ui/handleClickMenu';

function init() {
  handlePost();
  handleKeyboard();
  handleClickMenu();
}

export { init };
