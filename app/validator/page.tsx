import cn from "clsx";
import { InputTabsSection, ButtonSection, OutputSection } from "./_components";

const classes = {
  container:
    "xml-validator x:mx-auto x:max-w-(--nextra-content-width) p-[3rem]",
  wrapper: "flex flex-col gap-y-[2.5rem]",
  headerSection: "flex flex-col",
  title: "text-2xl font-bold mb-2",
  description: "text-base",
  bottomBorder: "border-t border-gray-300 mt-4 pt-4",
};

export default async function Page() {
  return (
    <div className={cn(classes.container)}>
      <div className={cn(classes.wrapper)}>
        <div className={cn(classes.headerSection)}>
          <h1 className={cn(classes.title)}>Reservemarket Test Tool</h1>
          <p className={cn(classes.description)}>
            Validate messages and errors by adding code to XML-validator.
            Validator will show error messages as results.
          </p>
        </div>

        <InputTabsSection />
        <ButtonSection />
        <OutputSection />

        <div id="bottom-border" className={cn(classes.bottomBorder)}>
          &nbsp;
        </div>
      </div>
    </div>
  );
}
