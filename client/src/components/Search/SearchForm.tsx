import React, { RefObject } from 'react';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import styled from 'styled-components';
import { Flex } from 'rebass';

interface SearchFormProps {
  id?: string;
  initialSearch?: string;
  onSubmit: (searchString: string) => void;
}

class SearchForm extends React.PureComponent<SearchFormProps> {
  static defaultProps = {
    id: 'search-form',
    initialSearch: '',
  };

  private inputRef: RefObject<HTMLInputElement> = React.createRef();

  public get inputID() {
    return `${this.props.id}-input`;
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.inputRef.current) {
      this.props.onSubmit(this.inputRef.current.value);
    } else {
      throw new Error('Cannot submit without input ref value!');
    }
  };
  
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Label
          fontSize={3}
          htmlFor={this.inputID}
        >
          Search Movies
        </Label>
        <SearchBar mt={2}>
          <Input
            defaultValue={this.props.initialSearch}
            id={this.inputID}
            name="search"
            type="text"
            ref={this.inputRef}
          />
          <Button ml={2} type="submit">Search</Button>
        </SearchBar>
      </form>
    )
  }
}

const SearchBar = styled(Flex)`
  input {
    flex-grow: 1;
  }
`;

export default SearchForm;