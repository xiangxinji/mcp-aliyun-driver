const maxFieldContentLengthMapper: any = {
  encryptedText: 100,
  text: 255,
  textarea: 2000,
  bigText: 20000,
  mediumText: 16 * 1024 * 1024,
};

export const OBJECT_FIELD_TYPES = [
  "score",
  "checkbox",
  "integer",
  "number",
  "money",
  "picklist",
  "multiPicklist",
  "encryptedText",
  "lookup",
  "singleCheckbox",
  "uploadImage",
  "areaSelect",
  "text",
  "bigText",
  "textarea",
  "uploadFile",
  "autoincrementOrderNo",
  "percent",
  "formula",
  "time",
  "date",
  "datetime",
  "colorSelect",
];

export function getParamsByFieldType(type: string) {
  if (type === "score") {
    return {
      option: 5,
      totalScore: 5,
      scoreType: 1,
      type,
    };
  }
  if (type === "checkbox") {
    return {
      values: [],
      type,
      defaultValue: "",
    };
  }
  if (type === "integer") {
    return {
      max: undefined,
      min: undefined,
      type,
    };
  }
  if (type === "number") {
    return {
      decimal: 2,
      length: '',
      type,
    };
  }
  if (type === "money") {
    return {
      decimal: 2,
      length: "",
      type,
    };
  }
  if (type === "picklist" || type === "multiPicklist") {
    const t: any = {
      values: [],
      type,
      globalSet: "",
      dataPermissions: true,
    };

    if (type === "multiPicklist") {
      t.formCollapseType = "default";
    }
    return t;
  }
  if (type === "encryptedText")
    return {
      maskType: "CUSTOM",
      type,
      startInclude: "",
      endInclude: "",
      // length: 100,
    };

  if (type === "lookup")
    return {
      type,
      relatedObject: "",
      relatedField: "",
      single: true,
      filters: [],
      displayFields: [],
      created: true,
      dataPermissions: true,
    };

  if (type === "singleCheckbox")
    return {
      type,
      name: "",
      defaultValue: "",
    };

  if (type === "uploadImage") {
    return {
      type,
      size: 5,
      limit: 1,
      customSuffix: [],
      width: 200,
      height: 200,
      name: "",
    };
  }
  if (type === "areaSelect") {
    return {
      type,
      length: 50,
      showFullName: true,
      level: 5,
      root: null,
      levels: [],
    };
  }

  if (["mediumText"].includes(type)) {
    return {
      type,
      subType: "text",
      length: 10 * 10000,
    };
  }

  if (["text", "bigText", "textarea"].includes(type)) {
    return {
      type,
      length: maxFieldContentLengthMapper[type] || 100,
    };
  }

  if (type === "uploadFile") {
    return {
      type,
      size: 5,
      limit: 1,
      customSuffix: [],
      name: "",
    };
  }

  if (type === "autoincrementOrderNo") {
    return {
      type,
      prefix: "",
      dateFormat: "",
      orderNoLength: 3,
      resetType: "",
      start: 1,
      inputFlag: false,
    };
  }

  if (type === "percent") {
    return {
      displayStyle: "line",
      intervalDisplay: false,
      colorList: [],
      type,
    };
  }

  if (type === "formula") {
    return {
      formulaType: "",
      formulaConfig: {
        formula: "",
        fields: [],
      },
      formType: "",
      params: {},
      type,
    };
  }

  if (type === "time" || type === "date" || type === "datetime") {
    return {
      type,
      defaultValue: "",
    };
  }

  if (type === "colorSelect") {
    return {
      type,
      openTransparency: false,
      openGradient: false,
    };
  }
  return {
    type,
  };
}
