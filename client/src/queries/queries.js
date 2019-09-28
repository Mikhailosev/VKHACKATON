import { gql } from "apollo-boost";

export const getPostsQuery = gql`
  {
    posts {
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
export const getPostQuery = gql`
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
export const addGroupMutation = gql`
  mutation($name: String!, $groupId: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
      groupId
      authorId
    }
  }
`;
