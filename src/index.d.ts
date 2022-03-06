import { NextComponentType, NextPageContext } from 'next';
import { reduxStore } from '@/store/index';
declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    getLayout?: (page: any) => JSX.Element;
  };
}
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
type AppDispatch = typeof reduxStore.dispatch;
type RootState = ReturnType<typeof reduxStore.getState>;

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}

  export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
}
