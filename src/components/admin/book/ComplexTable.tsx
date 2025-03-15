import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Progress from 'components/progress';
import {
  MdArrowBack,
  MdArrowForward,
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdDownload,
  MdEdit,
} from 'react-icons/md';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

type RowObj = {
  name: string;
  status: string;
  mailaddress: string;
  date: string;
  progress: number;
  price: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 10;
  let defaultData = tableData;

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('mailaddress', {
      id: 'mailaddress',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          MAILADDRESS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PRICE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          &yen; {info.getValue().toLocaleString()}
        </p>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === 'Approved' ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : info.getValue() === 'Disable' ? (
            <MdCancel className="me-1 text-red-500 dark:text-red-300" />
          ) : info.getValue() === 'Error' ? (
            <MdOutlineError className="me-1 text-amber-500 dark:text-amber-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.display({
      id: 'setting',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SETTING
        </p>
      ),
      cell: () => (
        <button className="flex items-center rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white">
          <MdDownload className="mr-1" />
          Download
        </button>
      ),
    }),
    columnHelper.display({
      id: 'edit',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EDIT</p>
      ),
      cell: () => (
        <button className="flex items-center rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
          <MdEdit className="mr-1" />
          Edit
        </button>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  const pageCount = Math.ceil(defaultData.length / pageSize);

  React.useEffect(() => {
    setData(
      defaultData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    );
  }, [pageIndex, defaultData]);

  return (
    <div>
      <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: '',
                            desc: '',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="min-w-[150px] border-white/0 py-3  pr-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => {
                setPageIndex((prev) => Math.max(prev - 1, 0));
              }}
              disabled={pageIndex === 0}
              className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
            >
              <MdArrowBack />
            </button>
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={() => {
                setPageIndex((prev) => Math.min(prev + 1, pageCount - 1));
              }}
              disabled={pageIndex === pageCount - 1}
              className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
