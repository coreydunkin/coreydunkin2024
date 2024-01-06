
import {EntryField, ResumeFields} from "@/lib/contentful/utils";
import Image from "next/image";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";

type ResumeContentProps = {
  data: ResumeFields;
};

const TechList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => {
        return (
          <li
            className={`text-slate-600 dark:text-gray-400 ${index === 0 ? 'font-bold' : ''}`}
            key={`${item}-${index}`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

const Content = ({ title, subTitle, date, description }: any) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex">
        <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
          {date}
        </div>
        <div className="flex flex-col flex-1">
          <h4>{title}</h4>
          <p className="text-slate-600 dark:text-gray-400">
            {subTitle}
          </p>
          {description ? (
            <div className="text-slate-600 dark:text-gray-400 mt-2" dangerouslySetInnerHTML={{__html: description}} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const ResumeContent = ({ data }: ResumeContentProps | any) => {
  if (!data) return null;
  const {
    name,
    avatar,
    jobTitle,
    website,
    about,
    tech,
    apis,
    tools,
    workHistory,
    resumeContacts
  } = data;
  const avatarFile = avatar?.file?.url || "";

  return (
    <main className="max-w-xl mx-auto px-6 py-10 relative min-h-screen font-light">
        <section className="flex items-center">
          <Image
            alt="Author"
            src={`https:${avatarFile}`}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div className="ml-4">
            <h1 className="mb-0.5 text-xl text-slate-900 dark:text-slate-100">
              {name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {jobTitle}
            </p>
            {typeof website === 'string' ? (
              <span className="text-sm text-slate-400 dark:text-slate-400">
              {(() => {
                const websiteUrl = website as string;
                return (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {websiteUrl
                      .replace(/(^\w+:|^)\/\//, "")
                      .replace("www.", "")}
                  </a>
                );
              })()}
            </span>
            ) : null}
          </div>
        </section>
        <section className="my-9 text-sm">
          <h3 className="mb-1 text-slate-900 dark:text-slate-100">About</h3>
          <div className="text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{__html: about}} />
        </section>

        <section className="my-9 text-sm">
          <h3 className="mb-3 text-slate-900 dark:text-slate-100">Knowledge and Skills</h3>
          <div className="flex flex-row justify-between">
            <TechList items={tech} />
            <TechList items={apis} />
            <TechList items={tools} />
          </div>
        </section>

        <section className="my-14 text-sm">
          <h3 className="mb-3 text-slate-900 dark:text-slate-100">Work Experience</h3>
          {workHistory.map((content: EntryField, index: number) => {
            return <Content {...content} key={index} />;
          })}
        </section>

        <section className="my-14 text-sm">
          <h3 className="mb-6 text-slate-900">Contact</h3>
          <div className="flex flex-col gap-6">
            {resumeContacts.length > 0 && resumeContacts.map((contact: EntryField, index: number) => {
              return (
                <div className="flex" key={index}>
                  <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                    {contact.label}
                  </div>
                  <div className="flex flex-col flex-1 text-slate-900 dark:text-slate-100">
                    <a
                      href={contact.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex"
                    >
                      {contact.linkName}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                          className="fill-current text-slate-900 dark:text-slate-100"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
    </main>
  );
}

export default ResumeContent;
