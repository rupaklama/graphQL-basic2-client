import React from 'react';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

// 'graphql-tag' is a helper library to allow us to write queries inside of a Component File
// gql - by convention
import gql from 'graphql-tag';

// to bond query & component together
import { graphql } from 'react-apollo';

// When we first render our Component, the Query we wrote automatically send to our Backend Server.
// This is Async Process which take some time to complete & the Component will automatically Re-Render
// with the data that was fetched from the query which is passed as PROPS into our Component
class SongList extends React.Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id: id }, // this can be { id }

        // to refetch/re-run query to show up new updated data which takes array of queries
        // arg object takes two props - query & variables, same as above to add any variables args
        // refetchQueries: [{ query: query }],
        // note - We can't use the same technique, have to go with different approach
      })
      // note - remember that when we call our mutation, it returns a Promise
      // which means we can chain .then() which will be executed after Mutation has successfully completed
      .then(() => this.props.data.refetch());
    // using 'refetch' method of 'data' property
    // refetch method will automatically re-execute any queries that are associated with this Component

    // Why 'refetch' method vs 'refetchQueries' prop
    // it really comes to how the QUERY is associated with the Current Component
    // meaning here the Current Query is associated with this Component - Changing Data in Current Component
    // The SongList component did receive that query as PROPS Object,
    // graphQL knows the that query exists, it knows query is associated with SongList
    // it will REFRESH the query associated with the COMPONENT
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className='collection-item'>
        <Link to={`/songs/${id}`}>{title}</Link>

        <i className='material-icons' onClick={() => this.onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }
  render() {
    // console.log(this.props);

    // note - very important to make data loading working
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>

        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

// writing query in our component file
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// bonding graphQL query & component together
// graphql(query) returns a func, calling immediately that function with (SongList)
export default graphql(mutation)(graphql(query)(SongList));
// we can't add another query directly inside of graphql(query) like this graphql(query, mutation)
// We are going to use multiple instances of 'graphql' helper
// note - we are going to call 'graphql' helper TWO separate times

// note - graphql helper is what creates 'data' property in Response data
