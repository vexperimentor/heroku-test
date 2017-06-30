<!--
	Pattern Create modal template
	@pattern
	@static {fields}
-->
<script type="text/ng-template" id="modalPattern.html">
<form role="form" ng-submit="confirm()" ng-init="validation={valid:true, msg:''}">
	<div class="modal-header">
		<h3 class="modal-title">Create a Pattern</h3>
	</div>
	<div class="modal-body">
		<div class="ss-error" ng-show="!validation.valid">
            <div class="alert alert-danger" role="alert">
                {{validation.msg}}
            </div>
        </div>
        <div class="form-group">
        	<input type="text" ng-model="pattern.name" placeholder="Name" class="form-control" required>
        </div>
        <div class="form-group">
        	<input type="text" ng-model="pattern.pattern" placeholder="Mask" class="form-control" required>
        </div>
        <div class="form-group">
        	<input id="test-me" type="text" placeholder="Pattern test" class="form-control">
        </div>
        
        <hr>
        <label>Applied fields</label>
        <div class="form-group">
        	<div ng-repeat="field in static.fields" >
        		<!-- Checklist shouldn't have other ng directives other than checklist-model and checklist-value -->
        		<input type="checkbox" checklist-model="pattern.fields" checklist-value="field"> {{field}}
        	</div>
        </div>
	</div>
	<div class="modal-footer">
        <button class="btn btn-primary" type="submit">Confirm</button>
        <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>
</script>

<!-- 
    Base Unit Creation Modal
    @baseUnit
-->
<script type="text/ng-template" id="modalUnit.html">
<form role="form" ng-submit="confirm()" ng-init="validation={valid:true, msg:''}">
    <div class="modal-header">
        <h3 class="modal-title">Create a Base Unit</h3>
    </div>
    <div class="modal-body">
        <div class="ss-error" ng-show="!validation.valid">
            <div class="alert alert-danger" role="alert">
                {{validation.msg}}
            </div>
        </div>
        <div class="form-group">
            <input type="text" ng-model="baseUnit.name" placeholder="Name" class="form-control" required>
        </div>
        <div class="form-group">
            <ui-select multiple tagging tagging-label="false" ng-model="baseUnit.units" theme="bootstrap" ng-disabled="disabled" style="width: 100%;" title="Add units (i.e. seconds)">
                <ui-select-match placeholder="Add units (i.e. seconds)">{{$item}}</ui-select-match>
                <ui-select-choices repeat="choice in []"></ui-select-choices>
            </ui-select>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Confirm</button>
        <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>    
</form>
</script>

<!--
    Constant Creation Modal
    @constant
-->
<script type="text/ng-template" id="modalConstant.html">
<form role="form" ng-submit="confirm()" ng-init="validation={valid: true, msg: ''}">
    <div class="modal-header">
        <h3 class="modal-title">Create a Constant</h3>
    </div>
    <div class="modal-body">
        <div class="ss-error" ng-show="!validation.valid">
            <div class="alert alert-danger" role="alert">
                {{validation.msg}}
            </div>
        </div>
        <div class="form-group">
            <input type="text" ng-model="constant.name" placeholder="Name" class="form-control" required>
        </div>
        <div class="form-group">
            <input type="text" ng-model="constant.value" placeholder="Value" class="form-control" required>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Confirm</button>
        <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>
</script>

<!-- Category Creation Modal
    @category
-->
<script type="text/ng-template" id="modalCategory.html">
<form role="form" ng-submit="confirm()" ng-init="validation={valid: true, msg: ''}">
    <div class="modal-header">
        <h3 class="modal-title">Create a Category</h3>
    </div>
    <div class="modal-body">
        <div class="ss-error" ng-show="!validation.valid">
            <div class="alert alert-danger" role="alert">
                {{validation.msg}}
            </div>
        </div>
        <div class="form-group">
            <input type="text" ng-model="category.name" placeholder="Name" class="form-control" required>
        </div>
        <div class="form-group">
            <ui-select ng-model="category.parent" theme="bootstrap" style="width: 100%;" title="Parent Category">
                <ui-select-match placeholder="Select parent category (for sub-category)">{{$select.selected.name}}</ui-select-match>
                <ui-select-choices repeat = "parent in arr_parents">
                    {{parent.name}}
                </ui-select-choices>
            </ui-select>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="submit">Confirm</button>
        <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>
</script>