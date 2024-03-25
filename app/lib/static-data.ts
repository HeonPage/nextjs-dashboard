import { TableColumnGroupType, TableColumnsType } from 'antd'
import { Radio_Document } from './type'

export const DocumentTableColumns = [
  {
    dataIndex: 'no',
    key: 'no',
    title: 'No',
    width: 8,
  },
  {
    dataIndex: 'medium',
    key: 'medium',
    title: '매체',
  },
  {
    dataIndex: 'lic_num',
    key: 'lic_num',
    title: '허가번호',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '무선국명',
  },
  {
    dataIndex: 'belong',
    key: 'belong',
    title: '관할',
  },
  {
    dataIndex: 'spot',
    key: 'spot',
    title: '시설',
  },
  {
    dataIndex: 'addr',
    key: 'addr',
    title: '주소',
  },
  {
    dataIndex: 'power',
    key: 'power',
    title: '출력',
  },
  {
    dataIndex: 'freq',
    key: 'freq',
    title: '주파수',
  },
  {
    dataIndex: 'tx_1_vendor',
    key: 'tx_1_vendor',
    title: '(주)제조사',
  },
  {
    dataIndex: 'tx_1_type',
    key: 'tx_1_type',
    title: '(주)송신기',
  },
  {
    dataIndex: 'rx_ch',
    key: 'rx_ch',
    title: '수신채널',
  },
  {
    dataIndex: 'tx_ant_type',
    key: 'tx_ant_type',
    title: '안테나',
  },
  {
    dataIndex: 'tx_ant_pol',
    key: 'tx_ant_pol',
    title: '편파',
  },
  {
    dataIndex: 'tx_ant_ocn',
    key: 'tx_ant_ocn',
    title: '해발고',
  },
]
