import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation CreateNewPost ($title: String! $content: String!) {
  createNewPost(title: $title, content: $content) {
    createdStatus
  }
}
`;

export const UPDATED_POST = gql`
mutation UpdatePost($id: Int! $title: String! $content: String!){
  updatePost(postId: $id, title: $title, content: $content) {
    updatedStatus
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