import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden pl-12 pr-12 lg:p-[28rem]">
      {children}
    </div>
  );
};

export default Container;
