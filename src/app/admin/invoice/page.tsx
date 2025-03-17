'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import tableDataDevelopment from 'variables/invoice/tableDataDevelopment';
import tableDataCheck from 'variables/invoice/tableDataCheck';
import CheckTable from 'components/admin/invoice/CheckTable';
import tableDataColumns from 'variables/invoice/tableDataColumns';
import tableDataComplex from 'variables/invoice/tableDataComplex';
import DevelopmentTable from 'components/admin/invoice/DevelopmentTable';
import ColumnsTable from 'components/admin/invoice/ColumnsTable';
import ComplexTable from 'components/admin/invoice/ComplexTable';
import Card from 'components/card';

const Tables = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // Implement the search logic here
    // Filter tableDataComplex based on the input values
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid h-full">
        <Card className="mb-4 grid grid-cols-2 gap-4 bg-white p-4">
          <div className="col-span-2 grid grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Kana
              </label>
              <input
                id="kana"
                type="text"
                {...register('kana')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Area
              </label>
              <select
                id="Area"
                {...register('area')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              >
                <option value="">-</option>
                <option value="1">Tokyo</option>
                <option value="2">Osaka</option>
                <option value="3">Nagoya</option>
                <option value="4">Fukuoka</option>
                <option value="5">Okinawa</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                {...register('status')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              >
                <option value="">-</option>
                <option value="1">Approved</option>
                <option value="2">Disable</option>
                <option value="3">Error</option>
                <option value="4">In Progress</option>
                <option value="5">Pending</option>
              </select>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="priceMin"
                className="block text-sm font-medium text-gray-700"
              >
                Price Min
              </label>
              <input
                id="priceMin"
                type="text"
                className={`mt-1 block h-8 w-full rounded-md border-2 p-1 sm:text-sm ${
                  errors.priceMin ? 'border-red-500' : 'border-gray-400'
                }`}
                {...register('priceMin', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Price Min must be a number',
                  },
                })}
              />
              {errors.priceMin && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.priceMin.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="priceMax"
                className="block text-sm font-medium text-gray-700"
              >
                Price Max
              </label>
              <input
                id="priceMax"
                type="text"
                {...register('priceMax')}
                className={`mt-1 block h-8 w-full rounded-md border-2 p-1 sm:text-sm ${
                  errors.priceMax ? 'border-red-500' : 'border-gray-400'
                }`}
                {...register('priceMax', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Price Max must be a number',
                  },
                })}
              />
              {errors.priceMax && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.priceMax.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Date From
              </label>
              <input
                id="dateFrom"
                type="date"
                {...register('dateFrom')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="dateTo"
                className="block text-sm font-medium text-gray-700"
              >
                Date To
              </label>
              <input
                id="dateTo"
                type="date"
                {...register('dateTo')}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-400 p-1 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="search-button rounded bg-blue-700 px-24 py-1 text-white"
            >
              Search
            </button>
          </div>
        </Card>
      </form>
      <ComplexTable tableData={tableDataComplex} />
    </div>
  );
};
export default Tables;
