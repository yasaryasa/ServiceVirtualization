import React from 'react';
import { Button, Divider, Switch } from 'ykb-ui';

class EditComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
        this.isEnabled = null;
        this.handleEditForm = this.handleEditForm.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        fetch("http://owdevapp:6060/IstCLI/test/findById?id=" + this.props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                    //alert(this.state.data.createdBy);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleEditForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            id: formData.get('id'),
            serviceName: formData.get('serviceName'),
            moduleName: formData.get('moduleName'),
            methodName: formData.get('methodName'),
            inData: formData.get('inData'),
            outData: formData.get('outData'),
            createDate: formData.get('createDate'),
            createdBy: formData.get('createdBy'),
            serviceUserName: formData.get('serviceUserName'),
            hostName: formData.get('hostName'),
            userEmail : formData.get('userEmail'),
            isEnabled: this.isEnabled
        }
        if (data.moduleName === "" || data.serviceName === "" || data.methodName === "") {
            alert("Lütfen zorunlu alanları doldurun!");
            return false;
          }

        fetch('http://owdevapp:6060/IstCLI/test/update/' + formData.get('id'), {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (response) => {
                    return this.props.history.push('/home');
                },
                (error) => {
                    alert(error.message);
                }
            );
    }


    cancelEdit(event) {
        return this.props.history.push('/home');
    }


    render() {
        const { error, isLoaded, data } = this.state;
        //this.isEnabled = data.isEnabled;
        const onChange = value => {
            if (value === true) {
                this.isEnabled = 1;
            } else {
                this.isEnabled = 0;
            }
        };

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let button;
            if (this.state.data.isEnabled) {
                this.isEnabled = 1;
                button = <Switch onChange={onChange} defaultChecked={true} />
            } else {
                this.isEnabled = 0;
                button = <Switch onChange={onChange} defaultChecked={false} />
            }

            return (
                <div class="table-wrapper">
                    <h3>Güncellenecek Servis Bilgileri</h3>
                    <Divider></Divider>
                    
                    <form onSubmit={this.handleEditForm}>
                        <input type="hidden" id="id" name="id" value={data.id} ></input>
                        <input type="hidden" id="createdBy" name="createdBy" value={data.createdBy} ></input>
                        <input type="hidden" id="userEmail" name="userEmail" value={data.userEmail} ></input>
                        <input type="hidden" id="createDate" name="createDate" value={data.createDate} ></input>
                        <div class="form-group row required"><label class="col-lg-2 col-form-label control-label">Modül Adı</label>
                            <div class="col-lg-10">
                                <input type="text" id="moduleName" name="moduleName" defaultValue={data.moduleName} class="form-control"></input>
                            </div>
                        </div>
                        <div class="form-group row required"><label class="col-lg-2 col-form-label control-label">Servis Adı</label>
                            <div class="col-lg-10">
                                <input type="text" id="serviceName" name="serviceName" defaultValue={data.serviceName} class="form-control"></input>
                            </div>
                        </div>
                        <div class="form-group row required"><label class="col-lg-2 col-form-label control-label">Operasyon Adı</label>
                            <div class="col-lg-10">
                                <input type="text" id="methodName" name="methodName" defaultValue={data.methodName} class="form-control"></input>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">In Data</label>
                            <div class="col-lg-10">
                                <textarea defaultValue={data.inData} id="inData" name="inData" class="form-control" rows="8"></textarea>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Out Data</label>
                            <div class="col-lg-10">
                                <textarea defaultValue={data.outData} id="outData" name="outData" class="form-control" rows="8"></textarea>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Kullanıcı Adı</label>
                            <div class="col-lg-10">
                                <input type="text" defaultValue={data.serviceUserName} id="serviceUserName" name="serviceUserName" class="form-control"></input>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Makine Adı</label>
                            <div class="col-lg-10">
                                <input type="text" defaultValue={data.hostName} id="hostName" name="hostName" class="form-control"></input>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Aktif Mi?</label>
                            <div class="col-lg-10">
                                {button}
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4">
                                <Button type="danger" onClick={this.cancelEdit}>İptal</Button>
                                <Button type="success" htmlType="submit">Kaydet</Button>
                            </div>
                        </div>
                    </form>
                </div>);
        }
    }
}
export default EditComponent;