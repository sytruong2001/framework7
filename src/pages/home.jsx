import React from "react";
import {
  f7,
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
  const user = JSON.parse(sessionStorage.getItem("user"));
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
        <NavTitle sliding>ST App</NavTitle>
        <NavRight>
          <List>
            <ListItem
              style={{ color: "orangered", background: "black" }}
              link="/"
              title="Sign Out"
            />
          </List>
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
        <ListItem link="/category" title="Thể loại" />
        <ListItem link="/product" title="Truyện tranh" />
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
