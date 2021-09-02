import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet,{
  name: "IrdetoGUI",
  rounding: 6,
  spacing: 24,
  defaultMode: "dark",
  global: {
    colors: {
      brand: {
        dark: "#aebf1e",
        light: "#5d176a",
      },
      elevation: {
        light: {
          small: "0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)",
          medium: "0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)",
          large: "0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)",
          xlarge: "0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)",
        },
      },
      size: {
        sidebar: "60px",
      },
      background: {
        dark: "#3c3c3c",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#EEEEEE",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "#EEEEEE",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      focus: "#5d176a",
    },
    font: {
      family: '"Titillium Web"',
      face:
        "/* latin-ext */\n@font-face {\n  font-family: 'Titillium Web';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/titilliumweb/v9/NaPecZTIAOhVxoMyOr9n_E7fdM3mDbRS.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Titillium Web';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/titilliumweb/v9/NaPecZTIAOhVxoMyOr9n_E7fdMPmDQ.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "6px",
      },
    },
    drop: {
      border: {
        radius: "6px",
      },
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      radius: "6px",
    },
  },
  checkBox: {
    check: {
      radius: "6px",
    },
    toggle: {
      radius: "6px",
    },
  },
  radioButton: {
    check: {
      radius: "6px",
    },
  },
  formField: {
    border: {
      color: "brand",
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
      style: "solid",
      size: "large",
    },
    content: {
      pad: "xsmall",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
      size: "medium",
      weight: "normal",
      background: {},
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
      size: "medium",
      weight: "bold",
      color: "control",
    },
    margin: {
      bottom: "xsmall",
    },
    round: "6px",
  },
  layer: {
    background: {
      dark: "#3c3c3c",
      light: "#FFFFFF",
    },
  },
});

export default theme;
