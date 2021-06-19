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
  // o is short for object
  // this piece of config takes every single piece of data that is fetched by our Apollo client from backend
  // and runs it through this function, whatever is returned from this function is used to identify
  // that piece of data inside of the Apollo client/store
  // So, what we are saying here is go and fetch every piece of data you need
  // and use 'id' field of that record to identify that piece of data.
  dataIdFromObject: o => o.id, // data catching system
  // note - telling Apollo to use 'id' to identify this piece of data to keep track of it &
  // tell React that when the data related with any particular 'id' is updated
  // The reason for doing this is Apollo don't know that we want to use 'id' to keep track of the data.
  // NOTE - This only works when all the IDs inside of our application are unique against each other
  // NOTE - Doing this, we don't have to refetch/re-run query,
  // DON'T HAVE TO MAKE ANOTHER QUERY REQUEST
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
