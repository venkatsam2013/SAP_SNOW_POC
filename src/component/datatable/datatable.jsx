import React, { useEffect, useState } from "react";
import { Col, Input, Label, List, Row, Spinner , Progress, Modal, ModalBody} from 'reactstrap';
import axios from 'axios';
import "./datatable.css";
import TransferModal from "../transfredmodal/transfredmodal";
import env from '../../env';
const DataTable = (props) => {
    const {
        dataTableSAP,
        selectAll,
        selectAllData,
        setSelectAll,
        selectSapData,
        isView,
        isTable,
        loadingData
    } = props;
    const [filteredData, setFilteredData] = useState(dataTableSAP);
    const [loading, setLoading] = useState(false);
    const [loadingDone, setLoadingDone] = useState(false);
    const [snowFlakedata, setSnowFlakedata] = useState([]);
    const filterSAPData = (e)=>{
        if(e.target.value.length > 3) 
        setFilteredData(dataTableSAP.filter(x=> (x.name.toLowerCase()).includes(e.target.value.toLowerCase()))) 
        else if(e.target.value.length === 0){
            setFilteredData(dataTableSAP);
        }
    }
    useEffect(()=>{
        setFilteredData(dataTableSAP)
    },[dataTableSAP,loadingData])
    useEffect(()=>{
        setFilteredData(filteredData)
    },[filteredData])

    const openNewModal = () => {
        setLoadingDone(true)
      }


    const uploadTable = (data)=>{
        setLoading(true);
        axios.post(`${env}/TableSubmit`,{data: data}).then(res => {
            setSnowFlakedata(res);
            setLoading(false);
          }).catch(err => {
            setSnowFlakedata([]);
            setLoading(false);
          })
    }

    const uploadView = (data) => {
        setLoading(true);
        axios.post(`${env}/ViewSubmit`,{data: data}).then(res => {
            setSnowFlakedata(res);
            setLoading(false);
          }).catch(err => {
            setSnowFlakedata([]);
            setLoading(false);
          })
    }

    
    const uploadData = () => {
        const data = [];
        if(isView){
            uploadView(data);       
        }else{
            uploadTable(data);
        }
    }

    return (
        <Row className='data-table-body'>
            <Col xs="5">
                <div className='list-body'>
                    <div className='list-header'>
                        SAP HANA
                    </div>
                    <List type='unstyled' className='list-body-inner'>
                        {isTable === undefined && isView === undefined  ? '' : <Input type="text" onChange={(e)=>filterSAPData(e)} />}
                        {
                            isTable === undefined && isView === undefined ? 'Select view or table' : dataTableSAP.length > 0 ?
                                <li>
                                    <Input type="checkbox" key="selectAll" checked={selectAll} value={'selectAll'} onChange={(e) => {
                                        console.log(e.target.checked);
                                        selectAllData(e)
                                        setSelectAll(e.target.checked)
                                    }} />
                                    <Label className='datatable-checkbox' check>
                                        Select All
                                    </Label>
                                </li> : <li className="loading-spinner">{loadingData ? <Spinner  /> : '' }</li>
                        }
                        {
                            filteredData.map((view) => {
                                return (
                                    <li>
                                        <Input
                                            type="checkbox"
                                            checked={view.checked}
                                            key={view.name}
                                            value={view.name}
                                            onChange={(e) => selectSapData(e)} />
                                        <Label className='datatable-checkbox' check>
                                            {view.name}
                                        </Label>
                                    </li>
                                )
                            })
                        }
                    </List>
                </div>
            </Col>
            <Col xs="2">
                <div className='arrow-data-table view-text' onClick={() => { uploadData() }} >
                    <img src='arow.png' className='arrow-image' alt='no-imag' />
                </div>
            </Col>
            <Col xs="5">
                <div className='list-body'>
                    <div className='list-header'>
                        SNOW FLAKE
                    </div>
                    <List type='unstyled' className='list-body-inner text-left'>
                        {
                            snowFlakedata.length > 0 ? snowFlakedata.map((x)=><li>
                                x
                            </li>) : 'No Data'
                        }
                    </List>
                </div>
            </Col>
            <Modal
          toggle={() => {
            setLoading(false)
            setLoadingDone(false)
          }}
          isOpen={loading}
          onClosed={openNewModal}
        >
          <ModalBody>
            <div className='text-center'>
              <br />
              DB MIGRATION
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className='row'>
              <span className='float-left'>
                SAP HANA
              </span>
              <div className='col-12'>
                <Progress
                  animated
                  color="success"
                  value="25"
                />
              </div>
              <span className='float-right'>
                SNOW FLAKE
              </span>
            </div>
          </ModalBody>
        </Modal>        
        {/* <TransferModal isOpen={loadingDone} /> */}
        </Row>
    )
}

export default DataTable;