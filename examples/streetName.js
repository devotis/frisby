import { fromNullable } from '../Either';

// const streetName = (user) => {
//   const address = user.address;
//
//   if (address) {
//     const street = address.street;
//
//     if (street) {
//       return street.name;
//     }
//   }
//
//   return 'no street';
// };

export default user =>
  fromNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(e => 'no street', n => n);
