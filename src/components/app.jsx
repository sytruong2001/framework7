import React, { useState, useEffect } from "react";

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";
import Game from "../pages/play";
import Login from "../pages/login";
import Ho from "../pages/Ho";
import Category from "../pages/about";

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "My App", // App name
    theme: "auto", // Automatic theme detection

    // App store
    store: store,
    // App routes
    routes: routes,
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  const user = localStorage.getItem("user");

  return (
    <App {...f7params}>
      {/* Left panel with cover effect*/}
      <Panel left cover themeDark>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <List>
              <ListItem link="/category/" title="Category" />
              <ListItem link="/product/" title="Product" />
            </List>
          </Page>
        </View>
      </Panel>

      {/* Right panel with reveal effect*/}
      <Panel right reveal themeDark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Your main view, should have "view-main" class */}
      <View
        main
        className="safe-areas"
        url="/"
        browserHistory
        browserHistorySeparator=""
      />

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Ho">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>
                <Ho />
              </p>
            </Block>
          </Page>
        </View>
      </Popup>
      <Popup id="my-game">
        <View>
          <Page>
            <Navbar title="Game">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>
                <Game />
              </p>
            </Block>
          </Page>
        </View>
      </Popup>
    </App>
  );
};
export default MyApp;
