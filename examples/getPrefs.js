import { Left, Right } from '../Either';

const loadPrefs = prefs => prefs;
const defaultPrefs = { color: 'red' };
// const getPrefs = (user) => {
//   if (user.premium) {
//     return loadPrefs(user.preferences);
//   }
//   return defaultPrefs;
// };

export default user =>
  (user.premium ? Right(user) : Left('not premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs, prefs => loadPrefs(prefs));
