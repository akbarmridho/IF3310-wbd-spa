import {
  LoaderFunction,
  useLoaderData as useRouterLoaderData,
} from "react-router-dom";

type LoaderData<TloaderFn extends LoaderFunction> = Awaited<
  ReturnType<TloaderFn>
> extends Response | infer D
  ? D
  : never;

export function useLoaderData<T>(): T extends LoaderFunction
  ? LoaderData<T>
  : T {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return useRouterLoaderData() as any;
}
