import { fromNullable } from '../Either';

const renderPage = user =>
  `<h1>${user.name}</h1>`;

const showLogin = _ =>
  '<h1>Please Login!</h1>';

// const openSite = (currentUser) => {
//   if (currentUser) {
//     return renderPage(currentUser);
//   }
//   return showLogin();
// };

export default currentUser =>
  fromNullable(currentUser)
  .fold(showLogin, renderPage);
