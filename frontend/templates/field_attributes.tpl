<!-- 
	Field attribute inputs
-->

<!-- Inline? -->
<script type="text/ng-template" id="tpl-fieldAttr-boolean">
	<div class="dyn-field-attr form-group row">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<input type="checkbox" class="form-control" ng-model="_model">
		</div>
	</div>
</script>

<!-- None -->
<script type="text/ng-template" id="tpl-fieldAttr-ghost">
</script>
<!-- Required text field : takes min and max length -->
<script type="text/ng-template" id="tpl-fieldAttr-required-text-field">
	<div class="dyn-field-attr form-group row">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<input type="text" class="form-control" ng-model="_model" min="{{_attr.minLength}}" max="{{_attr.maxLength}}" required>
		</div>
	</div>
</script>

<!-- Choice texts w/o defaults -->
<script type="text/ng-template" id="tpl-fieldAttr-named-choices-plain">
	<div class="dyn-field-attr form-group">
		<input type="text" class="form-control margin-bottom--5" ng-repeat="choice in _attr.choices" placeholder="{{choice}}" ng-model="_model[$index]">
	</div>
</script>

<!-- Choice texts w/ radio defaults -->
<script type="text/ng-template" id="tpl-fieldAttr-named-choices-radio-default">
	<div class="dyn-field-attr form-group row" ng-repeat="choice in _attr.choices">
		<div class="col-xs-1 text-right">
			<input type="radio" class="form-control" ng-model="_attr.default" value="{{$index}}">
		</div>
		<div class="col-xs-11">
			<input type="text" class="form-control" placeholder="{{choice}}" ng-model="_model[$index]">
		</div>
	</div>
</script>

<!-- Choice texts w/ checkbox defaults -->
<script type="text/ng-template" id="tpl-fieldAttr-named-choices-checkbox-default">
	<div class="dyn-field-attr form-group row" ng-repeat="choice in _attr.choices">
		<div class="col-xs-1 text-right">
			<input type="checkbox" class="form-control" checklist-model="_attr.default" checklist-value="$index">
		</div>
		<div class="col-xs-11">
			<input type="text" class="form-control" placeholder="{{choice}}" ng-model="_model[$index]">
		</div>
	</div>
</script>

<!-- Integer input -->
<script type="text/ng-template" id="tpl-fieldAttr-choice-count-input">
	<div class="dyn-field-attr form-group row">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<input type="number" step="1" class="form-control" ng-model="_model" min="2" max="10" required>
		</div>
	</div>
</script>

<!-- Simple number input : takes min and max value -->
<script type="text/ng-template" id="tpl-fieldAttr-number-input">
	<div class="dyn-field-attr form-group row">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<input type="number" step="1" class="form-control" ng-model="_model" min="{{_attr.min}}" max="{{_attr.max}}">
		</div>
	</div>
</script>

<!-- Toggling editable dropdown -->
<script type="text/ng-template" id="tpl-fieldAttr-toggling-editable-dropdown">
<div class="dyn-field-attr form-group row" ng-show="_attr.visible">
	<div class="col-xs-3 text-right">{{_attr.name}}</div>
	<div class="col-xs-9">
		<div class="select-editable">
			<input type="text" class="form-control editable-combo" style="margin-bottom: 5px" ng-model="_model"/>
		    <select class="form-control" ng-model="_model">
		        <option ng-repeat="option in _attr.choices track by $index" value="{{option.id}}">{{option.text}}</option>
		    </select>		    
		</div>
	</div>
</div>
</script>


<!-- Toggling input : takes visibility indicator -->
<script type="text/ng-template" id="tpl-fieldAttr-toggling-input">
	<div class="dyn-field-attr form-group row" ng-show="_attr.visible">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<input type="text" class="form-control" ng-model="_model">
		</div>
	</div>
</script>

<!-- Toggling Dropdown : takes choices & visibility indicator-->
<script type="text/ng-template" id="tpl-fieldAttr-toggling-dropdown">
	<div class="dyn-field-attr form-group row" ng-show="_attr.visible">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<select class="form-control" ng-model="_model">
				<option ng-repeat="option in _attr.choices track by $index" value="{{option.id}}" ng-selected="option.id == _model">{{option.text}}</option>
			</select>
		</div>
	</div>
</script>

<!-- Dropdown : takes choices -->
<script type="text/ng-template" id="tpl-fieldAttr-dropdown">
	<div class="dyn-field-attr form-group row">
		<div class="col-xs-3 text-right">{{_attr.name}}</div>
		<div class="col-xs-9">
			<select class="form-control" ng-model="_model">
				<option ng-repeat="option in _attr.choices track by $index" value="{{option.id}}" ng-selected="option.id == _model">{{option.text}}</option>
			</select>
		</div>
	</div>
</script>