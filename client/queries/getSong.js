import gql from 'graphql-tag';

export default gql`
  # named query
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
