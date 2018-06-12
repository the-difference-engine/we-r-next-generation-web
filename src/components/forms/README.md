# Input Field Components
- Use the components in this directory as input field templates
- The components will handle validation locally, and also escape any HTML characters('<' or '>')
- Components will accept the parent's v-model, a label, a type, a default, validation rules, and a custom error flag as props
- The components will emit any changes to the field value, an invalid flag, and a list of error messages to the parent

# Available Components
## Input Field Sub-components
| Input Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Field | inputFieldOnly | <input-field-only> | Input field without a label or div styling. Handles validation and data. All components use this component as a child |

## Label Field Sub-components
| Label Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Label | inputLabelOnly | <input-label-only> | Simply a label used with input fields |
| Large Label | inputLabelLarge | <input-label-large> | Creates a large label in an <h4> tag |
| Large Label Div | inputLabelDivLarge | <input-label-div-large> | Wraps a large label in a pre-defined and sized <div> to be used in a row |
| Small Label Div | inputLabelDivSmall | <input-label-div-small> | Wraps a small label in a pre-defined and sized <div> to be used in a row |
| Large Label Table Column | inputLabelTableLarge | <input-label-table-large> | Wraps a large label in a pre-defined and sized <td> to be used in a table |
| Small Label Table Column | inputLabelTableSmall | <input-label-table-small> | Wraps a small label in a pre-defined and sized <td> to be used in a table |

## Input Table and Row Field Components
| Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Row with Label | inputRow | <input-row> | asdf |
| Input Row no Label | inputRowNoLabel | <input-row-no-label> | asdf |
| Input Table Row | inputTableRow | <input-table-row> | asdf |