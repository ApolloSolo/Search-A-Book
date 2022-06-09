import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_BOOK = gql`
mutation addBook($userId: ID!, $description: String!, $bookId: String!, $image: String!, $title: String!){
  addBook(userId: $userId, description: $description, bookId: $bookId, image: $image, title: $title) {
    username
    books {
      bookId
      title
      description
      image
    }
  }
}
`;