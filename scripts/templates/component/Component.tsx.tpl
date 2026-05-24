import { clsx } from 'clsx';

interface {{pascalCase}}Props {
  className?: string;
}

export const {{pascalCase}} = ({ className }: {{pascalCase}}Props) => {
  return (
    <div className={clsx('{{className}}', className)}>
      <p>{{pascalCase}} component</p>
    </div>
  );
};
