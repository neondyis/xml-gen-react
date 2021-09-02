import React, { useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Field, getIn, FastField } from "formik";
import {
  Box,
  TextInput,
  CheckBox,
  Select,
  FormField,
  Button,
  FileInput,
} from "grommet";

const INPUT_DELAY = 200;

export const TextInputWrapper = (props) => {
  const [innerValue, setInnerValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value);
    } else {
      setInnerValue("");
    }
  }, [props.value]);

  const debouncedHandleOnChange = useDebouncedCallback((event) => {
    if (props.onChange) {
      props.onChange(event);
      if (props.setTouched) {
        props.setTouched(event.target.name, true, true);
      }
    }
  }, INPUT_DELAY);

  const handleOnChange = useCallback(
    (event) => {
      event.persist();
      const newValue = event.currentTarget.value;
      setInnerValue(newValue);
      debouncedHandleOnChange(event);
    },
    [debouncedHandleOnChange]
  );

  return <TextInput {...props} value={innerValue} onChange={handleOnChange} />;
};

export const Option = ({ value, selected }) => {
  return (
    <Box direction="row" gap="small" align="center" pad="xsmall">
      <CheckBox tabIndex="-1" checked={selected} />
      {value}
    </Box>
  );
};

export const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);

      return touch && error ? error : null;
    }}
  />
);

export const ScrollableContainer = ({ text }) => {
  return (
    <Box fill={true}>
      <Box align="center" background="light-1" overflow="auto">
        <Box
          flex={false}
          background="white"
          border="all"
          style={{ width: "888px", maxHeight: "500px" }}
        >
          <pre>{text}</pre>
        </Box>
      </Box>
    </Box>
  );
};

export const BundleCodeField = ({
  paramIndex,
  param,
  values,
  index,
  setFieldValue,
  setFieldTouched,
  customBundleCode,
  selectOptionsRef,
}) => {
  return (
    <FastField key={paramIndex}>
      {(_) => {
        return (
          <FormField label={param}>
            <Select
              multiple
              closeOnChange={false}
              placeholder="Select bundle codes"
              name={`bundles[${index}].${param}`}
              options={selectOptionsRef.current[param]}
              selected={[]}
              value={values.bundles[index][param] || ""}
              onChange={({ option }) => {
                const newSelected = [...values.bundles[index][param]];
                const selectedIndex = newSelected.indexOf(option);
                if (selectedIndex >= 0) {
                  newSelected.splice(selectedIndex, 1);
                } else {
                  newSelected.push(option);
                }
                setFieldValue(
                  `bundles[${index}][${param}]`,
                  newSelected.sort()
                );
              }}
              setTouched={setFieldTouched}
            >
              {(option) => (
                <Option
                  value={option}
                  selected={values.bundles[index][param].indexOf(option) >= 0}
                />
              )}
            </Select>
            <Box>
              <FastField>
                {(_) => {
                  return (
                    <FormField>
                      <TextInputWrapper
                        placeholder="Type here for custom bundle code"
                        value={customBundleCode.current}
                        onChange={(e) => {
                          customBundleCode.current = e.target.value;
                        }}
                      />
                    </FormField>
                  );
                }}
              </FastField>
              <Button
                type="button"
                label="Add Custom Bundle Code"
                onClick={() => {
                  selectOptionsRef.current.bundleCode.push(
                    customBundleCode.current
                  );
                }}
              />
            </Box>
          </FormField>
        );
      }}
    </FastField>
  );
};

export const LateAndLiveField = ({
  paramIndex,
  param,
  values,
  index,
  selectOptions,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <FastField key={paramIndex + "late"}>
      {(_) => {
        return (
          <FormField label={param}>
            <Select
              placeholder="Select Late And Live"
              name={`bundles[${index}].${param}`}
              options={selectOptions.current[param]}
              value={`${values.bundles[index][param]}` || ""}
              onChange={(event) => {
                setFieldValue(`bundles[${index}][${param}]`, event.value);
              }}
              setTouched={setFieldTouched}
            />
          </FormField>
        );
      }}
    </FastField>
  );
};

export const SourceField = ({
  paramIndex,
  param,
  values,
  index,
  selectOptionsRef,
  setFieldValue,
  setFieldTouched,
  customSource,
}) => {
  return (
    <FastField key={paramIndex}>
      {(_) => {
        return (
          <FormField label={param}>
            <Select
              placeholder="Select Source"
              name={`bundles[${index}].${param}`}
              options={selectOptionsRef.current[param]}
              value={`${values.bundles[index][param]}` || ""}
              onChange={(event) => {
                setFieldValue(`bundles[${index}][${param}]`, event.value);
              }}
              setTouched={setFieldTouched}
            />
            <Box>
              <FastField>
                {(_) => {
                  return (
                    <FormField>
                      <TextInputWrapper
                        placeholder="Type here for custom source"
                        value={customSource.current}
                        onChange={(e) => {
                          customSource.current = e.target.value;
                        }}
                      />
                    </FormField>
                  );
                }}
              </FastField>
              <Button
                type="button"
                label="Add Custom source"
                onClick={() => {
                  selectOptionsRef.current.source.push(customSource.current);
                }}
              />
            </Box>
          </FormField>
        );
      }}
    </FastField>
  );
};

