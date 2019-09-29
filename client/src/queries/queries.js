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
export const getPostsQuery2 = gql`
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
  mutation($groupId: String!, $authorId: String!) {
    addGroup(authorId: $authorId, groupId: $groupId) {
      id
      groupId
      authorId
    }
  }
`;
