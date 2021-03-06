import React from 'react';
import moment from "moment";
import ReactTable from "react-table";
import ReactDatetime from "react-datetime";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { getScheduleList, createNewSchedule, updateExistingSchedule, deleteExistingSchedule } from "../../queries/schedule";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Row
} from "reactstrap";

const token = localStorage.getItem('auth-token');

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/graphql',
    headers: {
        authorization: token ? `Bearer ${token}` : "",
    }
});

class Customer extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.state = {
            //************************STEP 1 SOLD***********************//
            ScheduleId: '',
            DateSold: moment(),
            Address: '',
            City: '',
            StateName: '',
            ZipCode: '',
            GoogleMaps: '',
            CustomerName: '',
            CustomerPhone: '',
            Information: '',
            //************************ARRAYS SUPPORT*******************//
            //list todos os schedules
            list: [],
            alert: null,
            msg: ''


        };
        //********************ATTRIBUTES***************************//
        this.setDateSold = this.setDateSold.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setStateName = this.setStateName.bind(this);
        this.setZipCode = this.setZipCode.bind(this);
        this.setGoogleMaps = this.setGoogleMaps.bind(this);
        this.setCustomerName = this.setCustomerName.bind(this);
        this.setCustomerPhone = this.setCustomerPhone.bind(this);
        this.setInformation = this.setInformation.bind(this);

        //********************EVENTS******************************//

        this.createSchedule = this.createSchedule.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);

        this.selectEdit = this.selectEdit.bind(this);

        //Alerts
        this.successCreatedAlert = this.successCreatedAlert.bind(this);
        this.successUpdatedAlert = this.successUpdatedAlert.bind(this);
        this.successDeleteAlert = this.successDeleteAlert.bind(this);




        // Set the apollo client
        this.client = props.client;
    }


    setDateSold(evento) {
        this.setState({ DateSold: moment(evento) });
    }

    setAddress(evento) {
        this.setState({ Address: evento.target.value });
    }

    setCity(evento) {
        this.setState({ City: evento.target.value });
    }

    setStateName(evento) {
        this.setState({ StateName: evento.target.value });
    }

    setZipCode(evento) {
        this.setState({ ZipCode: evento.target.value });
    }

    setGoogleMaps(evento) {
        this.setState({ GoogleMaps: evento.target.value });
    }

    setCustomerName(evento) {
        this.setState({ CustomerName: evento.target.value });
    }

    setCustomerPhone(evento) {
        this.setState({ CustomerPhone: evento.target.value });
    }

    setInformation(evento) {
        this.setState({ Information: evento.target.value });
    }

    //Select the schedule for update
    selectEdit(props) {

        this.setState({
            DateSold: moment(props.original.DateSold),
            Address: props.original.Address,
            City: props.original.City,
            StateName: props.original.StateName,
            ZipCode: props.original.ZipCode,
            GoogleMaps: props.original.GoogleMaps,
            CustomerName: props.original.CustomerName,
            CustomerPhone: props.original.CustomerPhone,
            Information: props.original.Information,
            FollowUp: props.original.FollowUp,
            ScheduleId: props.original.ScheduleId
        });
    }

    //Select the schedule for update
    createSchedule() {
        var scheduleInput = {
            DateSold: this.state.DateSold,
            Address: this.state.Address,
            City: this.state.City,
            StateName: this.state.StateName,
            ZipCode: this.state.ZipCode,
            GoogleMaps: this.state.GoogleMaps,
            CustomerName: this.state.CustomerName,
            CustomerPhone: this.state.CustomerPhone,
            Information: this.state.Information,
        }
        client.mutate({
            mutation: createNewSchedule,
            variables: { scheduleInput },
            optimisticResponse: {},
            refetchQueries: () => [{ query: getScheduleList }]

        }).then(res => {




            this.clearImputs();
            this.successCreatedAlert();
        }).catch(error => {
            this.setState({ msg: error.message });
        });
    }




    //Post object for update schedule
    updateCustomer(evento) {

        var scheduleInput = {
            DateSold: this.state.DateSold,
            Address: this.state.Address,
            City: this.state.City,
            StateName: this.state.StateName,
            ZipCode: this.state.ZipCode,
            GoogleMaps: this.state.GMaps,
            CustomerName: this.state.CustomerName,
            CustomerPhone: this.state.CustomerPhone,
            Information: this.state.Information,
            ScheduleId: this.state.ScheduleId
        };

        client.mutate({
            mutation: updateExistingSchedule,
            variables: { scheduleInput },
            optimisticResponse: {},

            refetchQueries: () => [{ query: getScheduleList }]


        }).then(res => {


            console.log(res);

            this.successCreatedAlert();

        }).catch(error => {
            this.setState({ msg: error.message });
        });

        this.clearImputs();
    }

    //Deletar schedule selecionado.
    removeCustomer(props) {

        this.setState({ ScheduleId: props.original.ScheduleId })

        client.mutate({
            mutation: deleteExistingSchedule,
            variables: { id: this.state.ScheduleId },
            optimisticResponse: {},
            refetchQueries: () => [{ query: getScheduleList }]

        }).then(res => {
            this.successCreatedAlert();
        }).catch(error => {
            this.setState({ msg: error.message });
        });
    }

    componentDidMount() {


    }

    clearImputs() {
        this.setState({
            ScheduleId: '',
            DateSold: moment(),
            Address: '',
            City: '',
            StateName: '',
            ZipCode: '',
            GoogleMaps: '',
            CustomerName: '',
            CustomerPhone: '',
            Information: '',
            ScheduleId: null
        });
    }

    successCreatedAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    Job created successfully!
                </SweetAlert>
            )
        });
    }

    successUpdatedAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    Job updated successfully!
                </SweetAlert>
            )
        });
    }

    successDeleteAlert(id) {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={() => this.removeCustomer(id)}
                    onCancel={() => this.hideAlert()}
                >
                    You will not be able to recover this file!
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }





    render() {






        var columns = [
            {
                Header: "#",
                Cell: props => {
                    return (
                        <div>
                            <Button className="btn-icon btn-simple" color="success" size="sm" onClick={() => { this.selectEdit(props) }}>
                                <i className="fa fa-hand-pointer" />
                            </Button>{` `}
                            <Button className="btn-icon btn-simple" color="danger" size="sm" onClick={() => { this.successDeleteAlert(props) }}>
                                <i className="fa fa-times" />
                            </Button>{` `}
                        </div>
                    )
                }
            },
            {
                Header: "Date Sold",
                accessor: "DateSold",
                id: "DateSold",
                accessor: "DateSold"
            },
            {
                Header: "Address",
                accessor: "Address",
            },
            {
                Header: "City",
                accessor: "City",
            },
            {
                Header: "Customer Name",
                accessor: "CustomerName",
            },
            {
                Header: "Customer Phone",
                accessor: "CustomerPhone",
            },
        ];


        const UpdateCustomerList = () => {

            var scheduleInput = {
                DateSold: this.state.DateSold,
                Address: this.state.Address,
                City: this.state.City,
                StateName: this.state.StateName,
                ZipCode: this.state.ZipCode,
                GoogleMaps: this.state.GMaps,
                CustomerName: this.state.CustomerName,
                CustomerPhone: this.state.CustomerPhone,
                Information: this.state.Information,
                ScheduleId: this.state.ScheduleId
            };

            client.mutate({

                mutation: updateExistingSchedule,
                variables: { scheduleInput },
                optimisticResponse: {},

                update(client, { data: { updateCustomerList } }) {
                  
                  
                    const { schedules } = client.readQuery({ query: getScheduleList });
                  
                    
                  
                    client.writeQuery({

                        query: getScheduleList,

                        data: { schedules: schedules.concat([updateCustomerList]) },

                    })
                    console.log(schedules);
                },
                refetchQueries: () => [{ query: getScheduleList }]

            }).then(res => {
                this.successCreatedAlert();

            }).catch(error => {
                this.setState({ msg: error.message });
            });

        };




        return (




            <div className="content">
                <Row>
                    <Col md="5">
                        <Card >
                            {this.state.alert}
                            <CardHeader>
                                <CardTitle tag="h4">Register Customer Job</CardTitle>
                            </CardHeader>
                            <CardBody>

                                <Form action="#" onSubmit={this.createSchedule}>
                                    <blockquote className="blockquote">
                                        <label>Date Sold</label>
                                        <FormGroup>
                                            <ReactDatetime
                                                inputProps={{
                                                    className: "form-control",
                                                    placeholder: "Date sold",
                                                }}
                                                id="DateSold"
                                                name="DateSold"
                                                value={this.state.DateSold}
                                                onChange={this.setDateSold}
                                            />
                                        </FormGroup>
                                        <label>Address</label>
                                        <FormGroup>
                                            <Input type="text" id="Address" name="Address" value={this.state.Address} onChange={this.setAddress} />
                                        </FormGroup>
                                        <label>City</label>
                                        <FormGroup>
                                            <Input type="text" id="City" name="City" value={this.state.City} onChange={this.setCity} />
                                        </FormGroup>
                                        <label>State</label>
                                        <FormGroup>
                                            <Input type="text" id="StateDesc" name="StateDesc" value={this.state.StateName} onChange={this.setStateName} />
                                        </FormGroup>
                                        <label>ZipCode</label>
                                        <FormGroup>
                                            <Input type="text" value={this.state.ZipCode} onChange={this.setZipCode} />
                                        </FormGroup>
                                        <label>Link Google Maps</label>
                                        <FormGroup>
                                            <Input type="text" value={this.state.GoogleMaps} onChange={this.setGoogleMaps} />
                                        </FormGroup>
                                        <label>Contact Name</label>
                                        <FormGroup>
                                            <Input type="text" value={this.state.CustomerName} onChange={this.setCustomerName} />
                                        </FormGroup>
                                        <label>Phone Number</label>
                                        <FormGroup>
                                            <Input type="text" value={this.state.CustomerPhone} onChange={this.setCustomerPhone} />
                                        </FormGroup>
                                        <label>Information</label>
                                        <FormGroup>
                                            <textarea className="form-control" type="text" value={this.state.Information} onChange={this.setInformation} />
                                        </FormGroup>
                                    </blockquote>

                                </Form>

                                <Button className="btn-fill" color="info" type="submit" onClick={this.createSchedule}>Create New</Button>
                                <Button className="btn-fill" color="success" onClick={UpdateCustomerList} disabled={!this.state.ScheduleId}>Save Editions</Button>
                                <Button className="btn-fill" color="warning" onClick={this.cancelForm} disabled={!this.state.ScheduleId}>Cancel</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Customer Job List</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ApolloProvider client={client}>
                                    <Query query={getScheduleList}>

                                        {({ data, error, loading }) => {
                                            if (error) return '💩 Oops!';
                                            if (loading) return 'Patience young grasshopper...';
                                            return (
                                                <div>
                                                    <ReactTable
                                                        data={data.schedules}
                                                        columns={columns}
                                                        defaultPageSize={10}
                                                        filterable

                                                        className="-striped -highlight"
                                                        getTdProps={(state, rowInfo, column, instance) => {
                                                            if (rowInfo === undefined) {
                                                                return {}; // for blank rows...
                                                            }
                                                            rowInfo.field = column.id;
                                                            return {};
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }}
                                    </Query>
                                </ApolloProvider>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </div >
        );
    }
}

export default Customer;