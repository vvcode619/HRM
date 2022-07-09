import React, { Component } from "react";
import "./Company.css";
import axios from "axios";
import CompanyTable from "./CompanyTable.jsx";
import CompanyForm from "./CompanyForm.jsx";
import CompanyFormEdit from "./CompanyFormEdit.jsx";
import SERVER_URL from "../utils/constants";
class Company extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {}
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <CompanyFormEdit
              onCompanyEditUpdate={this.handleCompanyEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
              <CompanyTable
                onAddCompany={this.handleAddCompany}
                onEditCompany={this.handleEditCompany}
              />
            )
        ) : (
            <CompanyForm
              onCompanySubmit={this.handleCompanySubmit}
              onFormClose={this.handleFormClose}
            />
          )}
      </React.Fragment>
    );
  }
  handleCompanySubmit = event => {
    event.preventDefault();
    // console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      CompanyName: event.target[0].value,
      Address: event.target[1].value,
      Country: event.target[2].value, 
      PostalCode: event.target[3].value,
      Website: event.target[4].value,
      Email: event.target[5].value,
      ContactPerson: event.target[6].value,
      ContactNo: event.target[7].value,
      FaxNo: event.target[8].value,
      PanNo: event.target[9].value,
      GSTNo: event.target[10].value,
      CINNo: event.target[11].value
    };
    axios
      .post(`${SERVER_URL}/api/company`, body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleAddCompany = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditCompany = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleCompanyEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    let body = {
        CompanyName: newInfo.target[0].value,
        Address: newInfo.target[1].value,
        Country: newInfo.target[2].value, 
        PostalCode: newInfo.target[3].value,
        Website: newInfo.target[4].value,
        Email: newInfo.target[5].value,
        ContactPerson: newInfo.target[6].value,
        ContactNo: newInfo.target[7].value,
        FaxNo: newInfo.target[8].value,
        PanNo: newInfo.target[9].value,
        GSTNo: newInfo.target[10].value,
        CINNo: newInfo.target[11].value
      };
    console.log("update", body);
    axios
      .put(
        `${SERVER_URL}/api/company/` + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        // this.componentDidMount();
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Company;
