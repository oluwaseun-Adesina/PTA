var room = 1;
function education_fields() {
 
    room++;
    var objTo = document.getElementById('education_fields')
    var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-group removeclass"+room);
	var rdiv = 'removeclass'+room;
    divtest.innerHTML = '<div class="col-md-12 form-group"><input type="text" class="form-control" id="validationCustom01" placeholder="Enter First Name" required /> <div class="valid-feedback">Looks good!</div> </div> <br> <div class="col-md-12 form-group"> <input type="text" class="form-control" id="validationCustom02" placeholder="Enter Last Name" required /> <div class="valid-feedback">Looks good!</div> <div class="input-group-btn"> <button class="btn btn-danger" type="button" onclick="remove_education_fields('+ room +');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> -  </button></div>    </div>';
    
    objTo.appendChild(divtest)
}
   function remove_education_fields(rid) {
	   $('.removeclass'+rid).remove();
   }