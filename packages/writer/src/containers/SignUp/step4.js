import React from 'react';
import Checkbox from '@iso/components/uielements/checkbox';
import Upload from '@iso/components/uielements/upload';
import message from '@iso/components/uielements/message';
import Icon from '@iso/components/uielements/icon';
import Form from '@iso/components/uielements/form';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { VERTICAL, LANGUAGE } from '../../config/Constants';
const { Dragger } = Upload;
const FormItem = Form.Item;

const draggerProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function Step4({ form, dev }) {
  const { getFieldDecorator } = form;
  return (
    <>
      <div className="isoInputWrapper">
        <FormItem
          label="Please select your second Most Preferred Vertical"
          help="We will be allotting you work projects based on your preferred vertical only. Also, the samples that you will be attaching in the form below, will be evaluated based on your preference given in the vertical."
        >
          {getFieldDecorator('vertical2', {
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
      <div className="isoInputWrapper">
        <FormItem
          label="What languages are you proficient in?"
          help="Please update the samples based on your proficiency in the different languages."
        >
          {getFieldDecorator('languages', {
            valuePropName: 'value',
            initialValue: dev ? [LANGUAGE[0].value] : [],
          })(<Checkbox.Group options={LANGUAGE} />)}
        </FormItem>
      </div>
      <div className="isoInputWrapper">
        <FormItem
          label="Please upload Samples (Preferably in the categories that you have selected.)"
          help="The more, the merrier. We will only be able to assign you assignments in verticals and genre that you can prove you have previous experience in. And these samples help us pinpoint these verticals and categories!"
        >
          <Dragger {...draggerProps}>
            <p>
              <Icon type="cloud-upload" />
              <span>Drag & drop (or) choose file</span>
            </p>
          </Dragger>
        </FormItem>
      </div>
    </>
  );
}
export default Step4;
