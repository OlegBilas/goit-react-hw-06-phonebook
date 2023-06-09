import { Label, Input } from 'components/ContactForm/ContactForm.styled';
import { setFilter } from 'redux/filter/filterSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <>
      <Label htmlFor="1">Find contacts by name</Label>
      <Input
        id="1"
        type="text"
        name="filter"
        title="Use this field to filter contacts by contact's name"
        onChange={handleChangeFilter}
      />
    </>
  );
};

export default Filter;
