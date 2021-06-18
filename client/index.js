import './style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// apollo-client is interacting with our GraphQL server on the backend
// to make request for DATA & Storing that data locally when the response comes back
import ApolloClient from 'apollo-client';

// To connect React & Apollo World
// To provide Data from the Apollo Store into our React App
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// creating new instance of 'apollo-client' & pass it into the <ApolloProvider>
const client = new ApolloClient({
  // pass in empty config object here to configure setup
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          {/* we want to show SongList when user hits the root route of our app - '/' */}
          <IndexRoute component={SongList} />
          <Route path='songs/new' component={SongCreate} />
          <Route path='songs/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
