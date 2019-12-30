import React from 'react';

import Checkbox from '@iso/components/uielements/checkbox';
import Form from '@iso/components/uielements/form';
import IntlMessages from '@iso/components/utility/intlMessages';
import TextArea from 'antd/lib/input/TextArea';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { POSITION_SOURCE } from '../../config/Constants';
const FormItem = Form.Item;

function Step6({ form, dev }) {
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="isoInputWrapper">
        <FormItem
          label="How did you hear about this position?"
          help="Please quote a minimum working price for your content services. We will keep this in mind while we evaluate and negotiate."
        >
          {getFieldDecorator('socialMedia', {
            valuePropName: 'value',
            initialValue: dev ? POSITION_SOURCE[0].value : '',
          })(
            <Select
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {POSITION_SOURCE.map((item, index) => (
                <SelectOption key={`genreone${index}`} value={item.value}>
                  {item.label}
                </SelectOption>
              ))}
            </Select>
          )}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem label="What profession are you in, apart from freelance writing?">
          {getFieldDecorator('currentProfession', {
            valuePropName: 'value',
          })(<TextArea />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
        <FormItem>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
              {
                message: 'Please accept terms and conditions',
                required: true,
              },
            ],
            initialValue: dev ? true : false,
          })(
            <Checkbox>
              <IntlMessages id="page.signUpTermsConditions" />
            </Checkbox>
          )}
        </FormItem>
      </div>
    </>
  );
}
export default Step6;
