# Input Field Components
- Use the components in this directory as input field templates
- The components will handle validation locally, and also escape any HTML characters('&lt;' or '&gt;')
- Components will accept the parent's v-model, a label, a type, a default, validation rules, and a custom error flag as props
- The components will emit any changes to the field value, an invalid flag, and a list of error messages to the parent

# Available Components
## Input Table and Row Field Components
These are the components that will be used most frequently. They are pre-built to style an input field with or without a label within a div row or a table.

| Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Row with Label | inputRow | &lt;input-row&gt; | Constructs a styled input field in a row, with a large or small label (defined in a prop), help text, and error messages. |
| Input Row no Label | inputRowNoLabel | &lt;input-row-no-label&gt; | Constructs a styled input field in a row, with help text and error messages. This component will not include a label, but expects a label to be included in the props for error messaging. |
| Input Table Row | inputTableRow | &lt;input-table-row&gt; | Constructs a styled input field in a table row, with a large or small label (defined in a prop), help text, and error messages. |

## Sub-Components
The following components are used to construct the main components above. They are also available for use in forms that may require unique styling (for example, a form that requires only an input field, or perhaps a table cell that needs to include more than one input).
The following sub-components contain only small pieces of what would usually be included on a form. For example, the input field sub-component will perform validation, but it will not display error messages, and it will not include a label.

### Input Field Sub-components
| Input Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Field | inputFieldOnly | &lt;input-field-only&gt; | Input field without a label or div styling. Handles validation and data. All components use this component as a child |

### Label Field Sub-components
| Label Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Label | inputLabelOnly | &lt;input-label-only&gt; | Simply a label used with input fields |
| Large Label | inputLabelLarge | &lt;input-label-large&gt; | Creates a large label in an &lt;h4&gt; tag |
| Large Label Div | inputLabelDivLarge | &lt;input-label-div-large&gt; | Wraps a large label in a pre-defined and sized &lt;div&gt; to be used in a row |
| Small Label Div | inputLabelDivSmall | &lt;input-label-div-small&gt; | Wraps a small label in a pre-defined and sized &lt;div&gt; to be used in a row |
| Large Label Table Column | inputLabelTableLarge | &lt;input-label-table-large&gt; | Wraps a large label in a pre-defined and sized &lt;td&gt; to be used in a table |
| Small Label Table Column | inputLabelTableSmall | &lt;input-label-table-small&gt; | Wraps a small label in a pre-defined and sized &lt;td&gt; to be used in a table |

# Props
Props are custom attributes that can be used to pass data to a child component in Vue. Props are bound to a component as any other Vue attribute, as the following example demonstrates:

> &lt;input-row :v-model="dataField" :label="fieldLabel" :type="text"&gt;

The above listed components are built to handle the following props. 

### General Props
| Prop Name | Data Type | Description | Notes |
| --------- | --------- | ----------- | ----- |
| type | String | HTML input field type | RECOMMENDED. All components should have a type. If this is not included, it will be set to "text" by default. |
| label | String | Label used to describe the input field, and also in error messages | REQUIRED. All components must have a label. An empty label is fine. |
| defaultValue | String, Number, Boolean, Array | Default value to assign to an empty input field | |
| helpText | String | Helpful text to supplement an input field to assist the user | |
| value | String, Number, Boolean, Array | The parent's data value | This may be set by either using the :value prop, or the v-model prop |
| hasErrors | Boolean | Passes a boolean value to the child about whether the input field has errors; e.g., from a custom parent data validator | |
| errors | Array | Passes a list of error messages to the child; e.g., from a custom parent validator | |
| small | Boolean | Determines whether the label should be small or large | This prop is used exclusively on the inputRow, inputRowNoLabel, and inputTableRow components |

### Validation Props
| Prop Name | Data Type | Description | Notes |
| --------- | --------- | ----------- | ----- |
| required | Boolean | Identifies whether this input field is required | DEFAULT: true - if this prop is not provided, the validator will assume the input field is required |
| minLength | Number | Minimum length required, e.g., for a text input | |
| maxLength | Number | Maximum length required, e.g., for a text input | |
| minNum | Number | Minimum value permitted, e.g., for a number input | minNum is inclusive; the value will be allowed |
| maxNum | Number | Maximum value allowed, e.g., for a number input | maxNum is inclusive; the value will be allowed |
| minDate | Date | Minimum date permitted | minDate is inclusive |
| maxDate | Date | Maximum date permitted | maxDate is inclusive |

# Emit
Components emit data changes and validation results to parent components. To bind to the result of a component emit, use v-on in the custom html tag, as demonstrated in the following example:

> &lt;input-row v-model="dataField" v-on:invalid="field = $event"&gt;

* Note that v-model is used for two-way binding in this example. It passes data from the prescribed data property to the child component's :value prop, and it also watches for any 'input' emit events and assigns the changed input value to the corresponding parent's data property.

| Emit Event | v-on:Example | Description |
| ---------- | ------------ | ----------- |
| input | v-model="dataField" | Emits any changes to the input field value |
| invalid | v-on:invalid="invalidField = $event" | Emits a Boolean value to indicate whether the input field is invalid -- true indicates an invalid state; false indicates a valid state |
| errMsgs | v-on:errMsgs="msgsField = $event" | Emits a list of error messages. In most cases this event will not be necessary, as messages are displayed locally within the inputRow, inputRowNoLabel, and inputTableRow components. |

# Importing Components
To import a component, include an import statement prior to the Vue export default statement, and add the component name to a list of components inside the export default statement. For example, to import the inputRow component, you may use the following:

>  import inputRow from './forms/inputRow.vue'; \n
>  export default { \n
>    name: "myComponentName",
>    components: {
>      inputRow,
>    },
>    data() {
>      return {
>          myDataFields: null,
>      }
>    }
>  }

| Component Name | Import Statement |
| -------------- | ---------------- |
| inputRow | >  import inputRow from './forms/inputRow.vue'; |
| inputRowNoLabel | >  import inputRowNoLabel from './forms/inputRowNoLabel.vue'; |
   