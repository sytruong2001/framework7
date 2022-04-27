import React from "react";
import { useState } from "react";
import "../css/category.css";
import {
  f7,
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
  NavRight,
  ListInput,
  ListButton,
} from "framework7-react";
import { $ } from "dom7";
import Category from "./about";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleNavbar: "Thêm sản phẩm",
      titleButton: "Thêm",
      id: "",
      nameProd: "",
      nameCate: "",
      price: "",
      amount: "",
      desc: "",
      list: [
        {
          id: "001",
          nameProd: "Áo Hoodie",
          nameCate: "Áo",
          price: "200000",
          amount: "206",
          desc: "Chất lượng tốt",
        },
        {
          id: "002",
          nameProd: "Quần Âu",
          nameCate: "Quần",
          price: "550000",
          amount: "420",
          desc: "Bền, đẹp",
        },
        {
          id: "003",
          nameProd: "Áo Blaze",
          nameCate: "Áo",
          price: "3000000",
          amount: "102",
          desc: "Sang, sịn, mịn",
        },
        {
          id: "004",
          nameProd: "Quần Jean",
          nameCate: "Quần",
          price: "1200000",
          amount: "20",
          desc: "Dày, bền",
        },
      ],
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getData = this.getData.bind(this);
    this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
    this.popupRef = React.createRef();
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.id === "") {
      if (
        this.state.nameProd != "" &&
        this.state.nameCate != "" &&
        this.state.price != "" &&
        this.state.amount != "" &&
        this.state.desc != ""
      ) {
        const listProd = this.state.list;
        const nameProdCheck = listProd.find(
          (listProd) => listProd.nameProd === this.state.nameProd
        );
        if (nameProdCheck) {
          alert("Tên sản phẩm đã tồn tại");
        } else {
          const idProd = listProd[listProd.length - 1].id.slice(2);
          // console.log(idCate);
          const item = {
            id: "PD" + (parseInt(idProd) + 1),
            nameProd: this.state.nameProd,
            nameCate: this.state.nameCate,
            price: this.state.price,
            amount: this.state.amount,
            desc: this.state.desc,
          };
          listProd.push(item);
          this.setState({
            list: listProd,
          });
          alert("Thêm sản phẩm thành công!");
          this.state.nameProd = "";
          this.state.nameCate = "";
          this.state.price = "";
          this.state.amount = "";
          this.state.desc = "";
        }
      } else {
        alert("Chưa điền đầy đủ thông tin!");
      }
    } else {
      const newList = this.state.list.map((item) => {
        if (item.id === this.state.id) {
          const updatedItem = {
            ...item,
            nameProd: this.state.nameProd,
            nameCate: this.state.nameCate,
            price: this.state.price,
            amount: this.state.amount,
            desc: this.state.desc,
          };

          return updatedItem;
        }

        return item;
      });

      this.setState({
        list: newList,
      });
      alert("Sửa thành công");
      this.state.id = "";
      this.handleClose();
    }
  }
  handleDelete(id) {
    if (id) {
      const rs = confirm("Bạn có chắc muốn xóa không");
      if (rs) {
        let filtered = this.state.list.filter((item) => item.id !== id);
        this.setState({ list: filtered }, () => {
          console.log(this.state);
        });
      }
    } else {
      alert("Oh no!");
    }
  }
  handleUpdate(id) {
    const prod = this.state.list.find((list) => list.id === id);
    this.setState((state) => {
      state.id = prod.id;
      state.nameProd = prod.nameProd;
      state.nameCate = prod.nameCate;
      state.price = prod.price;
      state.amount = prod.amount;
      state.desc = prod.desc;
      state.titleButton = "Cập nhật";
      state.titleNavbar = "Sửa thể loại";
      return state;
    });
    // mở popup
    this.popupRef.current.el.f7Modal.open();
  }
  handleClose() {
    if (this.state.id === "") {
    } else {
      const rs = confirm("Hủy thay đổi");
    }
    this.popupRef.current.el.f7Modal.close();
    this.setState((state) => {
      state.id = "";
      state.nameProd = "";
      state.nameCate = "";
      state.price = "";
      state.amount = "";
      state.desc = "";
      state.titleButton = "Thêm sản phẩm";
      state.titleNavbar = "Thêm";
      return state;
    });
  }
  handleSearch(event) {
    this.setState({
      nameProd: event.target.value.toLowerCase(),
    });
    const name = this.state.nameProd;
    if (name.length > 1) {
      const prod = this.state.list.filter((list) => {
        return list.nameProd.toLowerCase().includes(name.toLowerCase());
      });
      this.setState({
        data: prod,
      });
    } else {
      this.getData();
      // debugger;
    }
  }
  getData() {
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
        <Navbar title="Products" backLink="Back" />
        <BlockTitle>List Product</BlockTitle>
        <Row>
          <Col width="20">
            <Button fill raised popupOpen="#product" id="add">
              Thêm sản phẩm
            </Button>
            <Button fill raised popupOpen="#product" id="add-s">
              +
            </Button>
          </Col>
          <Col width="30">
            <List form>
              <ListInput
                type="text"
                name="nameProd"
                placeholder="Nhập tên sản phẩm muốn tìm kiếm...."
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
            <Col width="5">#</Col>
            <Col width="10">Mã sản phẩm</Col>
            <Col width="20">Tên sản phẩm</Col>
            <Col width="10">Thể loại</Col>
            <Col width="10">Số lượng</Col>
            <Col width="15">Giá tiền (VND)</Col>
            <Col width="10">Mô tả</Col>
            <Col width="10">Sửa</Col>
            <Col width="10">Xóa</Col>
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
              <Col width="5">{index + 1}</Col>
              <Col width="10">{item.id}</Col>
              <Col width="20">{item.nameProd}</Col>
              <Col width="10">{item.nameCate}</Col>
              <Col width="10">
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(item.amount)}
              </Col>
              <Col width="15">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </Col>
              <Col width="10">{item.desc}</Col>
              <Col width="10">
                <Button
                  onClick={() => this.handleUpdate(item.id)}
                  style={{ backgroundColor: "rgb(247, 122, 5)" }}
                >
                  Sửa
                </Button>
              </Col>
              <Col width="10">
                <Button
                  onClick={() => this.handleDelete(item.id)}
                  style={{ backgroundColor: "red" }}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          ))}
        </Block>
        <Popup id="product" ref={this.popupRef}>
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
                    name="nameProd"
                    placeholder="Nhập tên sản phẩm"
                    value={this.state.nameProd}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput
                    type="text"
                    name="nameCate"
                    placeholder="Nhập tên thể loại"
                    value={this.state.nameCate}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput
                    type="number"
                    name="price"
                    placeholder="Nhập giá sản phẩm"
                    value={this.state.price}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput
                    type="number"
                    name="amount"
                    placeholder="Nhập số lượng sản phẩm"
                    value={this.state.amount}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput
                    type="text"
                    name="desc"
                    placeholder="Nhập mô tả sản phẩm"
                    value={this.state.desc}
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

export default Product;
