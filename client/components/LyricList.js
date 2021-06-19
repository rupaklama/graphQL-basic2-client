import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id: id },

      // optimistic update/response to instantly update our UI - no lagging
      optimisticResponse: {
        // we have to explicity say we are making mutation
        __typename: 'Mutation',
        // have to provide Expected Response Object from our backend server,
        // so we are guessing the response object but have to match
        // note - checkout in browser's response log
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1, // guessing there will be an increment of + 1
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li key={id} className='collection-item'>
        {content}

        <div className='vote-box'>
          <i className='material-icons' onClick={() => this.onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }
  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
