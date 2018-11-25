import React from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core';

import './OperateForm.css';

class OperateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleSelectChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value === '' || !window.confirm('本当に実行しますか？')) {
      return;
    }
    this.props.postServerOperate(this.state.value);
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className="operate__form">
        <form onSubmit={this.handleSubmit}>
          <FormControl variant="filled">
            <Select
              onChange={this.handleSelectChange}
              value={this.state.value}
              className="form__select"
            >
              <MenuItem value="start">起動</MenuItem>
              <MenuItem value="stop">停止</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="default" type="submit">
            実行
          </Button>
        </form>
      </div>
    );
  }
}

export default OperateForm;
