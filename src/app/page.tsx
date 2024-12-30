import * as React from "react";
import {CardForm} from "@/app/home/card-form";

export default function Page() {
  return (
    <div className="grid items-center justify-items-center p-8 pb-30 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <CardForm></CardForm>
    </div>
  );
}
