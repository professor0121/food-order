import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTable from "@/components/OrdersTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
import { fetchOrders, setOrdersFilter } from '../Redux/slices/ordersSlice';
import Layout from './Layout';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    loading,
    error,
    pagination,
    filters
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({
      page: pagination.currentPage,
      limit: pagination.limit,
      status: filters.status
    }));
  }, [dispatch, pagination.currentPage, pagination.limit, filters.status]);

  const handleFilterChange = (filterType, value) => {
    dispatch(setOrdersFilter({ [filterType]: value }));
  };

  const handleViewOrder = (order) => {
    // TODO: Implement order detail view
    console.log('View order:', order);
  };

  return (
    <Layout>
      {/* Orders Header */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
          <Button
            onClick={() => dispatch(fetchOrders({
              page: pagination.currentPage,
              limit: pagination.limit,
              status: filters.status
            }))}
            disabled={loading.orders}
          >
            <IconRefresh className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter orders by status and search terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <div className="px-4 lg:px-6">
        <OrdersTable
          orders={orders}
          loading={loading.orders}
          error={error.orders}
          pagination={pagination}
          onViewOrder={handleViewOrder}
        />
      </div>
    </Layout>
  );
};

export default OrdersPage;


