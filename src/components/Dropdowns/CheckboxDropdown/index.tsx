import { useState, MouseEvent, useMemo } from "react";

import { FormGroup, Popover, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import BasicCheckbox from "@/components/Checkboxes/BasicCheckbox";

const CheckboxDropdown = (props) => {
  const { name, options = [], onChange = () => {} } = props;
  const [checkedOptions, setCheckedOptions] = useState(options);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  const handleCheckboxClick = (index, isChecked) => {
    const newCheckedOptions = checkedOptions.map((checkedOption) => {
      if (checkedOption.id == index) {
        return { ...checkedOption, checked: isChecked };
      }

      return checkedOption;
    });
    setCheckedOptions(newCheckedOptions);
  };

  const activeFilters = useMemo(() => {
    const newCheckedOptions = checkedOptions.filter(
      (option) => !!option?.checked
    );
    onChange({ column: name, filters: newCheckedOptions });
    return newCheckedOptions;
  }, [checkedOptions]);

  return (
    <>
      <button
        id="filterDropdownButton"
        data-dropdown-toggle="filterDropdown"
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 capitalize"
        type="button"
        onClick={handleClick}
      >
        {name}
        <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
          {activeFilters.length}
        </span>
        {isOpen ? (
          <ExpandLess fontSize="small" sx={{ ml: 1 }} />
        ) : (
          <ExpandMore fontSize="small" sx={{ ml: 1 }} />
        )}
      </button>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <FormGroup>
            {options.map((option) => (
              <BasicCheckbox
                label={option.name}
                value={option.id}
                checked={
                  checkedOptions.find(
                    (checkedOption) => checkedOption.id === option.id
                  )?.checked
                }
                size="small"
                onChange={(e) => {
                  const { value, checked } = e.target;
                  handleCheckboxClick(value, checked);
                }}
              />
            ))}
          </FormGroup>
        </Typography>
      </Popover>
    </>
  );
};

export default CheckboxDropdown;
