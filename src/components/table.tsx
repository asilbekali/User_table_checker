import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

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

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
}));

const TableAnt: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRowsData, setSelectedRowsData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            console.log('🔍 Final selected rows:', selectedRowsData);
            setSelectedRowKeys([]);
            setSelectedRowsData([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        const selected = dataSource.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Row Data:', selected);
        setSelectedRowsData(selected);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </Flex>
            <Table<DataType>
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
            />
        </Flex>
    );
};

export default TableAnt;
