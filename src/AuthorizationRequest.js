import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Navbar } from 'reactstrap';


class AuthorizationRequest extends Component {

    emptyItem = {//поля как в методе
        login: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        // if (this.props.match.params.id !== 'new') {
        //     const client = await (await fetch(`/clients/${this.props.match.params.id}`)).json();
        //     this.setState({item: client});
        // }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('https://localhost:7157/Authorization', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        //this.props.history.push('/Authorization');
    }

    /* render() {
        const { item } = this.state;
        const title = <h2>Login</h2>;

        return <div>
            <Navbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" value={item.login || ''}
                            onChange={this.handleChange} autoComplete="login" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Email</Label>
                        <Input type="text" name="password" id="password" value={item.password || ''}
                            onChange={this.handleChange} autoComplete="password" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Submit</Button>{' '}
                        <Button color="secondary" tag={Link} to="/Authorization">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    } */


    render() {
        const { item } = this.state;
        const title = <h2>Login</h2>;

        return <div>
            <Navbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" value={item.login || ''}
                            onChange={this.handleChange} autoComplete="login" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="text" name="password" id="password" value={item.password || ''}
                            onChange={this.handleChange} autoComplete="password" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Submit</Button>{' '}
                        <Button color="secondary" tag={Link} to="/Authorization">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AuthorizationRequest);