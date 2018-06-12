# Input Field Components
- Use the components in this directory as input field templates
- The components will handle validation locally, and also escape any HTML characters('&lt;' or '&gt;')
- Components will accept the parent's v-model, a label, a type, a default, validation rules, and a custom error flag as props
- The components will emit any changes to the field value, an invalid flag, and a list of error messages to the parent

# Available Components
## Input Field Sub-components
| Input Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Field | inputFieldOnly | &lt;input-field-only&gt; | Input field without a label or div styling. Handles validation and data. All components use this component as a child |

## Label Field Sub-components
| Label Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Label | inputLabelOnly | &lt;input-label-only&gt; | Simply a label used with input fields |
| Large Label | inputLabelLarge | &lt;input-label-large&gt; | Creates a large label in an &lt;h4&gt; tag |
| Large Label Div | inputLabelDivLarge | &lt;input-label-div-large&gt; | Wraps a large label in a pre-defined and sized &lt;div&gt; to be used in a row |
| Small Label Div | inputLabelDivSmall | &lt;input-label-div-small&gt; | Wraps a small label in a pre-defined and sized &lt;div&gt; to be used in a row |
| Large Label Table Column | inputLabelTableLarge | &lt;input-label-table-large&gt; | Wraps a large label in a pre-defined and sized &lt;td&gt; to be used in a table |
| Small Label Table Column | inputLabelTableSmall | &lt;input-label-table-small&gt; | Wraps a small label in a pre-defined and sized &lt;td&gt; to be used in a table |

## Input Table and Row Field Components
| Component | Name | HTML Tag | Description |
| --------- | ---- | -------- | ----------- |
| Input Row with Label | inputRow | &lt;input-row&gt; | asdf |
| Input Row no Label | inputRowNoLabel | &lt;input-row-no-label&gt; | asdf |
| Input Table Row | inputTableRow | &lt;input-table-row&gt; | asdf |