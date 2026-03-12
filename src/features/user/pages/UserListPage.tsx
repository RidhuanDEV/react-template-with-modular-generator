import { useMemo } from "react";
import { EmptyState } from "@/components/feedback";
import { PageContainer, PageHeader } from "@/components/layout";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui";
import { usePagination } from "@/hooks";
import { formatDate } from "@/utils/formatting";
import { useUsers } from "../hooks";
import type { User } from "../types";

const UserListPage: React.FC = () => {
  const { params, setPage } = usePagination();
  const { data, error, isError, isLoading, isFetching, refetch } =
    useUsers(params);

  const columns = useMemo<DataTableColumn<User>[]>(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: true,
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
      },
      {
        key: "role",
        header: "Role",
        sortable: true,
        render: (value) => <Badge variant="info">{String(value)}</Badge>,
      },
      {
        key: "createdAt",
        header: "Created",
        sortable: true,
        render: (value) => formatDate(String(value)),
      },
    ],
    [],
  );

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        description="Manage user accounts, roles, and access policies from one place."
        actions={
          <Button
            variant="secondary"
            loading={isFetching}
            onClick={() => {
              void refetch();
            }}
          >
            Refresh users
          </Button>
        }
      />

      {isError ? (
        <Alert variant="danger" title="Unable to load users">
          {error.message}
        </Alert>
      ) : users.length === 0 && !isLoading ? (
        <EmptyState
          title="No users found"
          description="Connect your API or seed some data to preview the starter user list pattern."
          action={
            <Button
              variant="outline"
              onClick={() => {
                void refetch();
              }}
            >
              Retry
            </Button>
          }
        />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          loading={isLoading}
          currentPage={meta?.currentPage ?? params.page}
          totalPages={meta?.lastPage ?? 1}
          onPageChange={setPage}
          getRowId={(user) => user.id}
          emptyMessage="No users available for this page."
        />
      )}
    </PageContainer>
  );
};

export default UserListPage;
