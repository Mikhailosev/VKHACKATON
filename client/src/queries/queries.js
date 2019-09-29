import { gql } from "apollo-boost";

export const getPostsQuery = gql`
  {
    posts {
      id
      title
      viewed
      image
      buy
    }
  }
`;
export const getPostFullQuery = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      teaser
      viewed
      image
      buy
      content
    }
  }
`;
export const getPostBuyQuery = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      teaser
      viewed
      image
      buy
    }
  }
`;
export const addGroupMutation = gql`
<<<<<<< HEAD
  mutation($groupId: String!, $authorId: String!) {
    addGroup(authorId: $authorId, groupId: $groupId) {
      id
=======
  mutation($name: String!, $groupId: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      idv
>>>>>>> daa6eac3d251ba4b12f948de9dbe6ce2a5359dcf
      groupId
      authorId
    }
  }
`;
