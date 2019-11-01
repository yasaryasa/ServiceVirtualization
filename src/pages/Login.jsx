import React from "react";
import { Button, Form, TextInput, Icon } from "ykb-ui";
import "../index.css";

const FormItem = Form.Item;

export default class LoginComponent extends React.Component {
    rootUrl = "http://owdevapp:6060/IstCLI/";
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, error, values) {
        e.preventDefault();
        if (!error) {
            fetch(this.rootUrl + "user/login/" + values.username + "/" + values.password, { mode: 'cors' })
                .then(res => res.json())
                .then(
                    (response) => {
                        if (response.result === true) {
                            localStorage.setItem('USERID', response.userId);
                            localStorage.setItem('USEREMAIL', response.userEmail);
                            localStorage.setItem('USERNAME', response.userName);
                            return this.props.history.push('/home');
                        } else {
                            alert("Login Failed.  " + response.errorMessage);
                        }
                    },
                    (error) => {
                        alert(error.message);
                    }
                )

        }
    }

    render() {
        return (
            <div style={{ padding: '0 10px' }} className="row justify-content-md-center">
                <div class="col-4">
                    <Form
                        layout="vertical"
                        colSpan={{ xs: 24, sm: 24, md: 24, lg: 24 }}
                        onSubmit={this.handleSubmit}
                    >
                        {/* <FormItem>
                            <Form.Caption>Login Form</Form.Caption>
                        </FormItem> */}

                        <FormItem label="Kullanıcı Adı">
                            <TextInput
                                prefix={
                                    <Icon name="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                name="username"
                                label="Sicil"
                                validation={[{ required: true }]}
                            />
                        </FormItem>

                        <FormItem
                            label="Şifre"
                            colSpan={{ span: 24 }}
                        >
                            <TextInput
                                prefix={
                                    <Icon name="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                type="password"
                                name="password"
                                validation={[{ required: true }]}
                            />
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit" className="pull-right">
                                Giriş Yap
                </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}