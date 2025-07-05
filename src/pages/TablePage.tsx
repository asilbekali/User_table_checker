import React, { useState } from 'react';
import { Button, Table, Typography, Card, Space, Flex } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedUsers } from '../store/selectedUsersReducer';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

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
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3} style={{ marginBottom: 0 }}>📋 Select Users</Title>
          <Text type="secondary">
            Jadvaldan bir yoki bir nechta foydalanuvchilarni tanlang va "Next" tugmasi orqali keyingi sahifaga o‘ting.
          </Text>

          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            style={{ borderRadius: 12, overflow: 'hidden' }}
          />

          <div style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              disabled={!selectedRowKeys.length}
              onClick={handleSubmit}
            >
              ➡️ Next
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default TablePage;
