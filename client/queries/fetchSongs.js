// 'graphql-tag' is a helper library to allow us to write queries inside of a Component File
// gql - by convention
import gql from 'graphql-tag';

export default gql`
  {
    songs {
      id
      title
    }
  }
`;
