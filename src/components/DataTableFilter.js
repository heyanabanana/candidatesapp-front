/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import "../styles/DataTableDemo.css";
import getCandidates from "../services/getCandidates";
import useUser from "../config/useUser";
import { Link } from "wouter";
import { ENDPOINT } from "../services/endpoint";

const DataTableFilter = () => {
  const [selectedProduct5, setSelectedProduct5] = useState("");

  const idDelete = selectedProduct5 && selectedProduct5.id;
console.log(idDelete);
  const { token } = useUser();
  const [candidates, setCandidates] = useState();
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const user = sessionStorage.getItem("user");
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    experiences: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    users: { value: null, matchMode: FilterMatchMode.IN },
    active: { value: null, matchMode: FilterMatchMode.CONTAINS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  useEffect(() => {
    getCandidates({ token }).then((value) => {
      setCandidates(value);
    });
  }, [token]);

  const filteredCandidates =
    candidates && candidates.filter((candidate) => candidate.user_id == user);

   function deleteCandidate() {
     fetch(
      `${ENDPOINT}/candidates/${idDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      },
      window.location.reload()
    );
  }

  function setLevel(level) {
    if (level === 1) {
      return " junior";
    } else if (level === 2) {
      return " semi-senior";
    } else return " senior";
  }

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  const renderHeader2 = () => {
    return (
      <div className="p-d-flex p-jc-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header2 = renderHeader2();

  const experienceBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.experiences &&
          rowData.experiences.map((experience) => (
            <span
              value={experience.skill.name}
              className="text m-1 inline-block uppercase rounded-min text-white bg-blue px-2 py-1 text-xs font-bold mr-3 rounded-md"
            >
              {experience.skill.name} {setLevel(experience.level)}
            </span>
          ))}
      </>
    );
  };

  const idBodyTemplate = (rowData) => {
    return (
      <Link to={`/editcandidate/${rowData.id}`} params={rowData.id}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-plain"
        />
      </Link>
    );
  };

  const addExperienceTemplate = (rowData) => {
    return (
      <>
        <Link to={`/newexperience/${rowData.id}`} params={rowData.id}>
          <Button icon="pi pi-plus" className="p-button-rounded p-button-sm" />
        </Link>
      </>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames(
          "pi",
          {
            "true-icon pi-check-circle": rowData.active,
            "false-icon pi-times-circle": !rowData.active,
          },
          "fill-current text-blue"
        )}
      ></i>
    );
  };

  const verifiedRowFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <span className="p-buttonset xl:px-10 text-xs mt-5	">
        <Link to="/newcandidate">
          <Button
            className="p-button-sm"
            label="Add candidate"
            icon="pi pi-plus-circle"
          />
        </Link>
        <Button
          className="p-button-sm ml-1"
          label="Delete selected"
          icon="pi pi-trash"
          onClick={deleteCandidate}
        />
         <Button
          className="p-button-sm ml-1"
          label="Reload"
          icon="pi pi-history
          "
          onClick={refreshPage}
        />
      </span>

      <div className="xl:px-10 datatable-filter-demo text-xs mt-5	">
        <DataTable
          size="small"
          value={filteredCandidates}
          paginator
          className="p-datatable-customers"
          rows={10}
          dataKey="id"
          filters={filters2}
          filterDisplay="row"
          onSelectionChange={(e) => setSelectedProduct5(e.value)}
          selection={selectedProduct5}
          responsiveLayout="scroll"
          globalFilterFields={[
            "name",
            "country",
            "location",
            "phone",
            "email",
            "representative.name",
            "active",
            "experiences",
          ]}
          header={header2}
          emptyMessage="No candidates found."
        >
          <Column selectionMode="single" headerStyle={{ width: "3em" }} />
          <Column
            field="id"
            headerStyle={{ width: "3em" }}
            style={{ minWidth: "3rem", color: "#556EE6" }}
            body={idBodyTemplate}
          />

          <Column
            field="active"
            header="Active"
            dataType="boolean"
            style={{ minWidth: "3rem" }}
            body={verifiedBodyTemplate}
            filter
            filterElement={verifiedRowFilterTemplate}
          />
          <Column
            field="name"
            header="Name"
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by name"
            style={{
              minWidth: "8rem",
              alignContent: "center",
              textTransform: "capitalize",
            }}
          />
          <Column
            header="Location"
            field="location"
            style={{ minWidth: "8rem", textTransform: "capitalize" }}
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by location"
          />
          <Column
            header="Country"
            field="country"
            style={{ minWidth: "8rem", textTransform: "capitalize" }}
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by country"
          />
          <Column
            header="Phone"
            field="phone"
            showFilterMenu={false}
            style={{ minWidth: "8rem", textTransform: "capitalize" }}
            filter
            filterPlaceholder="Search by phone"
          />
          <Column
            header="Email"
            field="email"
            showFilterMenu={false}
            style={{ minWidth: "8rem", textTransform: "lowcase" }}
            filter
            filterPlaceholder="Search by email"
          />
          <Column
            field="experiences"
            header="Skills"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            body={experienceBodyTemplate}
          />
          <Column
            field="id"
            headerStyle={{ width: "3em" }}
            style={{ minWidth: "3rem", color: "#556EE6" }}
            body={addExperienceTemplate}
          />
        </DataTable>
      </div>
    </>
  );
};

export default DataTableFilter;
