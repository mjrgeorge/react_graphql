import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  {
    allPost{
      id
      title
      content
    }
  }
`;