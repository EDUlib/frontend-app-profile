import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import SiteFooter from '@edx/frontend-component-footer';
import { fetchUserProfile } from '@edx/frontend-auth';

import apiClient from './data/apiClient';
import SiteHeader from './containers/SiteHeader';
import UserAccount from './components/UserAccount';
import store from './data/store';
import HeaderLogo from '../assets/edx-sm.png';
import FooterLogo from '../assets/edx-footer.png';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { username } = store.getState().authentication;
    store.dispatch(fetchUserProfile(apiClient, username));
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <SiteHeader
              logo={HeaderLogo}
              logoDestination={process.env.MARKETING_SITE_BASE_URL}
              logoAltText={process.env.SITE_NAME}
              menuItems={[]}
            />
            <main>
              <Switch>
                <Route exact path="/" component={UserAccount} />
              </Switch>
            </main>
            <SiteFooter
              siteName={process.env.SITE_NAME}
              siteLogo={FooterLogo}
              marketingSiteBaseUrl={process.env.MARKETING_SITE_BASE_URL}
              supportUrl={process.env.SUPPORT_URL}
              contactUrl={process.env.CONTACT_URL}
              openSourceUrl={process.env.OPEN_SOURCE_URL}
              termsOfServiceUrl={process.env.TERMS_OF_SERVICE_URL}
              privacyPolicyUrl={process.env.PRIVACY_POLICY_URL}
              facebookUrl={process.env.FACEBOOK_URL}
              twitterUrl={process.env.TWITTER_URL}
              youTubeUrl={process.env.YOU_TUBE_URL}
              linkedInUrl={process.env.LINKED_IN_URL}
              googlePlusUrl={process.env.GOOGLE_PLUS_URL}
              redditUrl={process.env.REDDIT_URL}
              appleAppStoreUrl={process.env.APPLE_APP_STORE_URL}
              googlePlayUrl={process.env.GOOGLE_PLAY_URL}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

if (apiClient.ensurePublicOrAuthencationAndCookies(window.location.pathname)) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
