import gql from "graphql-tag";

export const LIKE_POST = gql`
  mutation( $post_id: ID!) {
    likeUpdate(post_id: $post_id) 
  }
`;
