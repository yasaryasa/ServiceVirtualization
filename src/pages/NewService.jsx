import React from 'react';
import '../App.css';
import Tooltip from '@material-ui/core/Tooltip';
import MButton from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PriorityHighIcon from '@material-ui/icons/Info';
import Icon from '@material-ui/core/Icon';
import { Divider, Button, Switch, Select } from 'ykb-ui';

class NewServiceComponent extends React.Component {
  moduleUrl = "hmndep/getOnlyTestEnvironment";
  interfaceUrl = "hmndep/getClassesOfArtifact/";
  methodUrl = "hmndep/getMethodsOfClass/";
  templateUrl = "test/getTemplateDTO/";
  rootUrl = "http://owdevapp:6060/IstCLI/";
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      groups: [],
      services: [],
      methods: [],
      templateData: null,
      outDataValue: null
    };
    this.isEnabled = 1;
    this.selectedServiceName = null;
    this.selectedArtifactName = null;
    this.selectedMethodName = null;
    this.handleCreateForm = this.handleCreateForm.bind(this);
    this.artifactChange = this.artifactChange.bind(this);
    this.interfaceChange = this.interfaceChange.bind(this);
    this.methodChange = this.methodChange.bind(this);
    this.cancelCreate = this.cancelCreate.bind(this);
    this.handleOutdataChange = this.handleOutdataChange.bind(this);
  }


  componentDidMount() {
    const userId = localStorage.getItem('USERID')
    if (userId === null) {
      return this.props.history.push('/login');
    }
    fetch(this.rootUrl + this.moduleUrl, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let groupsFromApi = data.map(module => { return { value: module.artifactId, label: module.artifactId } })
        this.setState({ groups: [{ value: '', display: '(Lütfen grup seçin...)' }].concat(groupsFromApi) });
      }).catch(error => {
        error.message = "Please contact with Yaşar Yaşa, with a glass of Iced Chai Tea Latte to solve the problem :)";
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  cancelCreate(event) {
    return this.props.history.push('/home');
  }


  handleCreateForm(event) {
    event.preventDefault();
    alert(localStorage.getItem('USEREMAIL'));
    const formData = new FormData(event.target);
    const data = {
      id: formData.get('id'),
      moduleName: this.selectedArtifactName,
      serviceName: this.selectedServiceName,
      methodName: this.selectedMethodName,
      inData: formData.get('inData'),
      outData: formData.get('outData'),
      createDate: formData.get('createDate'),
      serviceUserName: formData.get('serviceUserName'),
      createdBy: localStorage.getItem("USERID"),
      userEmail: localStorage.getItem("USEREMAIL"),
      hostName: formData.get('hostName'),
      isEnabled: this.isEnabled
    }
    console.log(data);
    if (data.moduleName === null || data.serviceName === null || data.methodName === null) {
      alert("Lütfen zorunlu alanları doldurun!");
      return false;
    }

    fetch(this.rootUrl + 'test/create', {
      method: 'POST',
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
          console.log(error)
          alert(error.message);
        }
      );
  }

  artifactChange(value) {
    this.selectedArtifactName = value;
    fetch(this.rootUrl + this.interfaceUrl + this.selectedArtifactName, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let classesFromApi = data.map(clazz => { return { value: clazz.className, label: clazz.className } })
        this.setState({ services: classesFromApi });
      }).catch(error => {
        error.message = "Please contact with Yaşar Yaşa, with a glass of Iced Chai Tea Latte to solve the problem :)";
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  interfaceChange(value) {
    this.selectedServiceName = value;
    let v = this.rootUrl + this.methodUrl + this.selectedArtifactName + "/" + this.selectedServiceName;
    fetch(v, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let methodsFromApi = data.map(clazz => { return { value: clazz.methodName, label: clazz.methodName } })
        this.setState({ methods: methodsFromApi });
      }).catch(error => {
        error.message = "Please contact with Yaşar Yaşa, with a glass of Iced Chai Tea Latte to solve the problem :)";
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  methodChange(value) {
    this.selectedMethodName = value;
    let requUrl = this.rootUrl + this.templateUrl + this.selectedServiceName + "/" + this.selectedMethodName;
    fetch(requUrl, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let temp = data.value;
        this.setState({ templateData: temp });
      }).catch(error => {
        alert("İşlem yaparken hata alındı. Detayı : " + error.message);
      });
  }

  handleOutdataChange(event) {
    this.setState({ templateData: event.target.value });
  }

  render() {
    const onChangeActive = value => {
      if (value === true) {
        this.isEnabled = 1;
      } else {
        this.isEnabled = 0;
      }
    };

    const { groups, services, methods, templateData } = this.state;

    return (
      <div class="table-wrapper">
        <div class="table-title">
          <h2><b>Yeni Servis Tanımı</b> </h2>
          <Divider></Divider>
        </div>
        <form onSubmit={this.handleCreateForm} style={{paddingBottom:50}}>
          <div class="form-group row required"><label class="col-lg-2 col-form-label control-label font-weight-bold">Modül Adı</label>
            <div class="col-lg-10">
              <Select data={groups} onChange={this.artifactChange} showSearch={true} optionFilterProp="value" />
            </div>
          </div>
          <div class="form-group row required"><label class="col-lg-2 col-form-label control-label font-weight-bold">Servis Adı</label>
            <div class="col-lg-10">
              <Select data={services} onChange={this.interfaceChange} showSearch={true} optionFilterProp="value" />
            </div>
          </div>
          <div class="form-group row required"><label class="col-lg-2 col-form-label control-label font-weight-bold">Operasyon Adı</label>
            <div class="col-lg-10">
              <Select data={methods} onChange={this.methodChange} showSearch={true} optionFilterProp="value" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label font-weight-bold">Servis Parametre Girdisi
            <Tooltip title="Çağrım yapılan servisin ilk parametresine (request özel ismi ile) erişim sağlayıp sanallaştırma için daha fazla filtreleme yapılabilir.
              Örnek : Servisin ilk parametre DTO'sunda clientNo alanı varsa (request.getClientNo() == 15) kontrolü yapılarak, servise yapılan
              çağrımdaki müşteri numarası kontrol edilebilir." leaveDelay={300}>
              <PriorityHighIcon  color="secondary" style={{ fontSize: 22, marginLeft:28, cursor:'help'}}/>
            </Tooltip>
            </label>
            <div class="col-lg-10">
              <textarea id="inData" name="inData" class="form-control" rows="4"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label font-weight-bold" style={{height:10}}>
            Servis Çıktısı/Dönüş Verisi
            <Tooltip title="Servisin dönmesi istenen veri. Tanımlanan XML verisi Harmoninin dönüş yapacağı veri olacaktır." leaveDelay={300}>
                <PriorityHighIcon  color="secondary" style={{ fontSize: 22, marginLeft:15, cursor:'help'}}/>
            </Tooltip>
            </label>
            <div class="col-lg-10">
              <textarea value={this.state.templateData} onChange={this.handleOutdataChange} id="outData" name="outData" class="form-control" rows="8" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label font-weight-bold">Test Kullanıcı Sicili
              <small class="form-text text-muted">Sanallaştırmanın geçerli olacağı kullanılacak sicil.
              <br/>Örnek : C4TEST1</small>
            </label>
            <div class="col-lg-10" style={{paddingTop: 20}}>
              <input type="text" id="serviceUserName" name="serviceUserName" class="form-control"></input>
            </div>
          </div>
          <div class="form-group row"><label class="col-lg-2 col-form-label font-weight-bold">Makine Adı
            <small class="form-text text-muted">Testin yapılacağı Makine Adı.<br/>Örnek : GMOPCIT107</small>
            </label>
            <div class="col-lg-10" style={{paddingTop: 10}}>
              <input type="text" id="hostName" name="hostName" class="form-control"></input>
            </div>
          </div>
          <div class="form-group row"><label class="col-lg-2 col-form-label font-weight-bold">Aktif Mi?
          <small class="form-text text-muted">Yapılan sanallaştırma tanımları hergün otomatik olarak Pasif'e çekilmektedir.</small></label>
            <div class="col-lg-10" style={{paddingTop: 15}}>
              <Switch onChange={onChangeActive} defaultChecked={true} />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4">
              <Button type="danger" onClick={this.cancelCreate}>İptal</Button>
              <Button type="success" htmlType="submit">Kaydet</Button>
            </div>
          </div>
        </form>
      </div >);
  }
}

export default NewServiceComponent;