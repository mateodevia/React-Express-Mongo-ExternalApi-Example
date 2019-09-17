import React, { Component } from 'react';

class BasicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  backEndGet = () => {
    const promesa1 = fetch("/crud",
      {
        headers: {
          "Content-Type": "application/json"
        }
      });

    const promesa2 = promesa1.then((res) => {
      return res.json();
    });

    promesa1.catch((err) => {
      alert(err);
    });

    promesa2.then((res) => {
      console.log(res);
    });

    promesa2.catch((err) => {
      alert(err);
    });
  }

  backEndPost() {
    let req = {
      nombre: "mateo3"
    };

    let promesa1 = fetch("/crud",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
      });

    let promesa2 = promesa1.then(response => {
      return response.json()
    })

    promesa2.then(resp => {
      console.log(resp);

    });
  }

  apiExterno() {
    //si requiere un token se agrega ?&&app_token=<el token>
    //en este caso seria https://www.datos.gov.co/resource/hiku-z4v3.json?&&app_token=<el token>
    //si quiero agregar algun parametro para hacer una query especifica https://www.datos.gov.co/resource/hiku-z4v3.json?predio=SAMARA
    //
    const promesa1 = fetch("https://www.datos.gov.co/resource/hiku-z4v3.json?predio=SAMARA",
      {
        headers: {
          "Content-Type": "application/json"
        }
      });

    const promesa2 = promesa1.then((res) => {
      return res.json();
    });

    promesa1.catch((err) => {
      alert(err);
    });

    promesa2.then((res) => {
      console.log(res);
    });

    promesa2.catch((err) => {
      alert(err);
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Componente Basico 2</h1>
        <button onClick={this.backEndGet}>Backend GET</button>
        <button onClick={this.backEndPost}>Backend POST</button>
        <button onClick={this.apiExterno}>Api Externo</button>
      </React.Fragment >
    );
  }
}

export default BasicComponent;