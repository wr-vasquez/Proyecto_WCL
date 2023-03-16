import { createSuccesfulResponse } from '../helpers';
import { unauthorizedErrorResponse } from '../helpers/error-responses';
import { FakeHandler } from './fake-handler.interface';

const usersDb = [
  {
    username: 'Mario',
    password: '1234',
    role: 'Orders',
  },
  {
    username: 'carlos',
    password: '1234',
    role: 'Inventory',
  },
  {
    username: 'lester',
    password: '1234',
    role: 'Accounting',
  },
  {
    username: 'wvasquez',
    password: '1234',
    role: 'Administrador',
  },
];

export const authHandlers: FakeHandler[] = [
  {
    match: (req) => req.url === 'login' && req.method === 'POST',
    handle: (req) => {
      const { username, password } = req.body;
      const user = usersDb.find(
        (userFromDb) =>
          userFromDb.username === (username as string).toLocaleLowerCase() &&
          userFromDb.password === password
      );

      return user
        ? createSuccesfulResponse(safeUserInfo(user))
        : unauthorizedErrorResponse(req, 'Invalid Credentials');
    },
  },
];

function safeUserInfo(user: any) {
  const userClone = { ...user };
  delete userClone.password;

  return window.btoa(JSON.stringify(userClone));
}
