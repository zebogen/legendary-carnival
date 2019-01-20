import React, { RefObject } from 'react';

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
        <label htmlFor={this.inputID}>
          Search Movies
        </label>
        <input
          defaultValue={this.props.initialSearch}
          id={this.inputID}
          type="text"
          ref={this.inputRef}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchForm;