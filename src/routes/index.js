import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import Receipt from '../pages/receipt/Receipt';

// Auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));

// Dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard/index.js'));

const Pos =  React.lazy(() => import('../pages/pos'));
const Sales =  React.lazy(() => import('../pages/sales/Sales'));
const ProductsList =  React.lazy(() => import('../pages/products/ProductsList'));
const CategoriesList =  React.lazy(() => import('../pages/categories/CategoriesList'));
const CustomersList =  React.lazy(() => import('../pages/customers/CustomersList'));
const RidersList =  React.lazy(() => import('../pages/riders/RidersList'));

// Calendar
// const CalendarApp = React.lazy(() => import('../pages/calendar/Calendar'));

// Handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// Root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// Dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    // header: 'Navigation',
    component: Dashboard,
    roles: ['Admin'],
    route: PrivateRoute
};

// POS
const posRoutes = {
    path: '/pos',
    name: 'POS',
    icon: FeatherIcon.Activity,
    header: 'Sales',
    component: Pos,
    roles: ['Admin'],
    route: PrivateRoute
};

// Sales
const salesRoutes = {
  path: "/sales",
  name: "Sales",
  icon: FeatherIcon.ShoppingBag,
  component: Sales,
  roles: ["Admin"],
  route: PrivateRoute,
  children: [
    {
      path: "/receipt",
      name: 'Receipt',
      component: Receipt,
      route: Route,
    },
  ],
};

// Product
const productRoutes = {
    path: '/product',
    name: 'Product',
    header: 'Products',
    icon: FeatherIcon.Box,
    roles: ['Admin'],
    route: PrivateRoute,
    children: [
        {
            path: '/product/categories',
            name: 'Categories',
            component: CategoriesList,
            route: Route,
        },
        {
            path: '/product/all',
            name: 'Products',
            component: ProductsList,
            route: Route,
        },
        {
            path: '/product/in-store',
            name: 'In-store Products',
            component: ProductsList,
            route: Route,
        },
    ]
};

// People
const peopleRoutes = {
    path: '/people',
    name: 'People',
    header: 'People',
    icon: FeatherIcon.Users,
    roles: ['Admin'],
    route: PrivateRoute,
    children: [
        {
            path: '/people/customers',
            name: 'Customers',
            component: CustomersList,
            route: Route,
        },
        {
            path: '/people/riders',
            name: 'Riders',
            component: RidersList,
            route: Route,
        }
    ]
};

// Auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    authRoutes,
    dashboardRoutes,
    posRoutes,
    salesRoutes,
    productRoutes,
    peopleRoutes
];

const authProtectedRoutes = [
    dashboardRoutes,
    posRoutes,
    salesRoutes,
    productRoutes,
    peopleRoutes
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
