import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const FilterDropdown = ({ value, onChange, options, placeholder }: FilterDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px] bg-secondary border-border h-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
