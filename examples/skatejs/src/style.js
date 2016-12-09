import cssBase from 'todomvc-common/base.css';
import cssApp from 'todomvc-app-css/index.css';

const { head } = document;
const cssBaseStyle = document.createElement('style');
const cssAppStyle = document.createElement('style');

cssBaseStyle.textContent = cssBase.toString();
cssAppStyle.textContent = cssApp.toString();

head.appendChild(cssBaseStyle);
head.appendChild(cssAppStyle);

export default cssBase.toString() + cssApp.toString();
export const classes = { ...cssBase.locals, ...cssApp.locals };
