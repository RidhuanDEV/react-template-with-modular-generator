import { useMemo } from "react";
import { EmptyState } from "@/components/feedback";
import { PageContainer, PageHeader } from "@/components/layout";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui";
import { usePagination } from "@/hooks";
import { formatDate, truncate } from "@/utils/formatting";
import { useExamples } from "../hooks";
import type { ExampleItem } from "../types";

const ExampleListPage: React.FC = () => {
  const { params, setPage } = usePagination();
  const { data, error, isError, isLoading, isFetching, refetch } =
    useExamples(params);

  const columns = useMemo<DataTableColumn<ExampleItem>[]>(
    () => [
      {
        key: "title",
        header: "Title",
        sortable: true,
      },
      {
        key: "description",
        header: "Description",
        render: (value) => truncate(String(value), 80),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (value) => (
          <Badge variant={value === "active" ? "success" : "warning"}>
            {String(value)}
          </Badge>
        ),
      },
      {
        key: "updatedAt",
        header: "Updated",
        sortable: true,
        render: (value) => formatDate(String(value)),
      },
    ],
    [],
  );

  const examples = data?.data ?? [];
  const meta = data?.meta;

  return (
    <PageContainer>
      <PageHeader
        title="Examples"
        description="Reference implementation for list pages, typed hooks, and reusable shared table patterns."
        actions={
          <Button
            variant="secondary"
            loading={isFetching}
            onClick={() => {
              void refetch();
            }}
          >
            Refresh examples
          </Button>
        }
      />

      {isError ? (
        <Alert variant="danger" title="Unable to load examples">
          {error.message}
        </Alert>
      ) : examples.length === 0 && !isLoading ? (
        <EmptyState
          title="No examples yet"
          description="This page shows how a generated feature can grow into a polished list experience."
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
          data={examples}
          columns={columns}
          loading={isLoading}
          currentPage={meta?.currentPage ?? params.page}
          totalPages={meta?.lastPage ?? 1}
          onPageChange={setPage}
          getRowId={(example) => example.id}
          emptyMessage="No examples available for this page."
        />
      )}
    </PageContainer>
  );
};

export default ExampleListPage;