export const BasicBundleField = ({
  paramIndex,
  param,
  values,
  index,
  setFieldTouched,
  handleChange,
}) => {
  return (
    <FastField key={paramIndex}>
      {() => {
        return (
          <FormField label={param}>
            <TextInputWrapper
              name={`bundles[${index}].${param}`}
              value={values.bundles[index][param] || ""}
              onChange={handleChange}
              setTouched={setFieldTouched}
            />
          </FormField>
        );
      }}
    </FastField>
  );
};

export const FileInputField = ({
  setFieldValue,
  index,
  avIndex,
  setLoading,
}) => {
  return (
    <FileInput
      name="file"
      onChange={(event) => {
        setLoading(true);
        const file = event.target.files[0];
        window.api.send("toMain", {
          name: "md5",
          data: file.path,
        });

        window.api.receive("fromMain", async (response) => {
          setLoading(false);
          const {
            name,
            hash,
            fileSize,
            duration,
            bitrate,
            aspectRatio,
            codingProfile,
            codingName,
          } = JSON.parse(response);
          name === "md5-hash" &&
            setFieldValue(
              `bundles[${index}].avRenditions[${avIndex}].fileName`,
              file.name
            );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.fileChecksum`,
            hash
          );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.fileSize`,
            fileSize
          );
          setFieldValue(
            `bundles[${index}].codingProfile`,
            codingProfile.toUpperCase()
          );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.aspectRatio`,
            aspectRatio.replace(":", "x")
          );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.bitrate`,
            bitrate
          );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.profile`,
            `BBX01${bitrate.substr(0, 4)}`
          );
          setFieldValue(
            `bundles[${index}].codingName`,
            codingName.toUpperCase()
          );
          setFieldValue(
            `bundles[${index}].assetDuration`,
            `${new Date(duration * 1000).toISOString().substr(11, 8)}:00@25`
          );
          setFieldValue(
            `bundles[${index}].avRenditions[${avIndex}].videoAttributes.pictureDefinition`,
            bitrate * 0.000977 < 1200
              ? "SD"
              : bitrate * 0.000977 < 8000
              ? "HD"
              : "UHD"
          );
        });
      }}
    ></FileInput>
  );
};

export const FileNameField = ({ index, avIndex, values, handleChange }) => {
  return (
    <FastField>
      {(_) => {
        return (
          <FormField label="File Name">
            <TextInputWrapper
              name={`bundles[${index}].avRenditions[${avIndex}].fileName`}
              value={values.bundles[index].avRenditions[avIndex].fileName || ""}
              onChange={handleChange}
            />
          </FormField>
        );
      }}
    </FastField>
  );
};

export const PictureDefinitionField = ({
  vidIndex,
  vidParam,
  index,
  avIndex,
  selectOptions,
  values,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <FastField key={vidIndex}>
      {(props) => {
        return (
          <FormField label={vidParam}>
            <Select
              name={`bundles[${index}].avRenditions[${avIndex}].videoAttributes.${vidParam}`}
              options={selectOptions.current[vidParam]}
              value={
                values.bundles[index].avRenditions[avIndex].videoAttributes[
                  vidParam
                ] || ""
              }
              onChange={(event) => {
                setFieldValue(
                  `bundles[${index}].avRenditions[${avIndex}].videoAttributes.${vidParam}`,
                  event.value
                );
              }}
              setTouched={setFieldTouched}
            />
          </FormField>
        );
      }}
    </FastField>
  );
};

export const BasicAVField = ({
  vidIndex,
  vidParam,
  index,
  avIndex,
  values,
  handleChange,
}) => {
  return (
    <FastField key={vidIndex}>
      {(_) => {
        return (
          <FormField label={vidParam}>
            <TextInputWrapper
              name={`bundles[${index}].avRenditions[${avIndex}].videoAttributes.${vidParam}`}
              value={
                values.bundles[index].avRenditions[avIndex].videoAttributes[
                  vidParam
                ] || ""
              }
              onChange={handleChange}
            />
          </FormField>
        );
      }}
    </FastField>
  );
};

export const FinalAVFormButtons = ({
  avArrayHelper,
  initAVRenditions,
  avIndex,
  index,
  values,
}) => {
  return (
    <Box margin={{ top: "medium" }} direction="row" justify="between">
      <Button
        type="button"
        label="Add AVRendition"
        onClick={() => {
          avArrayHelper.push(initAVRenditions);
        }}
      />
      {values.bundles[index].avRenditions.length > 1 && (
        <Button
          type="button"
          label="Remove AVRendition"
          onClick={() => avArrayHelper.remove(avIndex)}
        />
      )}
    </Box>
  );
};
