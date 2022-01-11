import { Form, Input as AntInput } from "antd";
import { InputSearchProps } from "./InputSearch.props";

const { Search } = AntInput;

export const InputSearch = (props: InputSearchProps): JSX.Element => {
  const [form] = Form.useForm();
  const fieldName = "inputSearch";
  const initialValue = "";

  const onTextSearch = (frmValues: { [key: string]: string }) => {
    const { inputSearch } = frmValues;
    props.onSearch(inputSearch);
  };

  return (
    <Form
      form={form}
      name="frm-search-contracts"
      onFinish={(val) => onTextSearch(val)}
    >
      <Form.Item initialValue={initialValue} name={fieldName}>
        <Search
          allowClear
          enterButton
          loading={props.loading}
          onSearch={() => form.submit()}
          placeholder={props.placeholder}
        />
      </Form.Item>
    </Form>
  );
};
