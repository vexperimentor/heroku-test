<script type="text/ng-template" id="changeSuccessModal.html">
<form role="form" ng-submit="confirm()">
  <div class="modal-header">
    <h3 class="modal-title">{{info.title}}</h3>
  </div>
  
  <div class="modal-body">
      {{info.description}}
  </div>

  <div class="modal-footer">
    <button class="btn btn-primary" type="submit">Ok</button>
  </div>
</form>
</script>