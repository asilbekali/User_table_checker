// src/pages/TablePage.tsx
import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedUsers } from '../store/selectedUsersReducer'
import { useNavigate } from 'react-router-dom';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource: DataType[] = Array.from({ length: 10 }).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

const TablePage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<DataType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelectChange = (newKeys: React.Key[]) => {
    setSelectedRowKeys(newKeys);
    const selected = dataSource.filter(item => newKeys.includes(item.key));
    setSelectedRowsData(selected);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSubmit = () => {
    dispatch(setSelectedUsers(selectedRowsData));
    navigate('/another-page');
  };

  return (
    <Flex gap="middle" vertical>
      <Button
        type="primary"
        disabled={!selectedRowKeys.length}
        onClick={handleSubmit}
      >
        Next
      </Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Flex>
  );
};

export default TablePage;
