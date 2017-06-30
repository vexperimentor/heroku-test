<!--
	Variable Delete confirmation modal template
	@variable
-->
<script type="text/ng-template" id="modalVariableDelete.html">
	<div class="modal-header">
		<h3 class="modal-title">Delete a Field</h3>
	</div>
	<div class="modal-body">
		Are you sure to want to delete "{{variable.info.name}}"?
	</div>
	<div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="confirm()">Confirm</button>
            <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</script>
<!-- 
	Variable Create / Edit modal template
	@create_mode
	@variable
	@static {types, rules}
-->
<script type="text/ng-template" id="modalVariable.html">
<form role="form" ng-submit="confirm()" ng-init="validation={valid:true, msg:''}">
	<div class="modal-header">
        <h3 class="modal-title">{{create_mode?'Create':'Edit'}} a Field</h3>
    </div>
    <div class="modal-body">
        <div class="ss-error" ng-show="!validation.valid">
            <div class="alert alert-danger" role="alert">
                {{validation.msg}}
            </div>
        </div>
    	<div class="form-group">
    		<input type="text" ng-model="variable.info.name" placeholder="Field name" class="form-control" required pattern="[a-zA-Z]+[a-zA-Z0-9_]*"
        title="Starting with a letter, Field name should only contain alphabets, digits and underscore">
    	</div>
    	<div class="form-group">
    		<select ng-model="variable.info.v_type" class="form-control">
				<option ng-repeat="v_type in static.types track by $index" value="{{v_type}}" ng-selected="v_type == variable.info.v_type">{{v_type | typePrint}}</option>
			</select>
    	</div>
    	<div class="form-group">
    		<var-default-input model="variable.info.v_default" type="{{variable.info.v_type}}" attrs="{{variable.attrs.obj}}"></var-default-input>
    		<!-- <input type="text" ng-model="variable.info.v_default" placeholder="Default value" class="form-control"> -->
    	</div>
    	<div class="form-group">
    		<textarea ng-model="variable.info.description" placeholder="Description" class="form-control" rows="3"></textarea>
    	</div>        
    	
        <hr>        
        <var-attr-input value="attr.value" properties="attr.prop" code="{{attr.code}}" ng-repeat = "(key, attr) in variable.attrs.obj track by key"></var-attr-input>
    	
        <label ng-show="anyRules">Rules</label>
    	<div class="form-group row" ng-repeat = "rule in variable.rules track by rule.code" ng-if="rule.available">
    		<div class="col-xs-3 text-right">
    			{{rule.json_name | ruleName}}
    		</div>
    		<div class="col-xs-9">
    			<var-rule-input code="{{rule.code}}" model="rule.value" type="{{variable.info.v_type}}"></var-rule-input>
    		</div>
    	</div>
    </div>
	<div class="modal-footer">
            <button class="btn btn-primary" type="submit">{{create_mode?'Create':'Update'}}</button>
            <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>
</script>