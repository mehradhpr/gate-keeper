import React, {FC} from 'react';
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";


interface loadingProps {
}


const Loading: FC<loadingProps> = ({}) => {
  const Loader = ({className}: { className?: string }) => {
    return (
      <Loader2
        className={cn('my-28 h-16 w-16 text-primary/60 animate-spin', className)}
      />
    );
  };

  return <Loader/>;
};

export default Loading;
