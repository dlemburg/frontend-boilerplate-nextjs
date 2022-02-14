import { USER_FRAGMENT } from '../../fragments';

export const ME_QUERY = `
  ${USER_FRAGMENT}

  query ME {
    me {
      ...UserFragment
    }
  }
`;
