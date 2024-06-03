import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import {
  Menu,
  X,
  Search,
  Settings,
  User,
  HelpCircle,
  Lock,
  LogOut,
  Grid,
} from "react-feather";

import { showRightSidebar } from "../redux/actions";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
// import LanguageDropdown from './LanguageDropdown';

import logo from "../assets/images/logo.png";
import profilePic from "../assets/images/users/avatar-1.jpg";

import posIcon from "../assets/images/pos.png";

const Notifications = [
  {
    id: 1,
    text: "New user registered",
    subText: "1 min ago",
    icon: "uil uil-user-plus",
    bgColor: "primary",
  },
  {
    id: 2,
    text: "Karen Robinson",
    subText: "Wow ! this admin looks good and awesome design",
    icon: "uil uil-comment-message",
    bgColor: "success",
  },
  {
    id: 3,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    icon: "uil uil-comment-message",
    bgColor: "danger",
  },
  {
    id: 4,
    text: "New user registered",
    subText: "1 day ago",
    icon: "uil uil-user-plus",
    bgColor: "info",
  },
];

const ProfileMenus = [
  {
    label: "My Account",
    icon: User,
    redirectTo: "/",
  },
  {
    label: "Settings",
    icon: Settings,
    redirectTo: "/",
  },
  {
    label: "Support",
    icon: HelpCircle,
    redirectTo: "/",
  },
  {
    label: "Lock Screen",
    icon: Lock,
    redirectTo: "/",
  },
  {
    label: "Logout",
    icon: LogOut,
    redirectTo: "/account/logout",
    hasDivider: true,
  },
];

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.state = { dropdownOpen: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.handleRightSideBar = this.handleRightSideBar.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  /**
   * Toggles the right sidebar
   */
  handleRightSideBar = () => {
    this.props.showRightSidebar();
  };

  render() {
    return (
      <React.Fragment>
        <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
          <Container fluid>
            {/* logo */}
            <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
              <span className="logo-lg">
                <img src={logo} alt="" height="24" />
                <span className="d-inline h5 ml-2 text-logo">POS</span>
              </span>
              <span className="logo-sm">
                <img src={logo} alt="" height="24" />
              </span>
            </Link>

            {/* menu*/}
            <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
              <li className="">
                <button
                  className="button-menu-mobile open-left disable-btn"
                  onClick={this.props.openLeftMenuCallBack}
                >
                  <Menu className="menu-icon" />
                  <X className="close-icon" />
                </button>
              </li>
            </ul>

            <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
              <li className="d-none d-sm-block">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <Search />
                    </div>
                  </form>
                </div>
              </li>

              {/* <LanguageDropdown tag="li" /> */}

              {/* Apps */}
              <li>
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                  className="apps-list"
                  tag={"div"}
                  id="appsDropdown"
                >
                  <DropdownToggle
                    data-toggle="dropdown"
                    tag="a"
                    className="nav-link dropdown-toggle"
                    onClick={this.toggleDropdown}
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <Grid />
                    {/* <span className="noti-icon-badge"></span> */}
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-lg">
                    <div onClick={this.toggleDropdown}>
                      <div className="dropdown-item noti-title border-bottom">
                        <Row>
                          <Col>
                            <Link to="/pos" className="dropdown-icon-item">
                              <img src={posIcon} alt="POS" />
                              <span>POS</span>
                            </Link>
                          </Col>
                          <Col>
                            <Link to="/pos" className="dropdown-icon-item">
                              <img src={posIcon} alt="POS" />
                              <span>Call Center</span>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </li>

              {/* Notifications */}
              <NotificationDropdown notifications={Notifications} />

              {/* Settings */}
              <li className="notification-list">
                <button
                  className="btn btn-link nav-link right-bar-toggle"
                  onClick={this.handleRightSideBar}
                >
                  <Settings />
                </button>
              </li>

              {/* Profile */}
              <ProfileDropdown
                profilePic={profilePic}
                menuItems={ProfileMenus}
                username={"Joel Armah"}
                description="Admin"
              />
            </ul>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { showRightSidebar })(Topbar);
