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
  Tag,
  RectangleEllipsis,
  RulerDimensionLine,
  MapPin,
  User,
  ALargeSmall,
  Type,
  MessageSquareText,
  Grid2X2,
  Grid2X2Plus,
  Sun,
  Moon
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
  Upload,
  Tag, //? Preço
  RectangleEllipsis, //? Código
  RulerDimensionLine, //? Tamanho
  MapPin,
  User,
  ALargeSmall, //? Título
  Type,
  MessageSquareText, //? Descriçao
  Grid2X2, //? Categoria Normal
  Grid2X2Plus, //? Adicionar Categoria
  Sun,
  Moon
};

type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

export default function Icon({
  name,
  size = 18,
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