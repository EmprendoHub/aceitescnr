import TabOne from "@/components/email/template/TabOne";
import EmailTemplateComp from "@/components/email/template/EmailTemplateComp";

export default function BulkEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmailTemplateComp />
      <br />
      <div className="border border-1 shadow-lg p-8 maxsm:px-1 rounded-lg w-full">
        <TabOne />
      </div>
    </div>
  );
}
