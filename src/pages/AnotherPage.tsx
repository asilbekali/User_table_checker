// src/pages/AnotherPage.tsx
import React from 'react';
import { Button, Table } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const AnotherPage: React.FC = () => {
  const users = useSelector((state: RootState) => state.selectedUsers.selectedUsers);
  const navigate = useNavigate()
  return (
    <div>
      <h2>Selected Users</h2>
      <Table<DataType>
        dataSource={users}
        columns={columns}
        pagination={false}
      />
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default AnotherPage;
