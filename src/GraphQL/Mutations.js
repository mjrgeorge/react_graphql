import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation CreateNewPost ($title: String!, $content: String!) {
  createNewPost(title: $title, content: $content) {
    createdStatus
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($id: Int!){
  deletePost(postId: $id) {
    deletedStatus
  }
}
`;