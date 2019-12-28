import React from 'react';

import Form from '@iso/components/uielements/form';
import TextArea from 'antd/lib/input/TextArea';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { PAY_RANGE } from '../../config/Constants';
const FormItem = Form.Item;

function Step5({ form, dev }) {
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="isoInputWrapper">
        <FormItem
          label="Please let us know your Expected Pay? (In Rupees per word)"
          help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
        >
          {getFieldDecorator('expectedPay', {
            valuePropName: 'value',
            initialValue: dev ? PAY_RANGE[0].value : '',
          })(
            <Select
              showSearch
              placeholder="Select Rupees per word"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {PAY_RANGE.map((item, index) => (
                <SelectOption key={`genreone${index}`} value={item.value}>
                  {item.label}
                </SelectOption>
              ))}
            </Select>
          )}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem
          label="Please tell us a bit about your previous writing experiences and skillsets."
          help="Please tell us more about the types of content projects that you've worked on before."
        >
          {getFieldDecorator('writingSkillSet', {
            valuePropName: 'value',
          })(<TextArea />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem
          label="Please list down the companies that you've worked for in the past."
          help="It is not absolutely necessary but helps us decide better. It will also affect the pay scale that we offer you."
        >
          {getFieldDecorator('pastCompanies', {
            valuePropName: 'value',
          })(<TextArea />)}
        </FormItem>
      </div>
    </>
  );
}
export default Step5;
