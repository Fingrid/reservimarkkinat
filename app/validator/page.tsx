"use client";
import { useEffect } from "react";
import cn from "clsx";
import {
  InputTabs,
  TextInputArea,
  FileInputArea,
  ButtonSection,
  OutputSection,
} from "./_components";
import { useValidatorStore } from "@/_store/validatorStore";

const classes = {
  container: "xml-validator x:mx-auto x:max-w-(--nextra-content-width) p-[3rem]",
  wrapper: "flex flex-col gap-y-[2.5rem]",
  headerSection: "flex flex-col",
  title: "text-2xl font-bold mb-2",
  description: "text-base",
  inputSection: "flex-1",
  bottomBorder: "border-t border-gray-300 mt-4 pt-4",
};

export default function Page() {
  const { activeTab, reset } = useValidatorStore();

  useEffect(() => {
    reset();
  }, [reset]);

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

        <div id="input-section" className={cn(classes.inputSection)}>
          <InputTabs />
          {activeTab === "text" ? <TextInputArea /> : <FileInputArea />}
        </div>

        <ButtonSection />
        <OutputSection />

        <div id="bottom-border" className={cn(classes.bottomBorder)}>
          &nbsp;
        </div>
      </div>
    </div>
  );
}
