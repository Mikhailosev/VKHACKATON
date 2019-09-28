import { gql } from "apollo-boost";

export const getPostsQuery = gql`
  {
    posts {
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
  mutation($name: String!, $groupId: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
      groupId
      authorId
    }
  }
`;
