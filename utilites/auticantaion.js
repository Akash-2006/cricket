import details from '../json/users.json' with { type: 'json'};

export const compare = ({ userName, password }) => {
  if (userName in details) {
    return details[userName] == password;
  }
  return false;
};
