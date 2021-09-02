import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, FastField, FieldArray } from "formik";
import {
  TextInputWrapper,
  ErrorMessage,
  BundleCodeField,
  ScrollableContainer,
  LateAndLiveField,
  SourceField,
  BasicBundleField,
  FileInputField,
  FileNameField,
  PictureDefinitionField,
  BasicAVField,
  FinalAVFormButtons,
} from "./FormComponents";
import * as yup from "yup";
import Loading from "../../components/util/Loading.jsx";

import { Box, Button, FormField, Heading } from "grommet";

const XMLForm = () => {
  const schema = yup.object().shape({
    bundles: yup.array().of(
      yup.object().shape({
        bundleCode: yup.array().required("Required"),
        productionNumber: yup.string().required("Required").max(21),
        assetDuration: yup
          .string()
          .matches(
            /\d{2}:\d{2}:\d{2}:\d{2}@\d{2}/,
            "invalid duration use format: 00:00:00:00"
          )
          .required("Required"),
        serverName: yup.string(),
        source: yup.string().required("Required"),
        lateAndLive: yup.string().oneOf(["TRUE", "FALSE"]).required("Required"),
        assetLocation: yup.string().required("Required"),
        deliveryType: yup.string(),
        deliveryTypeVersion: yup.string(),
        segmentDuration: yup.number().required("Required"),
        codingName: yup.string(),
        codingProfile: yup.string(),
        audioLineUp: yup.number(),
        avRenditions: yup.array().of(
          yup
            .object()
            .shape({
              fileName: yup.string().required("Required"),
              videoAttributes: yup.object().shape({
                fileChecksum: yup.string().required("Required"),
                fileSize: yup.number(),
                pictureDefinition: yup
                  .string()
                  .oneOf(["SD", "HD", "UD"])
                  .required("Required"),
                aspectRatio: yup.string(),
                profile: yup.string(),
                bitrate: yup.number().required("Required"),
              }),
            })
            .required()
        ),
      })
    ),
    fileNum: yup.number().required(),
  });
  const initVidAttrib = {
    fileChecksum: "",
    fileSize: "",
    pictureDefinition: "",
    aspectRatio: "",
    profile: "",
    bitrate: "",
  };
  const initAVRenditions = {
    fileName: "",
    videoAttributes: initVidAttrib,
  };
  const initBundleValues = {
    bundleCode: "",
    productionNumber: "",
    assetDuration: "",
    serverName: "GRWIsilon",
    source: "",
    lateAndLive: "FALSE",
    assetLocation: "s3://sitv-transcoded/BVTs/LOAD",
    deliveryType: "HLS",
    deliveryTypeVersion: "6",
    segmentDuration: "6",
    codingName: "",
    codingProfile: "MAIN",
    audioLineUp: "2",
    avRenditions: [initAVRenditions],
  };
  const initFormValues = {
    bundles: [initBundleValues],
    fileNum: "1",
  };

  const selectOptionsRef = useRef({
    bundleCode: ["6", "14", "18", "20", "21", "30", "31", "32"],
    source: ["Catch Up", "CDM Catch Up", "CDM Content Store"],
    lateAndLive: ["TRUE", "FALSE"],
    pictureDefinition: ["SD", "HD", "QHD", "UHD"],
  });

  const [submitted, setSubmitted] = useState(false);
  const customBundleCode = useRef("");
  const customSource = useRef("");
  const [loading, setLoading] = useState(false);

  const changeLoading = (state) => {
    setLoading(state);
  };

  useEffect(() => {
    initElectronListener()
  }, []);

  const initElectronListener = () => {
    window.api.receive("fromMain", (response) => {
      const { name, data } = JSON.parse(response);

      switch (name) {
        case "xml-gen":
          console.log(`Received ${data} from main process`);
          setLoading(false)
          break;
        default:
          console.log(`Received ${name} from main process`);
      }
    });
  }

  const onFinish = (formData) => {
    window.api.send("toMain", {
      name: "gen-xml",
      data: JSON.stringify(formData, null, 2),
    });
    setLoading(true);
  };

  return (
    <div style={{ height: "100%" }}>
      
      <Formik
        enableReinitialize={true}
        initialValues={initFormValues}
        validationSchema={schema}
        validateOnBlur={!submitted}
        validateOnChange={!submitted}
        onSubmit={(values,{resetForm}) => {
          onFinish(values);
          resetForm();
          setSubmitted(true);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          touched,
          isValid,
          dirty,
        }) => (
          <Form
>
            <Box>
              <Heading margin="none" alignSelf="center">
                Bundles
              </Heading>
            </Box>
            <FieldArray name="bundles">
              {(bArrayHelper, bArrayHelperIndex) => (
                <div key={bArrayHelperIndex}>
                  {values.bundles.length >= 0 &&
                    values.bundles.map((bundle, index) => (
                      <div key={index}>
                        <Heading margin="none" alignSelf="center">
                          Bundle {index + 1}
                        </Heading>
                        {Object.keys(initBundleValues).map(
                          (param, paramIndex) => (
                            <div>
                              {param === "bundleCode" ? (
                                <BundleCodeField
                                  paramIndex={paramIndex}
                                  param={param}
                                  values={values}
                                  index={index}
                                  setFieldValue={setFieldValue}
                                  setFieldTouched={setFieldTouched}
                                  customBundleCode={customBundleCode}
                                  selectOptionsRef={selectOptionsRef}
                                />
                              ) : (
                                <div>
                                  {param === "lateAndLive" && (
                                    <LateAndLiveField
                                      paramIndex={paramIndex}
                                      param={param}
                                      values={values}
                                      index={index}
                                      selectOptions={selectOptionsRef}
                                      setFieldValue={setFieldValue}
                                      setFieldTouched={setFieldTouched}
                                    />
                                  )}
                                  {param === "source" ? (
                                    <SourceField
                                      paramIndex={paramIndex}
                                      param={param}
                                      values={values}
                                      index={index}
                                      setFieldValue={setFieldValue}
                                      setFieldTouched={setFieldTouched}
                                      customSource={customSource}
                                      selectOptionsRef={selectOptionsRef}
                                    />
                                  ) : param !== "avRenditions" &&
                                    param !== "lateAndLive" ? (
                                    <BasicBundleField
                                      paramIndex={paramIndex}
                                      param={param}
                                      values={values}
                                      index={index}
                                      setFieldTouched={setFieldTouched}
                                      handleChange={handleChange}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              )}
                              <ErrorMessage
                                name={`bundles[${index}].${param}`}
                              />
                            </div>
                          )
                        )}
                        <Box>
                          <Heading>AVRenditions</Heading>
                        </Box>
                        <FieldArray
                          key={49}
                          name={`bundles[${index}.avRenditions]`}
                        >
                          {(avArrayHelper) => (
                            <div>
                              {values.bundles[index].avRenditions.length >= 0 &&
                                values.bundles[index].avRenditions.map(
                                  (rendition, avIndex) => (
                                    <div key={avIndex}>
                                      <Heading>
                                        AVRendition {avIndex + 1}
                                      </Heading>
                                      <div>
                                        <FileInputField
                                          setFieldValue={setFieldValue}
                                          index={index}
                                          setLoading={changeLoading}
                                          avIndex={avIndex}
                                        />
                                      </div>
                                      <div>
                                        <FileNameField
                                          index={index}
                                          avIndex={avIndex}
                                          values={values}
                                          handleChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`bundles[${index}].avRenditions[${avIndex}].fileName`}
                                        />
                                        <div>
                                          {Object.keys(initVidAttrib).map(
                                            (vidParam, vidIndex) => (
                                              <div>
                                                {vidParam ===
                                                "pictureDefinition" ? (
                                                  <PictureDefinitionField
                                                    vidIndex={vidIndex}
                                                    vidParam={vidParam}
                                                    index={index}
                                                    avIndex={avIndex}
                                                    selectOptions={
                                                      selectOptionsRef
                                                    }
                                                    values={values}
                                                    setFieldValue={
                                                      setFieldValue
                                                    }
                                                    setFieldTouched={
                                                      setFieldTouched
                                                    }
                                                  />
                                                ) : (
                                                  <BasicAVField
                                                    vidIndex={vidIndex}
                                                    vidParam={vidParam}
                                                    index={index}
                                                    avIndex={avIndex}
                                                    values={values}
                                                    handleChange={handleChange}
                                                  />
                                                )}
                                                <ErrorMessage
                                                  name={`bundles[${index}].avRenditions[${avIndex}].videoAttributes.${vidParam}`}
                                                />
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                      <FinalAVFormButtons
                                        values={values}
                                        index={index}
                                        avArrayHelper={avArrayHelper}
                                        initAVRenditions={initAVRenditions}
                                        avIndex={avIndex}
                                      />
                                    </div>
                                  )
                                )}
                            </div>
                          )}
                        </FieldArray>
                        <Box
                          margin={{ top: "medium" }}
                          direction="row"
                          justify="between"
                        >
                          <Button
                            type="button"
                            label="Add Bundle"
                            onClick={() => bArrayHelper.push(initBundleValues)}
                          />
                          {values.bundles.length > 1 && (
                            <Button
                              type="button"
                              label="Remove Bundle"
                              onClick={() => bArrayHelper.remove(index)}
                            />
                          )}
                        </Box>
                        <FastField>
                          {(_) => {
                            return (
                              <FormField label={"Number of Files to Generate"}>
                                <TextInputWrapper
                                  name={`fileNum`}
                                  value={values.fileNum || ""}
                                  onChange={handleChange}
                                />
                              </FormField>
                            );
                          }}
                        </FastField>
                      </div>
                    ))}
                  <div>
                    <ScrollableContainer
                      text={JSON.stringify(values, null, 2)}
                    />
                  </div>
                </div>
              )}
            </FieldArray>
            <Box
              tag="footer"
              margin={{ top: "medium" }}
              direction="row"
              justify="between"
            >
              <Button label="Reset" />
              <Button
                disabled={!(dirty && isValid)}
                type="submit"
                primary
                label="Create"
              />
            </Box>
          </Form>
        )}
      </Formik>
      {loading === true && 
      <div className="loadingOverlay">
        <Loading style={{ height: "100%" }} />
        </div>}
    </div>
  );
};

export default XMLForm;
