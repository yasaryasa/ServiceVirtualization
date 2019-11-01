import React from 'react';
import { Icon } from 'ykb-ui';
import { TiSocialSkype} from "react-icons/ti";
import { FaBitcoin } from "react-icons/fa";

import {
    Link,
} from 'react-router-dom';
class ListComponent extends React.Component {

    rootUrl = "http://owdevapp:6060/IstCLI/";
    getAllUrl = "test/getAll";
    getAllByUserId = "test/getAllByUserId/";
    deleteByIdUrl = "test/deleteById/";

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            filterValue: null,
            selectedIdForDelete: null,
            items: []
        };
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    componentDidMount() {
        const userId = localStorage.getItem('USERID');
        if (userId === null) {
            return this.props.history.push('/login');
        }
        fetch(this.rootUrl + this.getAllByUserId + userId, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    error.message = "Please contact with Yaşar Yaşa, with a glass of Iced Chai Tea Latte to solve the problem :)";
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleDeleteClick() {
        fetch(this.rootUrl + this.deleteByIdUrl + this.state.selectedIdForDelete, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.result === true) {
                        //return this.props.history.push('/home');
                        window.location.reload();
                    } else {
                        alert("Hata - " + response.result + " - " + response.oid);
                    }

                },
                (error) => {
                    alert(error.message);
                }
            )
    }


    deleteData = (event) => {
        this.setState({ selectedIdForDelete: event.target.getAttribute('data-id') });
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div style={{ marginTop: 30 }} className="alert alert-danger" role="alert">
                {error.message}
            </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2><b>Sanallaştırılmış Servisler</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <Link to={"/new-service/"} className="ykb-ui-button ykb-ui-button-success pull-right" style={{ padding: '9px', textDecoration: 'none' }}><span class="ykb-ui-button-text">Yeni Servis Tanımı</span></Link>
                            </div>
                        </div>
                    </div>
                    {/*<form>
                        <div className="row">
                            <div className="col-sm-offset-16 col-sm-4" style={{ paddingBottom: '10px'}}>
                                <input type="text" id="moduleName" name="moduleName" placeholder="Ara" className="form-control" ></input>
                            </div>

                        </div>
                    </form>*/}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Modül Adı</th>
                                <th scope="col">Servis Adı</th>
                                <th scope="col">Operasyon Adı</th>
                                <th scope="col">Kullanıcı Adı</th>
                                <th scope="col">Durum</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.moduleName}
                                    </td>
                                    <td>
                                        {item.serviceName.substring(item.serviceName.lastIndexOf(".") + 1)}
                                    </td>
                                    <td>
                                        {item.methodName}
                                    </td>
                                    <td>
                                        {item.serviceUserName}
                                    </td>
                                    <td>
                                        {item.isEnabled === 1 ? <span className="badge badge-pill badge-success">Aktif</span> : <span className="badge badge-pill badge-danger">Pasif</span>}
                                    </td>
                                    <td>
                                        <Link to={"/edit/" + item.id} className="edit"><TiSocialSkype size="28" /></Link>
                                        <a href="#deleteEmployeeModal" onClick={this.deleteData} className="delete" data-toggle="modal"><FaBitcoin size="28" /><Icon name="trash" size="28" className="danger" data-id={item.id} data-toggle="tooltip" /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div id="deleteEmployeeModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div>
                                    <div className="modal-header">
                                        <h4 className="modal-title">Servis Tanımını Sil</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Servis Tanımını silmek istediğinizden emin misiniz?</p>
                                        <p className="text-warning"><small>Bu işlem geri alınamaz.</small></p>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="button" className="btn btn-default" data-dismiss="modal" value="İptal" />
                                        <input type="button" className="btn btn-danger" value="Sil" onClick={this.handleDeleteClick} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default ListComponent;