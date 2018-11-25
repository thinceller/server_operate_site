import React from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core';

class OperateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSubmit = () => {
    this.props.postServerOperate(this.state.value);
  };

  render() {
    return (
      <div>
        <FormControl>
          <Select
            onChange={this.handleChange}
            value={this.state.value}
          >
            <MenuItem value="start">起動</MenuItem>
            <MenuItem value="stop">停止</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="default" onClick={this.handleChange}>
          実行
        </Button>
      </div>
    );
  }
}

export default OperateForm;
