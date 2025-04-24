import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "../../mdx-components";
import { MDXWrapper } from "nextra";
import { ReactNode } from "react";
import { ExtractFCType } from "@/types";

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

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = (await importPage(params.mdxPath)) as PageImport;
  const { default: MDXContent, toc, metadata } = result;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
