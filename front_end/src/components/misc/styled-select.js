import React from 'react';
import Select from 'react-select';
import { PageSettings } from '../../config/page-settings';

function StyledSelect(props) {
    const appContext = React.useContext(PageSettings);
    const [darkMode, setDarkMode] = React.useState(appContext.colorScheme === 'dark')

    React.useEffect(() => {
        if (appContext.colorScheme === 'dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [appContext.colorScheme])

    const baseTextColor = getComputedStyle(document.documentElement).getPropertyValue('--base-text-color');
    const darkModeTextColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-text-color');
    const darkModeDisabledTextColor = 'hsl(0,0%,50%)'
    const bsPrimary = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');
    const darkModeBackgroundColor = '#191919';
    const darkModeDisabledBackgroundColor = '#373737';
    const darkModeBorderColor = '#373737';

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: darkMode? darkModeBackgroundColor : provided.backgroundColor,
            borderColor: darkMode? darkModeBorderColor : provided.borderColor,
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: darkMode
                ? state.isDisabled
                    ? darkModeDisabledBackgroundColor
                    : darkModeBackgroundColor 
                : provided.backgroundColor,
            color: darkMode
                ? state.isDisabled
                    ? darkModeDisabledTextColor
                    : darkModeTextColor 
                : provided.color,
            borderColor: darkMode? darkModeBorderColor : provided.borderColor,
            minHeight: '36px',
            height: '36px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? bsPrimary
                : state.isFocused
                    ? darkMode
                        ? '#003e9b'
                        : provided.backgroundColor
                    : provided.backgroundColor
        }),
        input: (provided, state) => ({
            ...provided,
            color: darkMode
                ? state.isDisabled
                    ? darkModeDisabledTextColor
                    : darkModeTextColor 
                : provided.color,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: darkMode
                ? state.isDisabled
                    ? darkModeDisabledTextColor
                    : darkModeTextColor 
                : provided.color
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: darkMode
                ? state.isDisabled
                    ? 'hsl(0,0%,60%)'
                    : provided.backgroundColor
                : provided.backgroundColor
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: darkMode
                ? state.isDisabled
                    ? 'hsl(0,0%,60%)'
                    : provided.color
                : provided.color
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0.375rem 0.75rem',
            height: '35px',
            minHeight: '35px',
            lineHeight: '1.5'
        }),
        menuPortal: provided => ({ ...provided, zIndex: 9999 }),
    }

    return(
        <Select
            className={props.className}
            placeholder={props.placeholder}
            options={props.options}
            onChange={props.onChange}
            value={props.value}
            menuPortalTarget={document.body}
            menuShouldScrollIntoView={props.menuShouldScrollIntoView}
            styles={customStyles}
            menuPlacement={'auto'}
            darkMode={darkMode}
            isDisabled={props.isDisabled}
            isSearchable={props.isSearchable}
        />
    )
}

export default StyledSelect;
