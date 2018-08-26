<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view ></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700");
  :root{
    --gray-darker:  lighten(#000, 13.5%); 
    --gray-dark:    lighten(#000, 20%);
    --gray:         lighten(#000, 33.5%);
    --gray-light:   lighten(#000, 46.7%);
    --gray-lighter: lighten(#000, 93.5%);
    
    --brand-primary: #428bca;
    --brand-primary-fade-5: rgba(66, 139, 202, 0.5);
    --brand-primary-fade-7: rgba(66, 139, 202, 0.7);
    --brand-primary-fade-8: rgba(66, 139, 202, 0.8);
    --brand-success: #5cb85c;
    --brand-info:    #5bc0de;
    --brand-warning: #ff9327;
    --light-light-orange: #fae6c9;
    --brand-danger:  #d9534f;
    --brand-teal-blue: #7ddbd4;
    --brand-bblue: #5FAAF6;
    --brand-bblue-fade-5: rgba(95, 170, 246, 0.5);
    --brand-bblue-fade-7: rgba(95, 170, 246, 0.7);
    --brand-bblue-fade-8: rgba(95, 170, 246, 0.8);
    --brand-sea-green-7: #9CE2CA;
    --brand-sea-green-8: #87DDC0;
    --brand-sea-green-9: #73D7B5;   // lighter
    --brand-sea-green: #71D6B4; // sea green base
    --brand-sea-green-13: #39C595;  // darker
    --brand-sea-green-16: #288A69;

    .btn-bblue {
      background-color: var(--brand-bblue);
      color: white;
      border-color: var(--brand-primary);
    }
    .btn-teal {
      background-color: var(--brand-teal-blue) !important;
      color: white !important;
      border: none;
    }
    .bg-bblue {
      background-color: var(--brand-bblue);
      color: white;
    }
    .gray, .grey {
      color: gray;
    }
    .light-gray, .light-grey {
      color: lightgray;
    }

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 10px;
    background-color: white;
  }
  .container{
    margin: 30px;
  }
  .mx-auto {
    margin: auto auto !important;
    display: block !important;
    position: relative;
    float: none;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .mx-1 {
    margin-left: 0.25rem !important;
    margin-right: 0.25rem !important;
  }
  .mx-2 {
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
  }
  .mx-3 {
    margin-left: 0.75rem !important;
    margin-right: 0.75rem !important;
  }
  .mx-4 {
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }
  .mpl-0 {
    padding-left: 0;
    margin-left: 0;
  }
  .mpr-0 {
    padding-right: 0;
    margin-right: 0;
  }
  .ml-4 {
    margin-left: 1rem !important;
  }
  .mr-1 {
    margin-right: 0.25rem !important;
  }
  .mr-2 {
    margin-right: 0.5rem !important;
  }
  .my-0 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .my-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-3 {
    margin-top: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }
  .my-4 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-5 {
    margin-top: 1.25rem !important;
    margin-bottom: 1.25rem !important;
  }
  .my-6 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-7 {
    margin-top: 1.75rem !important;
    margin-bottom: 1.75rem !important;
  }
  .my-8 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-10 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .mb-5 {
    margin-bottom: 1.25rem !important;
  }
  .mt-7 {
    margin-top: 1.8rem;
  }
  .mt-10 {
    margin-top: 3rem !important;
  }
  .px-0 {
    padding-right: 0;
    padding-left: 0;
  }
  .px-1 {
    padding-right: 1.0em !important;
    padding-left: 1.0em !important;
  }
  .px-2 {
    padding-right: 1.5em !important;
    padding-left: 1.5em !important;
  }
  .px-3 {
    padding-right: 2.0em !important;
    padding-left: 2.0em !important;
  }
  .py-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-5 {
    padding-top: 2.0rem !important;
    padding-bottom: 2.0rem !important;
  }
  .py-10 {
    padding-top: 3.0rem !important;
    padding-bottom: 3.0rem !important;
  }
  .pr-0 {
    padding-right: 0;
  }
  .pr-1 {
    padding-right: 1.0em !important;
  }
  .pr-2 {
    padding-right: 1.5rem !important;
  }
  .pr-3 {
    padding-right: 2.0rem !important;
  }
  .pl-1 {
    padding-left: 1.0rem !important;
  }
  .pl-2 {
    padding-left: 1.5rem !important;
  }
  .pl-3 {
    padding-left: 2.0rem !important;
  }
  .p-1 {
    padding: 1.0rem !important;
  }
  .p-2 {
    padding: 1.5rem !important;
  }
  .p-3 {
    padding: 2.0rem !important;
  }
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }

  .justify-content-left {
    justify-content: left;
  }
  .justify-content-right {
    justify-content: right;
  }
  .justify-content-center {
    justify-content: center;
  }

  .font-weight-light {
    font-weight: lighter;
  }
  .font-weight-bold {
    font-weight: bold;
  }
  .font-size-tiny {
    font-size: 0.75em;
  }
  .font-size-1 {
    font-size: 1em;
  }
  .font-size-2 {
    font-size: 1.25em;
  }
	.font-large {
		font-size: 2em;
	}

  .align-baseline {
    display: inline-block;
    vertical-align: baseline;
  }
  .align-bottom {
    display: inline-block;
    vertical-align: bottom;
    float: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .align-middle {
    display: inline-block;
    vertical-align: middle;
    float: none;
  }
  .align-top {
    vertical-align: top;
  }

  hr {
		display: block;
		position: relative;
		padding: 0;
		margin: 8px auto;
		height: 0;
		width: 70%;
		max-height: 0;
		font-size: 1px;
		line-height: 0;
		clear: both;
		border: none;
		border-top: 1px solid #aaaaaa;
		border-bottom: 1px solid #ffffff;
	}

  .border-top-bottom {
    border-bottom: 0.75px solid gray;
    display: inline-block;
  }
  .border-all {
    border: 0.75px solid gray;
    display: block;
  }
  .border-danger {
    border-color: var(--brand-danger);
    border-width: 1.5px;
  }
  .border-bottom {
    border-bottom: 0.75px solid gray;
  }
  .border-left {
    border-left: 0.75px solid gray;
  }


  .bg-primary {
    background-color: var(--brand-primary) !important;
  }
  .bg-success {
    background-color: var(--brand-success);
  }
  .bg-danger {
    background-color: var(--brand-danger);
  }
  .bg-info {
    background-color: var(--brand-info);
  }
  .bg-warning {
    background-color: var(--brand-warning);
  }

  button:hover,
  input[type="checkbox"]:hover,
  input[type="radio"]:hover,
  select:hover,
  a:hover {
    // apply pointer to all buttons, checkboxes, 
    // radio options, select fields, and links
    cursor: pointer;
  }
  button[disabled="true"]:hover,
  a[disabled="true"]:hover {
    // handle disabled attributes
    cursor: not-allowed !important;
  }

  /* Scrollbar styles */
  .scroll {
    overflow-y: scroll;
  }
  /* Scrollbar width */
  ::-webkit-scrollbar {
      width: 8px;
  }
  /* Scrollbar Track */
  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px gray; 
      border-radius: 10px;
  }
  /* Scrollbar Handle */
  ::-webkit-scrollbar-thumb {
      background: var(--brand-warning); 
      border-radius: 10px;
  }
  /* Scrollbar Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
      background: var(--brand-primary); 
  }

  /* Responsive Media Styles / $mq */
  .small-screen-left.smartphone,
  .small-screen-left.mobile {
      text-align: left;
  }
</style>
