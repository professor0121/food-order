import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconSearch, IconRefresh, IconUserPlus } from "@tabler/icons-react";
import { fetchUsers, setUsersFilter } from '../Redux/slices/usersSlice';
import UsersTable from '@/components/UsersTable';
import UserFormDialog from '@/components/UserFormDialog';
import UserViewDialog from '@/components/UserViewDialog';

const AllUsers = () => {
  const dispatch = useDispatch();

  // Dialog states
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [userViewOpen, setUserViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

  const {
    users,
    loading,
    error,
    pagination,
    filters,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (!pagination || !filters) return; // wait until state is ready

    dispatch(fetchUsers({
      page: pagination.currentPage || 1,
      limit: pagination.limit || 10,
      role: filters.role || '',
      status: filters.status || '',
      searchTerm: filters.searchTerm || '',
    }));
  }, [
    dispatch,
    pagination?.currentPage,
    pagination?.limit,
    filters?.role,
    filters?.status,
    filters?.searchTerm,
  ]);

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    dispatch(setUsersFilter({ [filterType]: value }));
  };

  const handleRefresh = () => {
    dispatch(fetchUsers({
      page: pagination?.currentPage || 1,
      limit: pagination?.limit || 10,
      role: filters?.role || '',
      status: filters?.status || '',
      searchTerm: filters?.searchTerm || '',
    }));
  };

  // Dialog handlers
  const handleCreateUser = () => {
    setSelectedUser(null);
    setFormMode('create');
    setUserFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormMode('edit');
    setUserFormOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setUserViewOpen(true);
  };

  console.log(users);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Orders Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                      Manage and track all users
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateUser}
                      className="flex items-center gap-2"
                    >
                      <IconUserPlus className="h-4 w-4" />
                      Add User
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRefresh}
                      disabled={loading?.users}
                    >
                      <IconRefresh className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>Filter users by name, email, role, or status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="relative">
                          <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search users by name or email..."
                            value={filters?.searchTerm || ''}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-48">
                        <Select
                          value={filters?.role || 'all'}
                          onValueChange={(value) => handleFilterChange('role', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-48">
                        <Select
                          value={filters?.status || 'all'}
                          onValueChange={(value) => handleFilterChange('status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Users Table */}
              <div className="px-4 lg:px-6">
                <UsersTable
                  onCreateUser={handleCreateUser}
                  onEditUser={handleEditUser}
                  onViewUser={handleViewUser}
                />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Dialogs */}
      <UserFormDialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        user={selectedUser}
        mode={formMode}
      />

      <UserViewDialog
        open={userViewOpen}
        onOpenChange={setUserViewOpen}
        user={selectedUser}
      />
    </SidebarProvider>
  );
};

export default AllUsers;
