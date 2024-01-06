import RichText from "@/components/ResumeContent/RichText";

const Content = ({ title, subTitle, date, description }: any) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex flex-col sm:flex-row">
        <div className="md:mb-4 sm:mr-8 sm:mb-0 md:max-w-[100px] print:max-w-[100px] w-full text-slate-600 font-semibold">
          {date}
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="text-slate-700 font-semibold">{title}</h4>
          <p className="text-slate-700">
            {subTitle}
          </p>
          {description ? (
            <div className="text-slate-700 mt-2">
              <RichText text={description} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Content;