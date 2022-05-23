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
      titleNavbar: "Thêm truyện",
      titleButton: "Thêm",
      id: "",
      ten_truyen: "",
      ten_the_loai: "",
      trang_thai: "",
      do_dai: "",
      ten_tac_gia: "",
      list: [
        {
          id: "001",
          ten_truyen: "Võ luyện đỉnh phong",
          ten_the_loai: "Hành động",
          trang_thai: "Đang tiến hành",
          do_dai: "2231",
          ten_tac_gia: "Đang cập nhật",
        },
        {
          id: "002",
          ten_truyen: "Chàng vú em tu chân",
          ten_the_loai: "Đam mỹ",
          trang_thai: "Đang tiến hành",
          do_dai: "85",
          ten_tac_gia: "Thanh Đình",
        },
        {
          id: "003",
          ten_truyen: "Thần long vương tọa",
          ten_the_loai: "Hành động",
          trang_thai: "Đang tiến hành",
          do_dai: "179",
          ten_tac_gia: "Đang cập nhật",
        },
        {
          id: "004",
          ten_truyen: "Tôi là mẹ kế của nam chính",
          ten_the_loai: "Ngôn tình",
          trang_thai: "Đang tiến hành",
          do_dai: "62.2",
          ten_tac_gia: "Đang cập nhật",
        },
        {
          id: "005",
          ten_truyen: "Thương nhân thánh thần",
          ten_the_loai: "Hành động",
          trang_thai: "Đang tiến hành",
          do_dai: "62",
          ten_tac_gia: "Đang cập nhật",
        },
        {
          id: "006",
          ten_truyen: "Cha vợ đại nhân của tôi",
          ten_the_loai: "Đam mỹ",
          trang_thai: "Đang tiến hành",
          do_dai: "157",
          ten_tac_gia: "Nguyệt Quan Nhật Tinh Không Xã",
        },
        {
          id: "007",
          ten_truyen: "Tôi đã mệt rồi",
          ten_the_loai: "Ngôn tình",
          trang_thai: "Đang tiến hành",
          do_dai: "42.2",
          ten_tac_gia: "Đang cập nhật",
        },
        {
          id: "008",
          ten_truyen: "Ta là tà đế",
          ten_the_loai: "Xuyên không",
          trang_thai: "Đang tiến hành",
          do_dai: "258",
          ten_tac_gia: "Đang cập nhật",
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
    this.newSession = this.newSession.bind(this);
    // this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
    this.popupRef = React.createRef();
  }
  // lưu state
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }
  // thêm và cập nhật truyện
  handleSubmit(event) {
    event.preventDefault();
    // thêm
    if (this.state.id === "") {
      if (
        this.state.ten_truyen != "" &&
        this.state.ten_the_loai != "" &&
        this.state.trang_thai != "" &&
        this.state.do_dai != "" &&
        this.state.ten_tac_gia != ""
      ) {
        const listProd = this.state.list;
        const ten_truyenCheck = listProd.find(
          (listProd) => listProd.ten_truyen === this.state.ten_truyen
        );
        if (ten_truyenCheck) {
          alert("Tên truyện đã tồn tại");
        } else {
          const idProd = listProd[listProd.length - 1].id.slice(2);
          const item = {
            id: "PD" + (parseInt(idProd) + 1),
            ten_truyen: this.state.ten_truyen,
            ten_the_loai: this.state.ten_the_loai,
            trang_thai: this.state.trang_thai,
            do_dai: this.state.do_dai,
            ten_tac_gia: this.state.ten_tac_gia,
          };
          listProd.push(item);
          this.setState({
            list: listProd,
          });
          this.newSession(this.state.list);
          alert("Thêm truyện mới thành công!");
          this.state.ten_truyen = "";
          this.state.ten_the_loai = "";
          this.state.trang_thai = "";
          this.state.do_dai = "";
          this.state.ten_tac_gia = "";
        }
      } else {
        alert("Chưa điền đầy đủ thông tin!");
      }
      // sửa
    } else {
      const newList = this.state.list.map((item) => {
        if (item.id === this.state.id) {
          const updatedItem = {
            ...item,
            ten_truyen: this.state.ten_truyen,
            ten_the_loai: this.state.ten_the_loai,
            trang_thai: this.state.trang_thai,
            do_dai: this.state.do_dai,
            ten_tac_gia: this.state.ten_tac_gia,
          };

          return updatedItem;
        }

        return item;
      });

      this.setState({
        list: newList,
        data: newList,
      });
      this.newSession(newList);
      alert("Sửa thành công");
      this.state.id = "";
      this.handleClose();
    }
  }
  // xóa
  handleDelete(id) {
    if (id) {
      const rs = confirm("Bạn có chắc muốn xóa không");
      if (rs) {
        let filtered = this.state.list.filter((item) => item.id !== id);
        this.setState({ list: filtered, data: filtered }, () => {
          console.log(this.state);
        });
        this.newSession(filtered);
      }
    } else {
      alert("Oh no!");
    }
  }
  // mở form cập nhật
  handleUpdate(id) {
    const prod = this.state.list.find((list) => list.id === id);
    this.setState((state) => {
      state.id = prod.id;
      state.ten_truyen = prod.ten_truyen;
      state.ten_the_loai = prod.ten_the_loai;
      state.trang_thai = prod.trang_thai;
      state.do_dai = prod.do_dai;
      state.ten_tac_gia = prod.ten_tac_gia;
      state.titleButton = "Cập nhật";
      state.titleNavbar = "Sửa thể loại";
      return state;
    });
    // mở popup
    this.popupRef.current.el.f7Modal.open();
  }
  // đóng popup
  handleClose() {
    if (this.state.id === "") {
    } else {
      const rs = confirm("Hủy thay đổi");
    }
    this.popupRef.current.el.f7Modal.close();
    this.setState((state) => {
      state.id = "";
      state.ten_truyen = "";
      state.ten_the_loai = "";
      state.trang_thai = "";
      state.do_dai = "";
      state.ten_tac_gia = "";
      state.titleButton = "Thêm truyện mới";
      state.titleNavbar = "Thêm";
      return state;
    });
  }
  // tìm kiếm truyện
  handleSearch(event) {
    this.setState({
      ten_truyen: event.target.value.toLowerCase(),
    });
    const name = this.state.ten_truyen;
    if (name.length > 1) {
      const list_search = this.state.list.filter((list) => {
        return list.ten_truyen.toLowerCase().includes(name.toLowerCase());
      });
      this.setState({
        data: list_search,
      });
    } else {
      this.getData();
    }
  }
  // tạo session lưu thông tin truyện tạm thời
  newSession(data) {
    sessionStorage.removeItem("book");
    const rs = JSON.stringify(data);
    sessionStorage.setItem("book", rs);
  }
  getData() {
    const rs = JSON.parse(sessionStorage.getItem("book"));
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
          <Navbar title="Quản lý truyện tranh" backLink="Back" />
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
                link="/category"
                title="Thể loại"
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
        <BlockTitle>Danh sách truyện</BlockTitle>
        <Row>
          <Col width="20">
            <Button fill raised popupOpen="#product" id="add">
              Thêm truyện mới
            </Button>
            <Button fill raised popupOpen="#product" id="add-s">
              +
            </Button>
          </Col>
          <Col width="30">
            <List form>
              <ListInput
                type="text"
                name="ten_truyen"
                placeholder="Nhập tên truyện muốn tìm kiếm...."
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
            <Col width="10">Mã truyện</Col>
            <Col width="20">Tên truyện</Col>
            <Col width="10">Thể loại</Col>
            <Col width="10">Độ dài</Col>
            <Col width="15">Trạng thái</Col>
            <Col width="10">Tên tác giả</Col>
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
              <Col width="20">{item.ten_truyen}</Col>
              <Col width="10">{item.ten_the_loai}</Col>
              <Col width="10">
                {new Intl.NumberFormat("en").format(item.do_dai)} chương
              </Col>
              <Col width="15">{item.trang_thai}</Col>
              <Col width="10" style={{ color: "blue" }}>
                {item.ten_tac_gia}
              </Col>
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
                  <ListInput value="Tên truyện" readonly></ListInput>
                  <ListInput
                    type="text"
                    name="ten_truyen"
                    placeholder="Nhập tên truyện"
                    value={this.state.ten_truyen}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput value="Tên tác giả" readonly></ListInput>
                  <ListInput
                    type="text"
                    name="ten_tac_gia"
                    placeholder="Nhập tên tác giả"
                    value={this.state.ten_tac_gia}
                    onChange={this.handleChange}
                  ></ListInput>
                  <ListInput value="Tên thể loại" readonly></ListInput>
                  <ListInput
                    type="text"
                    name="ten_the_loai"
                    placeholder="Nhập tên thể loại"
                    value={this.state.ten_the_loai}
                    onChange={this.handleChange}
                  ></ListInput>

                  <ListInput value="Trạng thái truyện" readonly></ListInput>
                  <ListInput
                    type="text"
                    name="trang_thai"
                    placeholder="Nhập trạng thái truyện"
                    value={this.state.trang_thai}
                    onChange={this.handleChange}
                  ></ListInput>

                  <ListInput value="Độ dài truyện" readonly></ListInput>
                  <ListInput
                    type="number"
                    name="do_dai"
                    placeholder="Nhập độ dài"
                    value={this.state.do_dai}
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
