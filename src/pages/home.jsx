import React from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
} from "framework7-react";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        <NavLeft>
          <Link
            iconIos="f7:menu"
            iconAurora="f7:menu"
            iconMd="material:menu"
            panelOpen="left"
          />
        </NavLeft>
        <NavTitle sliding>My App</NavTitle>
        <NavRight>
          <Link
            iconIos="f7:menu"
            iconAurora="f7:menu"
            iconMd="material:menu"
            panelOpen="right"
          />
          {user ? (
            <List>
              <ListItem link="/" title="Sign Out" />
            </List>
          ) : (
            <List>
              <ListItem link="/" title="Sign In" />
            </List>
          )}
        </NavRight>
        <NavTitleLarge>Chào mừng {user || "bạn"}</NavTitleLarge>
      </Navbar>

      {/* Page content */}
      {/* 
      <Block strong>
        <p>Here is your blank Framework7 app. Let s see what we have here.</p>
      </Block>
      */}
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem link="/category/" title="Category" />
        <ListItem link="/product/" title="Product" />
      </List>
      <BlockTitle>Modals</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised popupOpen="#my-popup">
              Popup
            </Button>
          </Col>
          <Col width="50">
            <Button fill raised popupOpen="#my-game">
              Game X-O
            </Button>
          </Col>
        </Row>
      </Block>

      <BlockTitle>Panels</BlockTitle>
      <Block strong>
        <Row>
          <Col width="50">
            <Button fill raised panelOpen="left">
              Left Panel
            </Button>
          </Col>
          <Col width="50">
            <Button fill raised panelOpen="right">
              Right Panel
            </Button>
          </Col>
        </Row>
      </Block>

      <List>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
    </Page>
  );
};
export default HomePage;
