import React from 'react';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { GENRE, VERTICAL } from '../../config/Constants';

const FormItem = Form.Item;

function Step3({ form, dev }) {
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="isoInputWrapper">
        <FormItem
          label="Please select your Most Prefered Genre"
          help="We will be allotting you work projects based on your preferred genre only. In case you have no specialization, please fill the 'Generic' option. Your samples will be evaluated based on your prefered Genre."
        >
          {getFieldDecorator('genre1', {
            valuePropName: 'value',
            rules: [
              {
                required: true,
                message: 'Please select your Most Prefered Genre.',
              },
            ],
            initialValue: dev ? GENRE[0].value : '',
          })(
            <Select
              showSearch
              placeholder="Select a Genre"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {GENRE.map((item, index) => (
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
          label="Please select your second Most Prefered Genre"
          help="We will be allotting you work projects based on your preferred genre only. In case you have no specialization, please fill the 'Generic' option. Your samples will be evaluated based on your prefered Genre."
        >
          {getFieldDecorator('genre2', {
            valuePropName: 'value',
            initialValue: dev ? GENRE[0].value : '',
          })(
            <Select
              showSearch
              placeholder="Select a Genre"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {GENRE.map((item, index) => (
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
          label="Please select your Most Preferred Vertical"
          help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
        >
          {getFieldDecorator('vertical1', {
            valuePropName: 'value',
            initialValue: dev ? VERTICAL[0].value : '',
          })(
            <Select
              showSearch
              placeholder="Select a Vertical"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {VERTICAL.map((item, index) => (
                <SelectOption key={`genreone${index}`} value={item.value}>
                  {item.label}
                </SelectOption>
              ))}
            </Select>
          )}
        </FormItem>
      </div>
    </>
  );
}
export default Step3;
