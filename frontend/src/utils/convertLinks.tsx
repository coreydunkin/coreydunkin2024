import Link from "next/link";
import { domToReact, HTMLReactParserOptions } from "html-react-parser";

interface ConvertOptions extends HTMLReactParserOptions {
  replace: (domNode: any) => string | boolean | void | object | Element | null;
}

const ConvertLinks: ConvertOptions = {
  replace: ({ attribs, children }) => {
    if (!attribs) return;

    if (attribs.href) {
      return (
        <Link href={attribs.href} className={attribs.class}>
          {domToReact(children, ConvertLinks)}
        </Link>
      );
    }
  },
};

export default ConvertLinks;
