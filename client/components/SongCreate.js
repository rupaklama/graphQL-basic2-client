import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

// to bond query & component together
import { graphql } from 'react-apollo';

// 'graphql-tag' is a helper library to allow us to write queries inside of a Component File
// gql - by convention
import gql from 'graphql-tag';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(e) {
    e.preventDefault();

    // accessing 'mutate' property to call our mutation func below
    this.props
      .mutate({
        // config object have variables prop in query params
        variables: {
          // passing our component state as arg
          title: this.state.title,
        },

        // to refetch/re-run query to show up new updated data which takes array of queries
        // arg object takes two props - query & variables, same as above to add any variables args
        refetchQueries: [{ query: query }],
        // note - when rendering data in SongList, Apollo identifies it's already running same query
        // so it will not attempt to run same query twice again
      })

      // to make sure that user navigates only after mutation has been successfully submitted to the server
      // we can make use of the value return from the mutation itself.
      // When we call mutation, it returns a Promise which is call after the song has been successfully created
      // there will be little bit of delay
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='song'>Song Title:</label>
          <input
            type='text'
            id='song'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

// we need to access the 'title' state from above Component
// since it is only available inside of the Component itself.
// NOTE - We are going to use little feature of GraphiQL syntax which
// is available inside of GraphiQL Browser tool as well.

// We are going to pass some args into our 'mutation' from outside source
// To demo this 'query variables' inside of browser tool.
// 'query variables' are use to inject some variables from Outside of the query into the query
// It is use very often with mutation & to customize query from the component as well.
// eg. filtering, pagination etc

// NOTE - Purpose of adding Name is making it a Function & call it anywhere inside of our Application
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

// bonding graphQL query & component together
// graphql(query) returns a func, calling immediately that function with (SongCreate)
export default graphql(mutation)(SongCreate);
// note - when we wrap mutation, we don't get this - graphql helper is what creates 'data' property in Response data
// Instead of 'data' property, we get access to 'mutate' property which calls our Mutation Function above
