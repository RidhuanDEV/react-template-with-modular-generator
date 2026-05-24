import { EmptyState } from '@/components/feedback';
import { PageContainer, PageHeader } from '@/components/layout';

const {{pascalCase}}ListPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="{{pascalCase}}s"
        description="Generated feature page. Replace this empty state with your real domain workflow."
      />
      <EmptyState
        title="{{pascalCase}} feature ready"
        description="Wire the generated hooks to your API and evolve this page into a production list view."
      />
    </PageContainer>
  );
};

export default {{pascalCase}}ListPage;
