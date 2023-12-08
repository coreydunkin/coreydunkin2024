import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col items-center justify-between overflow-visible">
      <div className="relative flex min-h-screen flex-col justify-center overflow-visible">
        {children}
      </div>
    </div>
  );
};

export default Container;
