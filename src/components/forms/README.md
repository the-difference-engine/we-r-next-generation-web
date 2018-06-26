# Input Field Components
- Use the components in this directory as input field templates
- The components will handle validation locally, and also escape any HTML characters('&lt;' or '&gt;')
- Components will accept the parent's v-model, a label, a type, a default, validation rules, and a custom error flag as props
- The components will emit any changes to the field value, an invalid flag, and a list of error messages to the parent

# Contents
* [Available Components](#available-components)
	* [Main Input Components](#input-table-and-row-field-components)
	* [Sub Components](#sub-components)
* [Component Props (data from parent --> child)](#props)
	* [General Props](#general-props)
	* [Validation Props](#validation-props)
* [Component Emits (data from child --> parent)](#emit)
* [Importing Components](#importing-components)


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

```
  import inputRow from './forms/inputRow.vue';
  export default {
	name: "myComponentName",
	components: {
	  inputRow,
	},
	data() {
	  return {
		  myDataFields: null,
	  }
	}
  }
```

| Component Name | Import Statement |
| -------------- | ---------------- |
| inputRow | ``` import inputRow from './forms/inputRow.vue'; ``` |
| inputRowNoLabel | ``` import inputRowNoLabel from './forms/inputRowNoLabel.vue'; ``` |
| inputTableRow | ``` import inputTableRow from './forms/inputTableRow.vue'; ``` |
| inputFieldOnly | ``` import inputFieldOnly from './forms/inputFieldOnly.vue'; ``` |
| inputLabelDivLarge | ``` import inputLabelDivLarge from './forms/inputLabelDivLarge.vue'; ``` |
| inputLabelDivSmall | ``` import inputLabelDivSmall from './forms/inputLabelDivSmall.vue'; ``` |
| inputLabelLarge | ``` import inputLabelLarge from './forms/inputLabelLarge.vue'; ``` |
| inputLabelOnly | ``` import inputLabelOnly from './forms/inputLabelOnly.vue'; ``` |
| inputLabelTableLarge | ``` import inputLabelTableLarge from './forms/inputLabelTableLarge.vue'; ``` |
| inputLabelTableSmall | ``` import inputLabelTableSmall from './forms/inputLabelTableSmall.vue'; ``` |

# Example
The following example demonstrates how to use a few different variations of the above input components. In general, the ``` <input-row> ``` or the ``` <input-table-row> ``` should be sufficient to handle most input form cases.

There are many ways to setup the fields and validators in the Vue data() method. This is one implementation, that attempts to place the value, label, and validators inside a template object that belongs to each data field. You may also setup the data layer to store this type of information separately -- e.g., as a list of validators, a list of labels, and a list of help text.

Keep in mind, labels and type are strongly recommended properties for each component.

```
<form v-on:submit.prevent="myFormActionMethod" class="form">
	<table class="table text-left my-3">
	<tbody>
		<input-table-row :label="waiver_labels.title" type="text" 
			v-model="waiver.title" 
			:min-length="waiver_validators.title_min"
			v-on:invalid="invalid.title = $event">
		</input-table-row>
		<tr>
		<input-label-table-large v-bind:class="{ 'has-error': headers_have_errors }"
			:label="waiver_labels.header">
		</input-label-table-large>
		<td colspan="2" class="col-sm-10 text-left align-baseline">
			<input-row-no-label type="text" 
			:label="waiver_labels.header"
			v-model="waiver.header[0]" 
			:min-length="waiver_validators.header_min"
			v-on:invalid="headerValidator($event, 0)">
			</input-row-no-label>
			<div class="row col-sm-12">
			DATE
			<span class="mx-2" v-if="type === 'volunteer'">
				(date) by VOLUNTEER NAME
			</span>
			</div>
			<input-row-no-label type="textarea" 
			:label="waiver_labels.header"
			v-model="waiver.header[1]" 
			:min-length="waiver_validators.header_min"
			v-on:invalid="headerValidator($event, 1)">
			</input-row-no-label>
			<div v-if="type === 'camper'" >
			<span class="row col-sm-12">CHILD'S NAME</span>
			<input-row-no-label type="textarea" 
				:label="waiver_labels.header"
				v-model="waiver.header[2]" 
				:min-length="waiver_validators.header_min"
				v-on:invalid="headerValidator($event, 2)">
			</input-row-no-label>
			<span class="row col-sm-12">PARENT'S NAME</span>
			<input-row-no-label type="textarea" 
				:label="waiver_labels.header"
				v-model="waiver.header[3]" 
				:min-length="waiver_validators.header_min"
				v-on:invalid="headerValidator($event, 3)">
			</input-row-no-label>
			</div>
		</td>
		</tr>
	<tr>
		<input-label-table-large 
		v-bind:class="{ 'has-error': items_have_errors }"
		:label="waiver_labels.items">
		</input-label-table-large>
		<td class="col-sm-8 text-left align-baseline">
		<div v-for='index in waiver.items.length' :key="index" class="border-top-bottom">
			<input-row :label="waiver_labels.item_order" type="number" 
			v-model="waiver.items[index-1]['order']" 
			:small="true"
			:min-num="waiver_validators.item_order_min"
			:help-text="waiver_help.item_order"
			v-on:invalid="itemValidator($event, index, 'order')">
			</input-row>
			<input-row :label="waiver_labels.item_title" type="text" 
			v-model="waiver.items[index-1]['title']" 
			:small="true"
			:min-num="waiver_validators.item_title_min"
			v-on:invalid="itemValidator($event, index, 'title')">
			</input-row>
			<input-row :label="waiver_labels.item_initials" type="checkbox"
			v-model="waiver.items[index-1]['initials']" 
			:small="true"
			:required="false">
			</input-row>
			<input-row :label="waiver_labels.item_text" type="textarea" 
			v-model="waiver.items[index-1]['text']" 
			:small="true"
			:min-num="waiver_validators.item_text_min"
			v-on:invalid="itemValidator($event, index, 'text')">
			</input-row>
		</div>
		</td>
		<td class="col-sm-1 text-left align-top">
		<button class="btn btn-danger" v-on:click="deleteItem(index-1)">Delete</button>
		</td>
	</tr>
	<tr>
		<td class="col-sm-2"></td>
		<td class="col-sm-10 text-right" colspan="2">
		<button class="btn btn-warning" v-on:click="addItem">Add Legal Item</button>
		</td>
	</tr>
		<input-table-row :label="waiver_labels.footer" type="textarea" 
		v-model="waiver.footer" 
		:min-length="waiver_validators.footer_min"
		v-on:invalid="invalid.footer = $event">
		</input-table-row>
	<tr>
		<td class="col-sm-2"></td>
		<td class="col-sm-10 text-right" colspan="2">
		<div class="row col-sm-12 my-2">
			<div v-if="invalidForm" class="row mx-0 px-0 text-right text-danger">
			<label>
				Please correct the errors above before proceeding.
			</label>
			</div>
			<button type="cancel" v-on:click="cancelSubmission" class="btn btn-warning mx-4 my-5">Cancel</button>
			<button type="submit" class="btn btn-primary my-5" v-bind:disabled="invalidForm">Save & Submit</button>
		</div>
		</td>
	</tr>
	</tbody>
	</table>
</form>

<script>
  import inputTableRow from './forms/inputTableRow.vue';
  import inputRow from './forms/inputRow.vue';
  import inputRowNoLabel from './forms/inputRowNoLabel.vue';
  import inputLabelTableLarge from './forms/inputLabelTableLarge.vue';
  export default {
    name: "myComponent",
    components: {
      inputTableRow,
      inputRow,
      inputRowNoLabel,
      inputLabelTableLarge,
    },
    data() {
      return {
		eachField: {
			label: '',
			value: '',
			type: 'text',
			defaultValue: '',
			helpText: '',
			validators: {
				minLength: 2,
				maxLength: null,
				minNum: 0,
				maxNum: null,
				minDate: null,
				maxDate: null,
				required: true,
			},
			
			invalid: false,
			errMsgs: []
		},

		myField1: eachField,
		myField2: eachField,

		invalidForm: false,

        headers_have_errors: false,
        items_have_errors: false,
      };
    },
    methods: {
      getWaiver: function(type) {
        // get waiver text from database storage
        let resource_type = "waiver_" + type;
        this.$store.dispatch('getWaiverResources', {
          resource: resource_type
        })
        .then(data => {
          this.waiver.title = data['title'];
          this.waiver.header = data['headers'];
          this.waiver.items = data['items'];
          this.waiver.footer = data['footer'];

          // init invalid list for each header
          this.waiver.header.forEach(h => {
            this.invalid.header.push(false);
          });

          // init invalid list for each item
          this.waiver.items.forEach(i => {
            this.invalid.items.push(this.invalid_item);
          });
          setTimeout(x => {this.matchHeight()}, 2000);
        })
      },

      matchHeight() {
        let preview_height = this.$refs.updateWaiver.scrollHeight - 50;
        this.preview_btn_styles = {'height': preview_height + 'px'};
      },

      scrollToPreview() {
        let element = '#waiver_preview';
        let duration = 2000;
        var VueScrollTo = require('vue-scrollto');
        VueScrollTo.scrollTo(element, duration)
      },

      deleteItem(item_idx) {
        // remove the item from the list
        this.waiver.items.splice(item_idx, 1);
      },

      addItem() {
        let count = this.waiver.items.length;
        // add a new item object to the list
        this.waiver.items.push(
          {
            'order': count + 1,
            'title': '',
            'text': '',
            'initials': true
          }
        );
      },

      cancelSubmission(event) {
        if (event) { event.preventDefault(); }
        this.getWaiver(this.type);
      },

      headerValidator: function(invalid, idx) {
        this.invalid.header.splice(idx, 1, invalid);
        this.headers_have_errors = this.checkInvalidList(this.invalid.header);
      },

      itemValidator: function(invalid, idx, key) {
        let item_state = this.invalid.items[idx];
        item_state[key] = invalid;
        this.invalid.items.splice(idx, 1, item_state);
        this.items_have_errors = this.checkInvalidList(this.invalid.items);
      },

      checkInvalidList: function(list) {
        let invalid = false;
        list.forEach(i => {
          if (this.isDict(i)) {
            for (var key in i) {
              if (i[key]) { invalid = true; }
            }
          }
          else if (i) { invalid = true; }
        });
        return invalid;
      },

      isDict: function(x) {
        return typeof x==='object' && x!==null && !(x instanceof Array) && !(x instanceof Date);
      },

      update_waiver() {
        let dataObj = {
          'title': this.waiver.title,
          'headers': this.waiver.header,
          'items': this.waiver.items,
          'footer': this.waiver.footer
        }
        localforage.getItem('X_TOKEN')
        .then(session => {
          axios.put('/api/v1/admin/waiver/' + this.type + '/update', {
            headers: { 'x-token': session },
            data: dataObj
          })
          .then(res => {
            this.$router.push('/admin/applications');
          })
        })
      },
    },

    computed: {
      // computed validators
      invalidForm: function() {
        if (this.invalid.title ||
          this.invalid.footer ||
          this.headers_have_errors ||
          this.items_have_errors) {
            return true;
          }
        else {
          return false;
        }
      },
    },

    created() {
      this.type = this.$route.params.type.toLowerCase();    // waiver type from the url params
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
    },

    beforeMount() {
      this.getWaiver(this.$route.params.type);
    },
    beforeRouteUpdate(to, from, next) {
      this.type = to.params.type.toLowerCase();       // if waiver type changes in URL, update the data and waiver
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
      this.getWaiver(to.params.type);
      next();
    },
  }
</script>
```