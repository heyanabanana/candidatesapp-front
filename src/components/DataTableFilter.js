import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { CustomerService } from "../services/CustomerService";
import "../styles/DataTableDemo.css";
import getCandidates from "../services/getCandidates";
import getUsers from "../services/getUsers";

import useUser from "../config/useUser";

const DataTableFilter = () => {
  const { isLogged, token } = useUser();

  const [candidates, setCandidates] = useState();
  const [users, setUsers] = useState();
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const statuses = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    users: { value: null, matchMode: FilterMatchMode.IN },
    active: { value: null, matchMode: FilterMatchMode.CONTAINS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    getCandidates({ token }).then((value) => {
      setCandidates(value);
    });
    // getUsers({ token }).then((value) => {
    //   setUsers(value);
    // });
  }, [token]);

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

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <p value={rowData.country} className="text">
          {rowData.country}
        </p>
      </React.Fragment>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.active,
          "false-icon pi-times-circle": !rowData.active,
        })}
      ></i>
    );
  };

  const verifiedRowFilterTemplate = (options) => {
    return (
      <Dropdown
        options={statuses}
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  return (
    <div className="datatable-filter-demo">
      <DataTable
        value={candidates}
        paginator
        className="p-datatable-customers"
        rows={10}
        dataKey="id"
        filters={filters2}
        filterDisplay="row"
        responsiveLayout="scroll"
        globalFilterFields={[
          "name",
          "country",
          "representative.name",
          "active",
        ]}
        header={header2}
        emptyMessage="No candidates found."
      >
        <Column
          field="active"
          header="Active"
          dataType="boolean"
          style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
          filter
          filterElement={verifiedRowFilterTemplate}
        />
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />

        <Column
          header="Status"
          filterField="country"
          style={{ minWidth: "12rem" }}
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by country"
        />

        {/*
        <Column
          field="verified"
          header="Verified"
          dataType="boolean"
          style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
          filter
          filterElement={verifiedRowFilterTemplate}
        /> */}
      </DataTable>
    </div>
  );
};

export default DataTableFilter;
