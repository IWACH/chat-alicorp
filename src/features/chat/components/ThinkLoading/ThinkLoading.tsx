interface Props {
  text?: string;
}

const ThinkLoading = ({ text = "Pensando..." }: Props) => {
  return (
    <div className="mr-auto flex items-center gap-2 text-muted-foreground text-sm">
      <span className="relative inline-flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
      </span>
      {text}
    </div>
  );
};

export default ThinkLoading;
