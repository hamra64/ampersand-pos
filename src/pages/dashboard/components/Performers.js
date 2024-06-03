import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

import User from '../../../components/User';

const topRiders = [
        {
            name: "Emmanuel",
            count: 68,
            totalDeliveryCharge: 14565
        }
    ]

const BasicTable = ({headings, data}) => {
    return (
        <Table className="mb-0">
            <thead>
                <tr>
                {headings.map((heading, index) => {
                    return (
                        <th key={index}>{heading}</th>
                    );
                })}
                </tr>
            </thead>
            <tbody>
                {data.map((d, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td><User avatar={null} name={d.name} description={""} /></td>
                            <td>{d.count}</td>
                            <td>{d.totalDeliveryCharge}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const Performers = ({title, headings}) => {
    return (
        <Card>
            <CardBody className="pb-0 pt-2">
                <h5 className="mb-3 header-title">{title}</h5>
                <BasicTable headings={headings} data={topRiders} />
            </CardBody>
        </Card>
    );
};

export default Performers;
