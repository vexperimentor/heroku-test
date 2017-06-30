<!--
	Confirmation modal template
  @info
-->
<script type="text/ng-template" id="commonModalConfirm.html">
<form role="form" ng-submit="confirm()">
  <div class="modal-header">
    <h3 class="modal-title">{{info.title}}</h3>
  </div>
  
  <div class="modal-body">
      {{info.description}}
  </div>

  <div class="modal-footer">
    <button class="btn btn-primary" type="submit">Confirm</button>
    <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
  </div>
</form>
</script>