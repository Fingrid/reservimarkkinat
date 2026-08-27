import type { MDXWrapper } from "nextra";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type { ReactNode } from "react";
import type { ExtractFCType } from "@/types";
import { useMDXComponents } from "../../mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

interface PageProps {
  params: Promise<{
    mdxPath: string[];
    [localeSegmentKey: string]: string | string[];
  }>;
}

interface PageImport extends ExtractFCType<MDXWrapper> {
  default: (params: Record<string, unknown>) => ReactNode | Promise<ReactNode>;
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = (await importPage(params.mdxPath)) as PageImport;
  return metadata;
}

// biome-ignore lint/correctness/useHookAtTopLevel: Nextra exposes this server-side component factory with a hook-like name.
const Wrapper = useMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = (await importPage(params.mdxPath)) as PageImport;
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
