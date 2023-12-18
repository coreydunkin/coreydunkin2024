// create a case switch that returns a react component based on a string

import { TbBrandNextjs } from "react-icons/tb";
import {
  SiTypescript,
  SiContentful,
  SiDrupal,
  SiReact,
  SiAngular,
  SiAzuredevops,
  SiAdobe,
} from "react-icons/si";
import {
  FaNodeJs,
  FaCheck,
  FaJenkins,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const GetIcon = (iconColor: string, icon: string) => {
  switch (icon) {
    case "nextjs":
      return (
        <TbBrandNextjs
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "typescript":
      return (
        <SiTypescript
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "contentful":
      return (
        <SiContentful
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "drupal":
      return (
        <SiDrupal
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "react":
      return (
        <SiReact
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "angular":
      return (
        <SiAngular
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "nodejs":
      return (
        <FaNodeJs
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "azure":
      return (
        <SiAzuredevops
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "aem":
      return (
        <SiAdobe
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "jenkins":
      return (
        <FaJenkins
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
    case "github":
      return <FaGithub />;
    case "linkedin":
      return <FaLinkedin />;
    case "email":
      return <HiOutlineMail />;
    case "phone":
      return <FaPhone />;
    default:
      return (
        <FaCheck
          style={{ color: iconColor }}
          className="text-red-600 w-8 h-8"
        />
      );
  }
};

export default GetIcon;
