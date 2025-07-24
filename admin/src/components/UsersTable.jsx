import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconEye, IconEdit, IconTrash, IconUserPlus, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { updateUserStatus, deleteUser, fetchUsers, setUsersFilter } from '../Redux/slices/usersSlice';

const UsersTable = ({
  onEditUser,
  onViewUser,
  onCreateUser
}) => {
  const dispatch = useDispatch();
  const {
    users,
    loading,
    error,
    pagination
  } = useSelector((state) => state.users);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateUserStatus({ userId, status: newStatus }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchUsers({
      page: newPage,
      limit: pagination?.limit || 10,
      role: '',
      status: '',
      searchTerm: '',
    }));
  };

  const handlePageSizeChange = (newPageSize) => {
    dispatch(setUsersFilter({ limit: newPageSize }));
    dispatch(fetchUsers({
      page: 1,
      limit: newPageSize,
      role: '',
      status: '',
      searchTerm: '',
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Users List</CardTitle>
            <CardDescription>
              {pagination?.totalUsers || 0} total users
            </CardDescription>
          </div>
          <Button onClick={onCreateUser} className="flex items-center gap-2">
            <IconUserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading?.users ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
            </div>
          </div>
        ) : error?.users ? (
          <div className="text-center py-8">
            <p className="text-destructive">{error.users}</p>
          </div>
        ) : users?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id || user.id}>
                    <TableCell className="font-medium">
                      #{(user._id || user.id)?.toString().slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name || 'N/A'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{user.email || 'N/A'}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.role || 'User'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.status || 'active'}
                        onValueChange={(value) => handleStatusChange(user._id || user.id, value)}
                        disabled={loading?.updateStatus}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewUser && onViewUser(user)}
                          title="View User"
                        >
                          <IconEye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditUser && onEditUser(user)}
                          title="Edit User"
                        >
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user._id || user.id)}
                          disabled={loading?.delete}
                          title="Delete User"
                          className="text-destructive hover:text-destructive"
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Controls */}
        {users?.length > 0 && (
          <div className="flex items-center justify-between px-4 py-4">
            <div className="text-muted-foreground text-sm">
              Showing {((pagination?.currentPage - 1) * pagination?.limit) + 1} to{' '}
              {Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalUsers)} of{' '}
              {pagination?.totalUsers} users
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${pagination?.limit || 10}`}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue placeholder={pagination?.limit || 10} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center text-sm font-medium">
                Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => handlePageChange(1)}
                  disabled={pagination?.currentPage <= 1}
                >
                  <span className="sr-only">Go to first page</span>
                  <IconChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange((pagination?.currentPage || 1) - 1)}
                  disabled={pagination?.currentPage <= 1}
                >
                  <span className="sr-only">Go to previous page</span>
                  <IconChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange((pagination?.currentPage || 1) + 1)}
                  disabled={pagination?.currentPage >= pagination?.totalPages}
                >
                  <span className="sr-only">Go to next page</span>
                  <IconChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => handlePageChange(pagination?.totalPages || 1)}
                  disabled={pagination?.currentPage >= pagination?.totalPages}
                >
                  <span className="sr-only">Go to last page</span>
                  <IconChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersTable;
