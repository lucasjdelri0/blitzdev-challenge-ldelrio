import { Form, Input as AntInput } from "antd";

const { Search } = AntInput;

const InputSearch = ({
  loading = false,
  placeholder,
  onSearch,
}: {
  loading: boolean;
  placeholder?: string;
  onSearch: (val: string) => void;
}): JSX.Element => {
  const [form] = Form.useForm();
  const fieldName = "inputSearch";
  const initialValue = "";

  const onTextSearch = (frmValues: { [key: string]: string }) => {
    const { inputSearch } = frmValues;
    onSearch(inputSearch);
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
          loading={loading}
          onSearch={() => form.submit()}
          placeholder={placeholder}
        />
      </Form.Item>
    </Form>
  );
};

export default InputSearch;
