import gql from "graphql-tag";

export const ALTER_AVATAR = gql`
  mutation($avatar_url: String!, $id: ID!) {
    clientUpdate(avatar_url: $avatar_url, id: $id) {
      avatar_url
      id
    }
  }
`;
