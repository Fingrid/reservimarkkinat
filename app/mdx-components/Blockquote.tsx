import { withGitHubAlert } from "nextra/components";
import { ComponentProps, PropsWithChildren } from "react";

type Props = {
  type: "note" | "tip" | "important" | "warning" | "caution";
};

/*
The first argument should be a React HOC component that handles the GitHub alert syntax, and the second argument should be your standard <blockquote> component.
*/

// This is a custom blockquote component
const BlockquoteComponent = ({
  children,
}: PropsWithChildren<ComponentProps<"blockquote">>) => {
  return (
    <blockquote
      style={{
        borderLeft: "5px solid #333",
        padding: "0.5rem 1rem",
        margin: "1rem 0",
      }}
    >
      {children}
    </blockquote>
  );
};

// This is a custom callout component
const Callout = ({ type, children }: PropsWithChildren<Props>) => {
  const borderColor =
    type === "note"
      ? "#0070f3"
      : type === "tip"
      ? "#47b881"
      : type === "important"
      ? "#f5a623"
      : type === "warning"
      ? "#f5a623"
      : type === "caution"
      ? "#f5a623"
      : "#333";

  return (
    <div
      className={`alert alert-${type}`}
      style={{
        borderLeft: "5px solid #333",
        borderColor,
        padding: "0.5rem 1rem",
        margin: "1rem 0",
      }}
    >
      &gt;&gt; {children}

      <pre>{JSON.stringify(children)}</pre>
    </div>
  );
};

export const Blockquote = withGitHubAlert(({ type, ...props }) => {
  return <Callout type={type} {...props} />;
}, BlockquoteComponent);
