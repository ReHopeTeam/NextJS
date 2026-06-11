import {
  Search,
  ArrowDownZA,
  ArrowDownAZ,
  ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasing,
  SquarePen,
  Eye,
  EyeOff,
  LucideProps,
  Delete,
  Filter,
  Upload,
} from "lucide-react";

const icons = {
  Search,
  ArrowDownZA,
  ArrowDownAZ,
  ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasing,
  Delete,
  SquarePen,
  Eye,
  EyeOff,
  Filter,
  Upload
};

type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

export default function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}