import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor='lyric'>Add a Lyric</label>
        <input
          id='lyric'
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        # id to keep track of the data/record
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
