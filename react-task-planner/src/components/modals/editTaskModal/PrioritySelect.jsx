import Select from "react-select";

const PrioritySelect = ({handleSelect, priority}) => {

  const defaultPriority = priority &&
  { value: priority, label: priority };

  return (
    <Select
      className="basic-single w-full"
      classNamePrefix="select"
      defaultValue={ defaultPriority }
      isClearable={true}
      name="priority"
      isSearchable={false}
      options={[
        { value: 'Basse', label: 'Basse' },
        { value: 'Moyenne', label: 'Moyenne' },
        { value: 'Haute', label: 'Haute' }
      ]}
      onChange={ handleSelect }
      theme={(theme) => ({
        ...theme,
        colors: {
          // ...theme.colors,
          neutral20: '#475569',
          neutral0: '#1e293b',
          // primary50: '#e2e8f0',
          primary25: '#334155',
          primary: '#5b21b6',
        },
      })}
    />
  )
}

export default PrioritySelect;