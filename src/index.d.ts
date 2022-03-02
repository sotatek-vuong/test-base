import { NextComponentType, NextPageContext } from 'next';

declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    getLayout?: (page: any) => JSX.Element;
  };
}
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
