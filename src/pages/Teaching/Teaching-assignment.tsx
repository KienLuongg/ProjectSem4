import { useState } from 'react';
import { Button, Input, Table } from 'antd';
import Loader from '../../common/Loader';

export default function Schedules() {


    const [isLoading] = useState(false);



    return (
        <div className="p-4">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Input type="text" placeholder="Tìm theo năm" className="w-full md:w-3/4 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div className="text-right">
                            <Button type="default" className="rounded-md bg-blue-500 hover:bg-blue-600 ">
                                Thực hiện phân công
                            </Button>
                        </div>
                    </div>
                    <Table rowKey="id" className='table-auto text-black dark:text-white mt-4'>
                        <Table.Column title="Id" dataIndex="id" />
                        <Table.Column
                            title="Giáo viên"
                            dataIndex=""
                        />
                        <Table.Column
                            title="Chủ nhiệm"
                            dataIndex=""
                        />
                        <Table.Column
                            title="Phân công giảng dạy"
                            dataIndex=""
                        />
                    </Table>

                </>
            )}
        </div>
    );
}
