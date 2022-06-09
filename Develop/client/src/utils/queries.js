import { gql } from '@apollo/client'

export const QUERY_USER = gql`
query user($userId: ID!){
    user(userId: $userId) {
      _id
      username
      email
      books {
        title
        description
        image
        link
        bookId
      }
    }
  }
`;

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    books {
      title
    }
  }
}
`;