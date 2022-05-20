import React from "react";
import { useState } from "react";
import "../css/category.css";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  List,
  ListItem,
  Button,
  Col,
  Row,
  Popup,
  View,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  ListInput,
  ListButton,
} from "framework7-react";
import Product from "./form";
import Login from "./login";
import { styles, width } from "dom7";
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleNavbar: "Thêm thể loại",
      titleButton: "Thêm",
      id: "",
      name: "",
      list: [
        { id: "TL1", name: "Hành động, tình cảm" },
        { id: "TL2", name: "Ngôn tình" },
        { id: "TL3", name: "Đam mỹ" },
        { id: "TL4", name: "Chuyển sinh, xuyên không" },
      ],
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getData = this.getData.bind(this);
    this.popupRef = React.createRef();
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }
  handleUpdate(event) {
    const cate = this.state.list.find((list) => list.id === event);
    this.setState((state) => {
      state.id = cate.id;
      state.name = cate.name;
      state.titleButton = "Cập nhật";
      state.titleNavbar = "Sửa thể loại";
      return state;
    });
    this.popupRef.current.el.f7Modal.open();
  }
  handleSubmit(event) {
    if (this.state.id === "") {
      const listCate = this.state.list;
      const idCate = listCate[listCate.length - 1].id.slice(2);
      // console.log(idCate);
      const item = {
        id: "TL" + (parseInt(idCate) + 1),
        name: this.state.name,
      };
      listCate.push(item);

      this.setState({ list: listCate }, () => {
        console.log(this.state);
      });
      sessionStorage.removeItem("data");
      const rs = JSON.stringify(this.state.list);
      sessionStorage.setItem("data", rs);
      this.state.name = "";
    } else {
      const newList = this.state.list.map((item) => {
        if (item.id === this.state.id) {
          const updatedItem = {
            ...item,
            name: this.state.name,
          };

          return updatedItem;
        }

        return item;
      });

      this.setState({
        list: newList,
        data: newList,
      });
      sessionStorage.removeItem("data");
      const rs = JSON.stringify(newList);
      sessionStorage.setItem("data", rs);
      alert("Sửa thành công");
      this.state.id = "";
      this.handleClose();
    }
  }
  handleClose() {
    if (this.state.id === "") {
    } else {
      const rs = confirm("Hủy thay đổi");
    }
    this.popupRef.current.el.f7Modal.close();
    this.setState((state) => {
      state.id = "";
      state.name = "";
      state.titleButton = "Thêm thể loại";
      state.titleNavbar = "Thêm";
      return state;
    });
  }
  handleSearch(event) {
    this.setState({
      name: event.target.value.toLowerCase(),
    });
    const name = this.state.name;
    if (name.length > 1) {
      const cate = this.state.list.filter((list) => {
        return list.name.toLowerCase().includes(name.toLowerCase());
      });
      this.setState({
        data: cate,
      });
    } else {
      this.getData();
      // debugger;
    }
  }
  getData() {
    const rs = JSON.parse(sessionStorage.getItem("data"));
    if (rs) {
      this.state.list = rs;
    }
    this.setState({
      data: this.state.list,
    });
  }
  UNSAFE_componentWillMount() {
    this.getData();
  }
  render() {
    return (
      <Page>
        <Navbar sliding={false}>
          <Navbar title="Quản lý thể loại" backLink="Back" />
          <NavRight>
            <List>
              <ListItem
                style={{ color: "orangered", background: "black" }}
                link="/home"
                title="Trang chủ"
              />
            </List>
            <List>
              <ListItem
                style={{ color: "orangered", background: "black" }}
                link="/product"
                title="Truyện tranh"
              />
            </List>
            <List>
              <ListItem
                style={{ color: "orangered", background: "black" }}
                link="/"
                title="Sign Out"
              />
            </List>
          </NavRight>
        </Navbar>

        <BlockTitle>List Category</BlockTitle>
        <Row>
          <Col width="20">
            <Button fill raised popupOpen="#my-category">
              Thêm thể loại
            </Button>
          </Col>
          <Col width="30">
            <List form>
              <ListInput
                type="text"
                name="name"
                placeholder="Nhập tên thể loại muốn tìm kiếm...."
                onChange={(event) => this.handleSearch(event)}
              ></ListInput>
            </List>
          </Col>
        </Row>
        <Block
          style={{
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <Row
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#04AA6D",
            }}
          >
            <Col width="10">#</Col>
            <Col width="20">Mã thể loại</Col>
            <Col width="20">Tên thể loại</Col>
            <Col width="10">Thao tác</Col>
          </Row>
          {this.state.data.map((item, index) => (
            <Row
              key={item.id}
              style={
                index % 2 === 0
                  ? {
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                    }
                  : { border: "1px solid #ddd", padding: "8px" }
              }
            >
              <Col width="10">{index++}</Col>
              <Col width="20">{item.id}</Col>
              <Col width="20">{item.name}</Col>
              <Col width="10">
                <Button
                  onClick={(event) => this.handleUpdate(item.id)}
                  style={{ backgroundColor: "rgb(247, 122, 5)" }}
                >
                  Sửa
                </Button>
              </Col>
            </Row>
          ))}
        </Block>
        <Popup id="my-category" ref={this.popupRef}>
          <View>
            <Page>
              <Navbar title={this.state.titleNavbar}>
                <NavRight>
                  <Button onClick={(event) => this.handleClose(event)}>
                    Close
                  </Button>
                </NavRight>
              </Navbar>
              <Block>
                <List form>
                  <ListInput
                    type="hidden"
                    name="id"
                    value={this.state.id}
                  ></ListInput>
                  <ListInput
                    type="text"
                    name="name"
                    placeholder="Nhập tên thể loại"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListButton
                    title={this.state.titleButton}
                    onClick={(event) => this.handleSubmit(event)}
                  />
                </List>
              </Block>
            </Page>
          </View>
        </Popup>
      </Page>
    );
  }
}

export default Category;
