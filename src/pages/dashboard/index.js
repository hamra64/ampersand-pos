import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
//   UncontrolledButtonDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
  Card,
  CardBody,
//   Media,
} from "reactstrap";
// import Flatpickr from "react-flatpickr";
import {
//   ChevronDown,
//   Mail,
//   Printer,
//   File,
//   Users,
//   Image,
  ShoppingBag,
} from "react-feather";

import { getLoggedInUser } from "../../helpers/authUtils";
import Loader from "../../components/Loader";

import OverviewWidget from "../../components/OverviewWidget";
// import Statistics from "./components/Statistics";
// import RevenueChart from "./components/RevenueChart";
import TargetChart from "./components/TargetChart";
import SalesChart from "./components/SalesChart";
import Orders from "./components/Orders";
import Performers from "./components/Performers";
import { orderTypeReport } from "../../data/order-type-report";
import StatisticsChartWidget from "../../components/StatisticsChartWidget";
import { categories } from "../../data/categories";
import { topRiders } from "../../data/top_riders";
// import Tasks from './components/Tasks';
// import Chat from './components/Chat';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

    this.state = {
      user: getLoggedInUser(),
      filterDate: [oneWeekAgo, new Date()],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          {/* preloader */}
          {this.props.loading && <Loader />}

          <Row className="page-title align-items-center">
            <Col sm={4} xl={6}>
              <h1 className="mb-1 mt-0">Dashboard</h1>
            </Col>
            {/* <Col sm={8} xl={6}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr value={this.state.filterDate}
                                        onChange={date => { this.setState({ filterDate: date }) }} options={{ mode: "range" }}
                                        className="form-control" />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary" className="dropdown-toggle">
                                        <i className='uil uil-file-alt mr-1'></i>Download
                                            <i className="icon ml-1"><ChevronDown /></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>
                        </Col> */}
          </Row>

          {/* stats */}
          {/* <Statistics></Statistics> */}

          {/* charts */}
          <Row>
            <Col xl={3}>
              <OverviewWidget
                title={"Today"}
                items={[
                  {
                    title: "121,000",
                    description: "Total Number of Sales",
                    icon: ShoppingBag,
                  },
                  {
                    title: `¢${2987}`,
                    description: "Total Sales",
                    icon: ShoppingBag,
                  },
                  // { title: '$21.5', description: 'Revenue Per Visitor', icon: ShoppingBag }
                ]}
              ></OverviewWidget>
            </Col>

            <Col xl={9}>
              <Card>
                <CardBody className="p-0">
                  <h5 className="card-title header-title border-bottom p-3 mb-0">
                    Order Type Overview
                  </h5>

                  <Row>
                    {orderTypeReport.map((item, index) => {
                      return (
                        <Fragment key={index}>
                            <Col xl={3}>
                            <StatisticsChartWidget
                                description={item.order_type}
                                title={`¢${item.amount}`}
                                data={item.data}
                                trend={{
                                textClass: "text-primary",
                                //   icon: "uil uil-arrow-up",
                                value: "10 Sales",
                                }}
                            ></StatisticsChartWidget>
                            </Col>
                        </Fragment>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>

              {/* <Statistics></Statistics> */}
              {/* <Statistics></Statistics> */}
            </Col>

            <Col xl={3}></Col>
          </Row>

          <Row>
            {/* <Col xl={6}>
              <RevenueChart />
            </Col> */}
            <Col xl={6}>
              <TargetChart />
            </Col>
            <Col xl={6}>
              <SalesChart categories={categories}/>
            </Col>
          </Row>

          {/* charts */}
          <Row>
            {/* <Col xl={5}>
              <SalesChart categories={categories} />
            </Col> */}
            <Col xl={12}>
              <Orders />
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Performers 
                title="Top 5 Riders for Last Month"
                type="riders"
                headings={["#", "Rider Name","Count", "Total Delivery Charge"]}
                data={topRiders} />
            </Col>
            <Col xl={6}>
              <Performers 
                title="Top 5 Selling Products for Last Month"
                type="product"
                headings={["#", "Product Name","Count", "Value"]}
                />
            </Col>
            <Col xl={6}>
              <Performers 
                title="Top 5 Locations for Last Month"
                type="location"
                headings={["#", "Location", "Total Deliveries", "Total Sum"]}
                 />
            </Col>
            <Col xl={6}>
              <Performers 
                title="Top 5 Customers for Last Month" 
                type="customers"
                headings={["#", "Name", "Phone", "Location", "# of Deliveries", "Value of Deliveries"]}
                />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
