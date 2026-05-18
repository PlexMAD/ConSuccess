const TeacherMaterialBadge = ({ className = "" }: { className?: string }) => {
  const classes = `inline-flex max-w-full shrink-0 items-center rounded-md bg-emerald-50 px-2 py-0.5 text-left text-[10px] font-semibold leading-tight text-emerald-700 ${className}`;

  return <span className={classes}>Материал от преподавателя</span>;
};

export default TeacherMaterialBadge;
